import sharp from "sharp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public/images/hero-wizard-gestures.webp");
const output = path.join(root, "public/images/hero-wizard-idle-loop.webp");
const size = 724;
const count = 22;
const centerX = 410;

function clamp(value) {
  return Math.max(0, Math.min(1, value));
}

function smoothstep(start, end, value) {
  const amount = clamp((value - start) / (end - start));
  return amount * amount * (3 - 2 * amount);
}

async function main() {
  const { data: idle } = await sharp(source)
    .extract({ left: 0, top: 0, width: size, height: size })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { data: greeting } = await sharp(source)
    .extract({ left: size, top: 0, width: size, height: size })
    .ensureAlpha().raw().toBuffer({ resolveWithObject: true });

  const frames = [];
  for (let frame = 0; frame < count; frame++) {
    const phase = 2 * Math.PI * frame / (count - 1);
    const breath = Math.sin(phase);
    const sway = Math.sin(phase + 0.25);
    const hairLag = Math.sin(phase - 0.55);
    const clothLag = Math.sin(phase - 0.85);
    const blink = frame === 15 ? 1 : frame === 14 ? 0.35 : 0;
    const pose = Buffer.from(idle);

    if (blink) {
      const eyes = [
        { x: 391, y: 225, rx: 35, ry: 30 },
        { x: 469, y: 221, rx: 35, ry: 30 },
      ];
      for (const eye of eyes) {
        for (let y = eye.y - eye.ry; y < eye.y + eye.ry; y++) {
          for (let x = eye.x - eye.rx; x < eye.x + eye.rx; x++) {
            const distance = Math.hypot((x - eye.x) / eye.rx, (y - eye.y) / eye.ry);
            const mask = blink * (1 - smoothstep(0.76, 1, distance));
            if (mask <= 0) continue;
            const index = (y * size + x) * 4;
            for (let channel = 0; channel < 3; channel++) {
              pose[index + channel] = Math.round(idle[index + channel] * (1 - mask) + greeting[index + channel] * mask);
            }
          }
        }
      }
    }

    const result = Buffer.alloc(size * size * 4);
    for (let y = 0; y < size; y++) {
      const headWeight = 1 - smoothstep(315, 650, y);
      const chestWeight = Math.exp(-(((y - 394) / 150) ** 2));
      const hairWeight = smoothstep(240, 465, y) * (1 - smoothstep(615, 700, y));
      const hemWeight = smoothstep(420, 550, y) * (1 - smoothstep(620, 705, y));
      const vertical = -3.2 * breath * chestWeight - 1.1 * breath * headWeight;
      for (let x = 0; x < size; x++) {
        const hairZone = 1 - smoothstep(285, 360, x) + smoothstep(515, 580, x);
        const hemZone = 1 - smoothstep(335, 400, x) + smoothstep(510, 570, x);
        const horizontal = 2.3 * sway * headWeight
          + (x - centerX) * 0.011 * breath * chestWeight
          + 4.4 * hairLag * hairWeight * hairZone
          + 2.1 * clothLag * hemWeight * hemZone;
        const sourceX = Math.round(x - horizontal);
        const sourceY = Math.round(y - vertical);
        if (sourceX < 0 || sourceX >= size || sourceY < 0 || sourceY >= size) continue;
        const from = (sourceY * size + sourceX) * 4;
        const to = (y * size + x) * 4;
        result[to] = pose[from];
        result[to + 1] = pose[from + 1];
        result[to + 2] = pose[from + 2];
        result[to + 3] = pose[from + 3];
      }
    }
    frames.push({ input: result, raw: { width: size, height: size, channels: 4 }, left: frame * size, top: 0 });
  }

  await sharp({ create: { width: size * count, height: size, channels: 4, background: "#00000000" } })
    .composite(frames)
    .webp({ quality: 90, effort: 5 })
    .toFile(output);
  console.log(output);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
