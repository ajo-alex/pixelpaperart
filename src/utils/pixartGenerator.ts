type Pixel = {
  id: string;
  color: string;
};

export async function generatePixelArt(
  input: File | Blob | string,
  size: number = 40
): Promise<Pixel[]> {

  // Load image
  const img = await loadImage(input);

  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d")!;

  canvas.width = size;
  canvas.height = size;

  // 🔥 Disable smoothing for pixel effect
  ctx.imageSmoothingEnabled = false;

  // Draw resized image (pixelated)
  ctx.drawImage(img, 0, 0, size, size);

  // Get pixel data
  const data = ctx.getImageData(0, 0, size, size).data;

  const pixels: Pixel[] = [];

  for (let y = 0; y < size; y++) {
    const rowLabel = getRowLabel(y);

    for (let x = 0; x < size; x++) {
      const index = (y * size + x) * 4;

      const r = data[index];
      const g = data[index + 1];
      const b = data[index + 2];

      const factor = 32;
      const rQ = Math.floor(r / factor) * factor;
      const gQ = Math.floor(g / factor) * factor;
      const bQ = Math.floor(b / factor) * factor;

      const hex = rgbToHex(rQ, gQ, bQ);

      pixels.push({
        id: `${rowLabel}${x + 1}`,
        color: hex,
      });
    }
  }

  return pixels;
}

function loadImage(input: File | Blob | string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const img = new Image();

    if (typeof input === "string") {
      img.src = input;
    } else {
      img.src = URL.createObjectURL(input);
    }

    img.onload = () => resolve(img);
    img.onerror = reject;
  });
}

function getRowLabel(index: number): string {
  let label = "";
  index += 1;

  while (index > 0) {
    const rem = (index - 1) % 26;
    label = String.fromCharCode(97 + rem) + label;
    index = Math.floor((index - 1) / 26);
  }

  return label;
}

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
  );
}