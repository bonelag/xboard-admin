import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'node:fs';
import path from 'node:path';

const languageWorkerNames = [
  'css.worker.js',
  'html.worker.js',
  'json.worker.js',
  'ts.worker.js',
];

const editorWorkerName = 'editor.worker.js';
const monacoWorkerNames = [...languageWorkerNames, editorWorkerName];

function monacoWorkerAssets() {
  const sourceDir = path.resolve(__dirname, '../minify/assets');
  const outputDir = path.resolve(__dirname, '../dist/assets/workers');

  function createEditorWorkerSource() {
    const jsonWorkerSource = fs.readFileSync(path.join(sourceDir, 'json.worker.js'), 'utf8');
    const bootstrapIndex = jsonWorkerSource.lastIndexOf('    self.onmessage = () => {');

    if (bootstrapIndex < 0) {
      throw new Error('Cannot find Monaco worker bootstrap in json.worker.js');
    }

    // Reuse the original bundled core worker, but skip the JSON language bootstrap.
    return `${jsonWorkerSource.slice(0, bootstrapIndex)}    self.onmessage = () => {
        ns(() => undefined);
    };
})();
`;
  }

  function writeWorkerAsset(filename, destination) {
    if (filename === editorWorkerName) {
      fs.writeFileSync(destination, createEditorWorkerSource());
      return;
    }

    fs.copyFileSync(path.join(sourceDir, filename), destination);
  }

  return {
    name: 'xboard-monaco-worker-assets',
    configureServer(server) {
      server.middlewares.use('/assets/workers', (req, res, next) => {
        const filename = path.basename(req.url.split('?')[0]);
        if (!monacoWorkerNames.includes(filename)) {
          next();
          return;
        }

        const workerPath = path.join(sourceDir, filename);
        if (filename !== editorWorkerName && !fs.existsSync(workerPath)) {
          next();
          return;
        }

        res.setHeader('Content-Type', 'text/javascript; charset=utf-8');
        if (filename === editorWorkerName) {
          res.end(createEditorWorkerSource());
          return;
        }

        fs.createReadStream(workerPath).pipe(res);
      });
    },
    closeBundle() {
      fs.mkdirSync(outputDir, { recursive: true });
      for (const filename of monacoWorkerNames) {
        writeWorkerAsset(filename, path.join(outputDir, filename));
      }
    },
  };
}

export default defineConfig({
  plugins: [react(), monacoWorkerAssets()],
  base: './',
  esbuild: {
    loader: 'jsx',
    include: /source\/.*\.jsx?$/,
    exclude: [],
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        '.js': 'jsx',
      },
    },
  },
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    manifest: true,
    rollupOptions: {
      output: {
        assetFileNames: 'assets/[name]-[hash][extname]',
        chunkFileNames: 'assets/[name]-[hash].js',
        entryFileNames: 'assets/[name]-[hash].js',
      }
    }
  }
});
