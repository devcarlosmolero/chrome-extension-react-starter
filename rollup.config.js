import commonjs from '@rollup/plugin-commonjs'
import resolve from '@rollup/plugin-node-resolve'
import replace from '@rollup/plugin-replace'
import typescript from '@rollup/plugin-typescript'
import dotenv from 'dotenv'
import path from 'path'
import { chromeExtension, simpleReloader } from 'rollup-plugin-chrome-extension'
import { emptyDir } from 'rollup-plugin-empty-dir'
import postcss from 'rollup-plugin-postcss'
import zip from 'rollup-plugin-zip'

const isProduction = process.env.NODE_ENV === 'production'
const dotenvResult = dotenv.config({
  path: isProduction ? './.env.prod' : './.env.dev',
})

export default {
  input: 'src/manifest.json',
  output: {
    dir: 'chrome-extension-starter-react-dist',
    format: 'esm',
    chunkFileNames: path.join('chunks', '[name]-[hash].js'),
  },
  plugins: [
    postcss({
      inject: true,
      minimize: isProduction,
      plugins: [require('@tailwindcss/postcss'), require('autoprefixer')],
    }),
    replace({
      'process.env.NODE_ENV': process.env.NODE_ENV,
      'process.env': JSON.stringify(dotenvResult.parsed),
      preventAssignment: true,
    }),
    chromeExtension(),
    simpleReloader(),
    resolve(),
    commonjs(),
    typescript(),
    emptyDir(),
    isProduction && zip({ dir: 'releases' }),
  ],
}
