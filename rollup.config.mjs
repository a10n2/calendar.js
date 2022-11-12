import path from 'path'
import typescript from 'rollup-plugin-typescript2'

export default {
  input: path.resolve(__dirname, './src/index.ts'),
  output: [
    {
      file: path.resolve(__dirname, './dist/index.esm.js'),
      format: 'es',
    },
    {
      file: path.resolve(__dirname, './dist/index.com.js'),
      format: 'cjs',
    },
  ],
  plugins: [typescript()],
}
