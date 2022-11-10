import path from 'path'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: path.resolve(__dirname, './src/index.ts'),
  output: {
    file: path.resolve(__dirname, './dist/index.js'),
    format: 'es',
  },
  plugins: [typescript()],
}
