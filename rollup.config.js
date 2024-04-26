import vue from "rollup-plugin-vue";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import postcss from "rollup-plugin-postcss";
import typescript from "rollup-plugin-typescript2";
import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import replace from "@rollup/plugin-replace";
import postcssUrl from "postcss-url";
import cssnano from "cssnano";
import postcssImport from "postcss-import";

import livereload from "rollup-plugin-livereload";
import serve from "rollup-plugin-serve";

const extensions = [".js", ".ts", ".vue"];

const plugins = [
  alias({
    entries: [
      {
        find: "@",
        replacement: new URL("./src", import.meta.url).pathname,
      },
      {
        find: "vue",
        replacement: "vue/dist/vue.runtime.esm-browser.prod.js",
      },
    ],
  }),
  replace({
    preventAssignment: true,
    "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
  }),
  resolve({ extensions, browser: true }),
  typescript({
    check: false,
  }),
  commonjs(),
  vue({
    css: false,
    compileTemplate: true,
  }),
  postcss({
    minimize: true,
    extensions: [".css", "scss"],
    exec: true,
    plugins: [postcssUrl({ url: "inline" }), postcssImport(), cssnano()],
    modules: {
      generateScopedName: "[local]___[hash:base64:5]",
    },
  }),
  babel({
    exclude: "node_modules/**",
    babelHelpers: "runtime",
    extensions: [
      ".mjs",
      ".jsx",
      ".es6",
      ".es",
      ".js",
      ".json",
      ".node",
      ".css",
      ".png",
      ".vue",
    ],
  }),
];

if (process.env.NODE_ENV === "development") {
  plugins.push(livereload());
  plugins.push(
    serve({
      historyApiFallback: true,
      contentBase: ["public", "dist"],
      host: "0.0.0.0",
      port: 80,
      strictPort: true,
      cors: true,
    })
  );
}

export default {
  input: "src/index.ts",
  external: [],
  plugins,
  output: {
    file: "dist/bundle.js",
    format: "umd",
    name: "__sdk__",
  },
};
