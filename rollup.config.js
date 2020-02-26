import react from "react";
import reactDom from "react-dom";
import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";

import pkg from "./package.json";

export default {
  input: "src/index.js",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true
    },
    {
      file: pkg.module,
      format: "es",
      sourcemap: true
    }
  ],
  plugins: [
    resolve(),
    external(),
    postcss({
      modules: true
    }),
    url({
      limit: 100 * 100 * 1024,
      include: ["**/*.svg", "**/*.wasm"]
    }),
    svgr(),
    commonjs({
      include: "node_modules/**",
      extensions: [".js", ".jsx"],
      namedExports: {
        react: Object.keys(react),
        "react-dom": Object.keys(reactDom)
      }
    }),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    })
  ]
};
