import vue from 'rollup-plugin-vue';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import postcss from 'rollup-plugin-postcss';
import typescript from 'rollup-plugin-typescript2';
import alias from '@rollup/plugin-alias';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import postcssUrl from 'postcss-url';
import cssnano from 'cssnano';
import postcssImport from 'postcss-import';
import image from '@rollup/plugin-image';
import terser from '@rollup/plugin-terser';
import copyHtml from './copyHtml';
import { visualizer } from "rollup-plugin-visualizer";

import livereload from 'rollup-plugin-livereload';
import serve from 'rollup-plugin-serve';

const version = require('./package.json').version;

const plugins = [
  alias({
    entries: [
      {
        find: '@',
        replacement: new URL('./src', import.meta.url).pathname,
      },
      {
        find: 'vue',
        replacement: 'vue/dist/vue.runtime.esm-browser.prod.js',
      },
    ],
  }),
  replace({
    preventAssignment: true,
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
  resolve({
    preferBuiltins: false,
    extensions: ['.mjs', '.js', '.json', '.css', '.vue'],
  }),
  typescript({
    check: false,
  }),
  vue({
    css: false,
    compileTemplate: true,
  }),
  commonjs(),
  image(),
  postcss({
    minimize: true,
    extensions: ['.css', 'scss'],
    exec: true,
    plugins: [postcssUrl({ url: 'inline' }), postcssImport(), cssnano()],
    modules: {
      generateScopedName: '[local]___[hash:base64:5]',
    },
  }),
  babel({
    exclude: 'node_modules/**',
    babelHelpers: 'runtime',
    extensions: ['.mjs', '.jsx', '.es6', '.es', '.js', '.ts', '.json', '.node', '.css', '.png', '.vue'],
  }),
  copyHtml(),
];

if (process.env.NODE_ENV === 'production') {
  plugins.push(terser());
  // 打包体积分析
  // plugins.push(visualizer({ filename: 'visualizer.html', gzipSize: true }));
}

if (process.env.NODE_ENV === 'development') {
  plugins.push(livereload());
  plugins.push(
    serve({
      historyApiFallback: true,
      contentBase: ['public', 'dist'],
      host: '0.0.0.0',
      port: 80,
      strictPort: true,
      cors: true,
    }),
  );
}

export default {
  input: 'src/index.ts',
  external: [],
  plugins,
  output: {
    file: `dist/${version}/index.js`,
    format: 'umd',
    name: '__sdk__',
  },
};
