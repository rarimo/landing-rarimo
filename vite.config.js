import { resolve } from 'path';
import { defineConfig } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  base: '/',
  publicDir: 'static',
  server: {
    port: 3000,
  },
  plugins: [
    handlebars({
      partialDirectory: resolve(__dirname, 'src/partials'),
    }),
    createHtmlPlugin({
      minify: true,
      entry: '/src/main.js',
      template: '/index.html',
    }),
  ],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @import "src/styles/_functions.scss";
          @import "src/styles/_mixins.scss";
          @import "src/styles/_placeholders.scss";
          @import "src/styles/_media.scss";
        `,
      },
    },
  },
});
