/**
 * Generates a beautiful share card for Instagram/WhatsApp stories using Canvas API.
 * This bypasses html2canvas entirely for pixel-perfect rendering.
 */

// Story dimensions (9:16 aspect ratio)
const CARD_WIDTH = 1080;
const CARD_HEIGHT = 1920;

/**
 * Wait for fonts to be ready before drawing
 */
async function ensureFontsLoaded(fonts: string[]) {
  if (document.fonts) {
    await document.fonts.ready;
    for (const font of fonts) {
      try {
        await document.fonts.load(`400 48px "${font}"`);
        await document.fonts.load(`500 48px "${font}"`);
        await document.fonts.load(`600 48px "${font}"`);
      } catch {
        // Font may not be available, fallback will be used
      }
    }
  }
}

/**
 * Draw centered text with letter spacing
 */
function drawCenteredText(
  ctx: CanvasRenderingContext2D,
  text: string,
  y: number,
  letterSpacing = 0
) {
  if (letterSpacing === 0) {
    ctx.fillText(text, CARD_WIDTH / 2, y);
    return;
  }
  // Manual letter spacing
  const chars = text.split('');
  const totalWidth = chars.reduce((w, char) => w + ctx.measureText(char).width + letterSpacing, -letterSpacing);
  let x = (CARD_WIDTH - totalWidth) / 2;
  for (const char of chars) {
    ctx.fillText(char, x + ctx.measureText(char).width / 2, y);
    x += ctx.measureText(char).width + letterSpacing;
  }
}

/**
 * Draw a thin decorative line
 */
function drawDivider(
  ctx: CanvasRenderingContext2D,
  y: number,
  color: string,
  width = 120
) {
  const gradient = ctx.createLinearGradient(
    CARD_WIDTH / 2 - width / 2, y,
    CARD_WIDTH / 2 + width / 2, y
  );
  gradient.addColorStop(0, 'transparent');
  gradient.addColorStop(0.3, color);
  gradient.addColorStop(0.7, color);
  gradient.addColorStop(1, 'transparent');
  ctx.strokeStyle = gradient;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(CARD_WIDTH / 2 - width / 2, y);
  ctx.lineTo(CARD_WIDTH / 2 + width / 2, y);
  ctx.stroke();
}

/**
 * Draw a small diamond shape
 */
function drawDiamond(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
  color: string
) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x + size, y);
  ctx.lineTo(x, y + size);
  ctx.lineTo(x - size, y);
  ctx.closePath();
  ctx.fill();
}

// ============ Theme A (Dark Luxury) ============

export async function generateShareCardA(recipientName?: string | null): Promise<Blob> {
  await ensureFontsLoaded(['Cinzel', 'Playfair Display', 'Inter']);

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Background gradient
  const bgGrad = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bgGrad.addColorStop(0, '#09090b');
  bgGrad.addColorStop(0.4, '#0f0f12');
  bgGrad.addColorStop(0.7, '#0c0c0f');
  bgGrad.addColorStop(1, '#09090b');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Subtle radial glow
  const glow = ctx.createRadialGradient(
    CARD_WIDTH / 2, CARD_HEIGHT * 0.4, 100,
    CARD_WIDTH / 2, CARD_HEIGHT * 0.4, 600
  );
  glow.addColorStop(0, 'rgba(212, 175, 55, 0.06)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let y = 520;

  // Bismillah
  ctx.font = '400 42px "Playfair Display", serif';
  ctx.fillStyle = 'rgba(229, 197, 88, 0.8)';
  ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم', CARD_WIDTH / 2, y);

  y += 100;

  // "Perayaan Pernikahan" label
  ctx.font = '500 24px "Cinzel", serif';
  ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
  drawCenteredText(ctx, 'PERAYAAN PERNIKAHAN', y, 12);

  y += 120;

  // Groom name
  ctx.font = '500 120px "Cinzel", serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Ahsan', CARD_WIDTH / 2, y);

  y += 100;

  // Ampersand
  ctx.font = 'italic 72px "Playfair Display", serif';
  ctx.fillStyle = 'rgba(229, 197, 88, 0.7)';
  ctx.fillText('&', CARD_WIDTH / 2, y);

  y += 100;

  // Bride name
  ctx.font = '500 120px "Cinzel", serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
  ctx.fillText('Shinta', CARD_WIDTH / 2, y);

  y += 100;

  // Divider
  drawDivider(ctx, y, 'rgba(212, 175, 55, 0.5)', 200);

  y += 80;

  // Recipient name
  if (recipientName) {
    ctx.font = '400 22px "Cinzel", serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    drawCenteredText(ctx, 'KEPADA YTH.', y, 6);
    y += 50;
    ctx.font = 'italic 42px "Playfair Display", serif';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText(recipientName, CARD_WIDTH / 2, y);
    y += 80;
  }

  // Date
  ctx.font = '500 30px "Cinzel", serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  drawCenteredText(ctx, '2 JUNI 2026', y, 8);

  y += 50;

  // Diamond separator
  drawDiamond(ctx, CARD_WIDTH / 2, y, 6, 'rgba(212, 175, 55, 0.5)');

  y += 50;

  // Location
  ctx.font = '500 30px "Cinzel", serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
  drawCenteredText(ctx, 'MAKASSAR', y, 8);

  // Bottom URL
  ctx.font = '400 22px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillText('shintahsan.my.id', CARD_WIDTH / 2, CARD_HEIGHT - 80);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
      'image/png'
    );
  });
}

// ============ Theme S (Bright Islamic) ============

export async function generateShareCardS(recipientName?: string | null): Promise<Blob> {
  await ensureFontsLoaded(['Cinzel', 'Great Vibes', 'Amiri', 'Inter']);

  const canvas = document.createElement('canvas');
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;
  const ctx = canvas.getContext('2d')!;

  // Background - cream
  const bgGrad = ctx.createLinearGradient(0, 0, CARD_WIDTH, CARD_HEIGHT);
  bgGrad.addColorStop(0, '#FFFCF7');
  bgGrad.addColorStop(0.5, '#FFF9ED');
  bgGrad.addColorStop(1, '#FFFCF7');
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Subtle emerald glow
  const glow = ctx.createRadialGradient(
    CARD_WIDTH / 2, CARD_HEIGHT * 0.38, 100,
    CARD_WIDTH / 2, CARD_HEIGHT * 0.38, 500
  );
  glow.addColorStop(0, 'rgba(5, 150, 105, 0.04)');
  glow.addColorStop(1, 'transparent');
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, CARD_WIDTH, CARD_HEIGHT);

  // Decorative border frame
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.15)';
  ctx.lineWidth = 2;
  const margin = 60;
  ctx.strokeRect(margin, margin, CARD_WIDTH - margin * 2, CARD_HEIGHT - margin * 2);

  // Inner frame
  ctx.strokeStyle = 'rgba(5, 150, 105, 0.08)';
  ctx.lineWidth = 1;
  ctx.strokeRect(margin + 15, margin + 15, CARD_WIDTH - (margin + 15) * 2, CARD_HEIGHT - (margin + 15) * 2);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  let y = 480;

  // Bismillah
  ctx.font = '400 48px "Amiri", serif';
  ctx.fillStyle = 'rgba(4, 120, 87, 0.5)';
  ctx.fillText('بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيمِ', CARD_WIDTH / 2, y);

  y += 100;

  // "Undangan Pernikahan" label
  ctx.font = '500 24px "Cinzel", serif';
  ctx.fillStyle = 'rgba(39, 39, 42, 0.5)';
  drawCenteredText(ctx, 'UNDANGAN PERNIKAHAN', y, 10);

  y += 130;

  // Bride name (Script)
  ctx.font = '400 130px "Great Vibes", cursive';
  ctx.fillStyle = '#047857';
  ctx.fillText('Shinta', CARD_WIDTH / 2, y);

  y += 90;

  // Ampersand
  ctx.font = '500 56px "Cinzel", serif';
  ctx.fillStyle = '#D4AF37';
  drawCenteredText(ctx, '&', y, 20);

  y += 90;

  // Groom name (Script)
  ctx.font = '400 130px "Great Vibes", cursive';
  ctx.fillStyle = '#047857';
  ctx.fillText('Ahsan', CARD_WIDTH / 2, y);

  y += 100;

  // Decorative divider
  drawDivider(ctx, y, 'rgba(212, 175, 55, 0.4)', 240);
  drawDiamond(ctx, CARD_WIDTH / 2, y, 6, 'rgba(212, 175, 55, 0.4)');

  y += 80;

  // Recipient name
  if (recipientName) {
    ctx.font = '400 22px "Cinzel", serif';
    ctx.fillStyle = 'rgba(39, 39, 42, 0.4)';
    drawCenteredText(ctx, 'KEPADA YTH.', y, 6);
    y += 50;
    ctx.font = '500 40px "Cinzel", serif';
    ctx.fillStyle = '#047857';
    ctx.fillText(recipientName, CARD_WIDTH / 2, y);
    y += 80;
  }

  // Date
  ctx.font = '500 30px "Cinzel", serif';
  ctx.fillStyle = 'rgba(39, 39, 42, 0.65)';
  drawCenteredText(ctx, '18 MEI 2026', y, 8);

  y += 50;

  // Diamond separator
  drawDiamond(ctx, CARD_WIDTH / 2, y, 6, 'rgba(5, 150, 105, 0.3)');

  y += 50;

  // Location
  ctx.font = '500 30px "Cinzel", serif';
  ctx.fillStyle = 'rgba(39, 39, 42, 0.65)';
  drawCenteredText(ctx, 'MAJALENGKA', y, 8);

  // Bottom URL
  ctx.font = '400 22px "Inter", sans-serif';
  ctx.fillStyle = 'rgba(39, 39, 42, 0.2)';
  ctx.fillText('shintahsan.my.id', CARD_WIDTH / 2, CARD_HEIGHT - 80);

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error('Canvas toBlob failed')),
      'image/png'
    );
  });
}
