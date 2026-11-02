import QRCodeStyling from 'qr-code-styling';
import { buildOptions } from './qrOptions.js';

export async function downloadQr({ data, style, size = 1000, format, name }) {
  const inst = new QRCodeStyling({ ...buildOptions(data, style, size), type: format === 'svg' ? 'svg' : 'canvas' });
  await inst.download({ name, extension: format });
}
