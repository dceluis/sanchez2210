import { defineConfig } from 'vite';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let resolvedConfig;

export default defineConfig({
  build: {
    outDir: 'docs', // Output directory defined here
  },
  plugins: [
    {
      name: 'copy-cname',
      configResolved(config) {
        resolvedConfig = config;
      },
      async writeBundle(options, bundle) {
        if (resolvedConfig) {
          try {
            const outDir = resolvedConfig.build.outDir || 'dist'; // Fallback to 'dist' if not defined
            const sourcePath = path.resolve(__dirname, 'CNAME'); // Source file in root
            const destPath = path.resolve(__dirname, outDir, 'CNAME'); // Destination in outDir
            await fs.copyFile(sourcePath, destPath);
            console.log(`CNAME file copied to ${outDir} folder successfully`);
          } catch (error) {
            console.error('Error copying CNAME file:', error);
          }
        }
      },
    },
  ],
});
