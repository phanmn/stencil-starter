import { Config } from '@stencil/core';
import { postcss } from "@stencil/postcss";
import purgecss from '@fullhuman/postcss-purgecss';
import tailwindcss from 'tailwindcss';
import { stylus } from '@stencil/stylus';
// https://github.com/duetds/date-picker/blob/master/stencil.config.ts

const purge = purgecss({
  content: ["./src/**/*.tsx", "./src/index.html"],
  defaultExtractor: (content) => content.match(/[A-Za-z0-9-_:/]+/g) || [],
  safelist: ['hidden'],
});

export const config: Config = {
  namespace: 'stencil-starter',
  minifyCss: true,
  buildEs5: true,
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      empty: true,
    },
    {
      type: 'dist-custom-elements-bundle',
      empty: true,
    },
    {
      type: 'docs-readme',
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      empty: true,
      // copy: [
      //   { src: 'assets', dest: 'build/assets' }
      // ],
    },
  ],
  globalStyle: 'src/global/styles.css',
  plugins: [
    stylus(),
    postcss({
      plugins: [
        tailwindcss("./tailwind.config.js"),
        ...(process.env.NODE_ENV === "production"
          ? [purge]
          : [])
      ]
    })
  ]
};
