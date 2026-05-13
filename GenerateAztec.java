import com.google.zxing.aztec.encoder.AztecCode;
import com.google.zxing.aztec.encoder.Encoder;
import com.google.zxing.common.BitArray;
import com.google.zxing.common.BitMatrix;

import javax.imageio.ImageIO;
import java.awt.Color;
import java.awt.image.BufferedImage;
import java.io.File;
import java.lang.reflect.Method;
import java.nio.charset.StandardCharsets;

public class GenerateAztec {
    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            throw new IllegalArgumentException("usage: GenerateAztec <text> <output.png|bmp>");
        }

        byte[] data = args[0].getBytes(StandardCharsets.ISO_8859_1);
        AztecCode code = encodeFullRange(data);
        BitMatrix matrix = code.getMatrix();
        applyReaderInitializationMode(matrix, code.isCompact(), code.getLayers(), code.getCodeWords());

        int quiet = 2;
        int scale = 8;
        int width = (matrix.getWidth() + quiet * 2) * scale;
        int height = (matrix.getHeight() + quiet * 2) * scale;
        BufferedImage image = new BufferedImage(width, height, BufferedImage.TYPE_INT_RGB);

        for (int y = 0; y < height; y++) {
            for (int x = 0; x < width; x++) {
                image.setRGB(x, y, Color.WHITE.getRGB());
            }
        }

        for (int y = 0; y < matrix.getHeight(); y++) {
            for (int x = 0; x < matrix.getWidth(); x++) {
                if (matrix.get(x, y)) {
                    for (int yy = 0; yy < scale; yy++) {
                        for (int xx = 0; xx < scale; xx++) {
                            image.setRGB((x + quiet) * scale + xx, (y + quiet) * scale + yy, Color.BLACK.getRGB());
                        }
                    }
                }
            }
        }

        String output = args[1];
        String format = output.toLowerCase().endsWith(".bmp") ? "bmp" : "png";
        ImageIO.write(image, format, new File(output));
    }

    private static AztecCode encodeFullRange(byte[] data) {
        for (int layers = 1; layers <= 32; layers++) {
            try {
                return Encoder.encode(data, 33, layers);
            } catch (IllegalArgumentException ignored) {
                // Try the next full-range layer when the current layer has no capacity.
            }
        }
        throw new IllegalArgumentException("Data is too large for Full-Range Aztec.");
    }

    private static void applyReaderInitializationMode(BitMatrix matrix, boolean compact, int layers, int codeWords) throws Exception {
        int readerInitMask = compact ? 0x20 : 0x400;
        int modeCodeWords = ((codeWords - 1) | readerInitMask) + 1;

        Method generateModeMessage = Encoder.class.getDeclaredMethod(
            "generateModeMessage",
            boolean.class,
            int.class,
            int.class
        );
        generateModeMessage.setAccessible(true);
        BitArray modeMessage = (BitArray) generateModeMessage.invoke(null, compact, layers, modeCodeWords);

        redrawModeMessage(matrix, compact, modeMessage);
    }

    private static void redrawModeMessage(BitMatrix matrix, boolean compact, BitArray modeMessage) {
        int center = matrix.getWidth() / 2;

        if (compact) {
            for (int i = 0; i < 7; i++) {
                int offset = center - 3 + i;
                setModule(matrix, offset, center - 5, modeMessage.get(i));
                setModule(matrix, center + 5, offset, modeMessage.get(i + 7));
                setModule(matrix, offset, center + 5, modeMessage.get(20 - i));
                setModule(matrix, center - 5, offset, modeMessage.get(27 - i));
            }
            return;
        }

        for (int i = 0; i < 10; i++) {
            int offset = center - 5 + i + i / 5;
            setModule(matrix, offset, center - 7, modeMessage.get(i));
            setModule(matrix, center + 7, offset, modeMessage.get(i + 10));
            setModule(matrix, offset, center + 7, modeMessage.get(29 - i));
            setModule(matrix, center - 7, offset, modeMessage.get(39 - i));
        }
    }

    private static void setModule(BitMatrix matrix, int x, int y, boolean value) {
        if (value) {
            matrix.set(x, y);
        } else {
            matrix.unset(x, y);
        }
    }
}
