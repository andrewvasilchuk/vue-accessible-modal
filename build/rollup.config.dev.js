import path from 'path'
import common from 'rollup-plugin-commonjs'
import serve from 'rollup-plugin-serve'
import livereload from 'rollup-plugin-livereload'
import vue from 'rollup-plugin-vue'
import resolve from 'rollup-plugin-node-resolve'
import replace from 'rollup-plugin-replace'

export default {
  input: path.join(__dirname, '..', 'demo', 'index.js'),
  output: {
    file: path.join(__dirname, '..', 'demo', 'demo.js'),
    format: 'iife',
    name: 'demo',
    sourcemap: true,
  },
  plugins: [
    common(),
    // demo crashes on changes https://github.com/vuejs/rollup-plugin-vue/issues/238
    vue({ needMap: false }),
    replace({
      'process.env.NODE_ENV': JSON.stringify('development'),
    }),
    resolve(),
    serve({
      open: true,
      contentBase: path.join(__dirname, '..', 'demo'),
      port: 8080,
    }),
    livereload({
      verbose: true,
      watch: path.join(__dirname, '..', 'demo'),
    }),
  ],
}
