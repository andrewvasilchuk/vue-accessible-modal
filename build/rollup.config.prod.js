import path from 'path'
import vue from 'rollup-plugin-vue'
import { terser } from 'rollup-plugin-terser'
import replace from 'rollup-plugin-replace'
import resolve from 'rollup-plugin-node-resolve'
import common from 'rollup-plugin-commonjs'

const name = 'VueAccessibleModal'
const plugins = [
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  resolve(),
  common(),
  vue(),
  terser(),
]

export default [
  {
    input: path.join(__dirname, '..', 'src', 'index.js'),
    output: [
      {
        file: 'dist/vue-accessible-modal.js',
        format: 'umd',
        name,
      },
      {
        file: 'dist/vue-accessible-modal.common.js',
        format: 'cjs',
      },
      {
        file: 'dist/vue-accessible-modal.esm.js',
        format: 'esm',
      },
    ],
    plugins,
  },
  {
    input: path.join(__dirname, '..', 'src', 'index.js'),
    output: {
      file: 'dist/vue-accessible-modal.min.js',
      format: 'umd',
      name,
    },
    plugins,
  },
]
