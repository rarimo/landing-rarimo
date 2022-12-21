import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';
import * as fs from 'fs';
import * as path from 'path';
import { TEMPLATE_CONTEXT } from './src/template-context';

const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relative => path.resolve(appDirectory, relative);
const root = path.resolve(__dirname, resolveApp('src'));

export default defineConfig({
  base: '/',
  publicDir: 'static',
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(root, 'partials'),
      helpers: {
        setVariable(varName, varValue, options) {
          const root = {
            ...(Boolean(options.data.root) && options.data.root),
            [varName]: varValue,
          };
          options.data.root = root;
        },
        getShiftedDelay(index, shiftMs) {
          return index * shiftMs;
        },
        scaleImgDims(value) {
          return value * 1.3;
        },
      },
      context: TEMPLATE_CONTEXT,
    }),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: '/index.html',
    }),
  ],
  resolve: {
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
    alias: {
      '@': `${root}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/base/_functions.scss";
          @import "src/styles/base/_mixins.scss";
          @import "src/styles/base/_placeholders.scss";
          @import "src/styles/base/_media.scss";
        `,
      },
    },
  },
});
