export function generateFakeQrCode(): string {
  const canvas = document.createElement('canvas');
  const size = 200;
  const moduleSize = 10;
  const modules = size / moduleSize;
  
  canvas.width = size;
  canvas.height = size;
  
  const ctx = canvas.getContext('2d');
  if (!ctx) return '';
  
  // White background
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, size, size);
  
  // Random black modules
  ctx.fillStyle = '#000000';
  for (let y = 0; y < modules; y++) {
    for (let x = 0; x < modules; x++) {
      if (Math.random() > 0.5) {
        ctx.fillRect(x * moduleSize, y * moduleSize, moduleSize, moduleSize);
      }
    }
  }
  
  // Add corner markers (position detection patterns)
  const drawCornerMarker = (x: number, y: number) => {
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, moduleSize * 7, moduleSize * 7);
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(x + moduleSize, y + moduleSize, moduleSize * 5, moduleSize * 5);
    ctx.fillStyle = '#000000';
    ctx.fillRect(x + moduleSize * 2, y + moduleSize * 2, moduleSize * 3, moduleSize * 3);
  };
  
  drawCornerMarker(0, 0);
  drawCornerMarker(size - moduleSize * 7, 0);
  drawCornerMarker(0, size - moduleSize * 7);
  
  return canvas.toDataURL('image/png');
}
