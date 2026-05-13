$ErrorActionPreference = "Stop"

$workspace = Split-Path -Parent $MyInvocation.MyCommand.Path
$port = 8765
$prefix = "http://127.0.0.1:$port/"
$javaSource = Join-Path $workspace "GenerateAztec.java"
$javaClass = Join-Path $workspace "GenerateAztec.class"

function Find-ZxingCoreJar {
  $localCandidates = @(
    (Join-Path $workspace "lib\core-3.4.1.jar"),
    "C:\FFT\_app\AndroidAPP\WifiConnect\.gradle-user\caches\modules-2\files-2.1\com.google.zxing\core\3.4.1\1869da97e9b2b60b5ff2fcaf55899174b93ae25d\core-3.4.1.jar"
  )

  foreach ($candidate in $localCandidates) {
    if (Test-Path $candidate) {
      return (Resolve-Path $candidate).Path
    }
  }

  $cacheRoots = @(
    "$env:USERPROFILE\.gradle\caches\modules-2\files-2.1\com.google.zxing\core",
    "C:\FFT\_app\AndroidAPP\WifiConnect\.gradle-user\caches\modules-2\files-2.1\com.google.zxing\core"
  )

  foreach ($root in $cacheRoots) {
    if (Test-Path $root) {
      $jar = Get-ChildItem -Path $root -Recurse -Filter "core-*.jar" -ErrorAction SilentlyContinue |
        Sort-Object FullName -Descending |
        Select-Object -First 1
      if ($jar) {
        return $jar.FullName
      }
    }
  }

  throw "ZXing core jar was not found. Put core-3.4.1.jar in lib or prepare ZXing core in the Gradle cache."
}

function Initialize-ZxingAztecGenerator {
  if (-not (Get-Command java -ErrorAction SilentlyContinue)) {
    throw "Java was not found. Java is required to generate setting barcodes."
  }
  if (-not (Get-Command javac -ErrorAction SilentlyContinue)) {
    throw "javac was not found. JDK is required to compile GenerateAztec.java."
  }
  if (-not (Test-Path $javaSource)) {
    throw "GenerateAztec.java was not found."
  }

  $script:zxingJar = Find-ZxingCoreJar
  if (-not (Test-Path $javaClass) -or ((Get-Item $javaClass).LastWriteTime -lt (Get-Item $javaSource).LastWriteTime)) {
    & javac -cp $script:zxingJar $javaSource
    if ($LASTEXITCODE -ne 0) {
      throw "Failed to compile GenerateAztec.java."
    }
  }
}

function Normalize-SettingCommand {
  param([string]$Command)

  $trimmed = $Command.Trim()
  if (-not $trimmed.EndsWith(".")) {
    $trimmed = "$trimmed."
  }
  return $trimmed
}

function New-EzConfigAztecImage {
  param(
    [string]$Command,
    [string]$OutputPath
  )

  $settingCommand = Normalize-SettingCommand -Command $Command
  $classpath = "$workspace;$script:zxingJar"

  & java -cp $classpath GenerateAztec $settingCommand $OutputPath
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path $OutputPath)) {
    throw "AZTEC barcode generation failed."
  }
}

Initialize-ZxingAztecGenerator

$listener = [System.Net.Sockets.TcpListener]::new([Net.IPAddress]::Parse("127.0.0.1"), $port)
$listener.Start()
Write-Host "EZConfig AZTEC barcode server: $prefix"

function Send-HttpResponse {
  param(
    [System.Net.Sockets.NetworkStream]$Stream,
    [int]$StatusCode,
    [string]$StatusText,
    [string]$ContentType,
    [byte[]]$Body
  )

  $header = "HTTP/1.1 $StatusCode $StatusText`r`n" +
    "Access-Control-Allow-Origin: *`r`n" +
    "Access-Control-Allow-Methods: GET, OPTIONS`r`n" +
    "Access-Control-Allow-Headers: Content-Type`r`n" +
    "Content-Type: $ContentType`r`n" +
    "Content-Length: $($Body.Length)`r`n" +
    "Connection: close`r`n`r`n"
  [byte[]]$headerBytes = [Text.Encoding]::ASCII.GetBytes($header)
  $Stream.Write($headerBytes, 0, $headerBytes.Length)
  if ($Body.Length -gt 0) {
    $Stream.Write($Body, 0, $Body.Length)
  }
}

function Get-QueryValue {
  param(
    [string]$Target,
    [string]$Name
  )

  $questionIndex = $Target.IndexOf("?")
  if ($questionIndex -lt 0) { return $null }
  $query = $Target.Substring($questionIndex + 1)
  foreach ($part in $query.Split("&")) {
    $pair = $part.Split("=", 2)
    if ($pair.Length -eq 2 -and $pair[0] -eq $Name) {
      return [Uri]::UnescapeDataString($pair[1].Replace("+", " "))
    }
  }
  return $null
}

try {
  while ($true) {
    $client = $listener.AcceptTcpClient()
    $stream = $client.GetStream()
    $reader = [IO.StreamReader]::new($stream, [Text.Encoding]::ASCII, $false, 1024, $true)
    $requestLine = $reader.ReadLine()

    if ([string]::IsNullOrWhiteSpace($requestLine)) {
      $client.Close()
      continue
    }

    while (($line = $reader.ReadLine()) -ne $null -and $line.Length -gt 0) {}

    $parts = $requestLine.Split(" ")
    $method = $parts[0]
    $target = $parts[1]

    if ($method -eq "OPTIONS") {
      Send-HttpResponse -Stream $stream -StatusCode 204 -StatusText "No Content" -ContentType "text/plain" -Body ([byte[]]::new(0))
      $client.Close()
      continue
    }

    if ($method -ne "GET" -or -not $target.StartsWith("/barcode")) {
      Send-HttpResponse -Stream $stream -StatusCode 404 -StatusText "Not Found" -ContentType "text/plain; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes("not found"))
      $client.Close()
      continue
    }

    $command = Get-QueryValue -Target $target -Name "cmd"
    if ([string]::IsNullOrWhiteSpace($command)) {
      Send-HttpResponse -Stream $stream -StatusCode 400 -StatusText "Bad Request" -ContentType "text/plain; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes("cmd is required"))
      $client.Close()
      continue
    }

    $tempFile = Join-Path $env:TEMP ("ezconfig-aztec-" + [Guid]::NewGuid().ToString("N") + ".png")
    try {
      New-EzConfigAztecImage -Command $command -OutputPath $tempFile
      [byte[]]$bytes = [IO.File]::ReadAllBytes($tempFile)
      Send-HttpResponse -Stream $stream -StatusCode 200 -StatusText "OK" -ContentType "image/png" -Body $bytes
    }
    catch {
      Send-HttpResponse -Stream $stream -StatusCode 500 -StatusText "Internal Server Error" -ContentType "text/plain; charset=utf-8" -Body ([Text.Encoding]::UTF8.GetBytes($_.Exception.Message))
    }
    finally {
      Remove-Item -LiteralPath $tempFile -ErrorAction SilentlyContinue
      $client.Close()
    }
  }
}
finally {
  $listener.Stop()
}
