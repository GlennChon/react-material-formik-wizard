import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import external from "rollup-plugin-peer-deps-external";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";
import url from "rollup-plugin-url";
import svgr from "@svgr/rollup";
import { uglify } from "rollup-plugin-uglify";

import pkg from "./package.json";

const minifyExtension = pathToFile => pathToFile.replace(/\.js$/, ".min.js");

export default {
  input: "src/index.js",
  output: [
    {
      file: minifyExtension(pkg.main),
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
    external(),
    postcss({
      modules: true
    }),
    url({
      limit: 100 * 100 * 1024,
      include: ["**/*.svg", "**/*.wasm"]
    }),
    svgr(),
    babel({
      exclude: "node_modules/**",
      plugins: ["external-helpers"]
    }),
    resolve(),
    commonjs(),
    uglify()
  ]
};
