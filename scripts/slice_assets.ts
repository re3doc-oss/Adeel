import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const srcImg = 'public/assets/aistudio/file_00000000226c8208a10d21922e4e5309_c4aee8e3.png';
const outDir = 'public/images';

async function fineTuneAssets() {
  const crops = [
    // Clean logo
    { name: 'logo.png', left: 34, top: 38, width: 200, height: 50 },
    { name: 'logo-footer.png', left: 38, top: 884, width: 190, height: 50 },
    
    // Hero showcase (start at left 415 to skip text letters, keep full skyline and display)
    { name: 'hero-showcase.png', left: 418, top: 88, width: 520, height: 400 },
    
    // Services (Cards top row: top ~571, height ~138)
    { name: 'service-printing.png', left: 49, top: 571, width: 201, height: 137 },
    { name: 'service-embroidery.png', left: 268, top: 571, width: 201, height: 137 },
    { name: 'service-advertising.png', left: 486, top: 571, width: 201, height: 137 },
    { name: 'service-corporate-gifts.png', left: 704, top: 571, width: 201, height: 137 },
    
    // Portfolio Row 1
    { name: 'portfolio-business-cards.png', left: 39, top: 1004, width: 209, height: 126 },
    { name: 'portfolio-embroidered-caps.png', left: 257, top: 1004, width: 209, height: 126 },
    { name: 'portfolio-store-signage.png', left: 474, top: 1004, width: 209, height: 126 },
    { name: 'portfolio-vehicle-branding.png', left: 692, top: 1004, width: 209, height: 126 },

    // Portfolio Row 2
    { name: 'portfolio-banners.png', left: 39, top: 1172, width: 209, height: 126 },
    { name: 'portfolio-uniforms.png', left: 257, top: 1172, width: 209, height: 126 },
    { name: 'portfolio-packaging.png', left: 474, top: 1172, width: 209, height: 126 },
    { name: 'portfolio-corporate-gifts.png', left: 692, top: 1172, width: 209, height: 126 },

    // Badges / Icons
    { name: 'badge-printer.png', left: 38, top: 236, width: 38, height: 38 },
    { name: 'badge-embroidery.png', left: 152, top: 236, width: 38, height: 38 },
    { name: 'badge-marketing.png', left: 268, top: 236, width: 38, height: 38 },
  ];

  for (const crop of crops) {
    try {
      await sharp(srcImg)
        .extract({ left: crop.left, top: crop.top, width: crop.width, height: crop.height })
        .png({ quality: 95 })
        .toFile(path.join(outDir, crop.name));
    } catch (e) {
      console.error(`Error generating ${crop.name}:`, e);
    }
  }
  console.log('Fine tuned assets complete');
}

fineTuneAssets();
