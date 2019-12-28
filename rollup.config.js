import babel from 'rollup-plugin-babel'

export default {
  input: 'src/index.js',
  output: [
    {
      name: 'webfont-extract',
      file: 'dist/webfont-extract.esm.js',
      format: 'esm'
    },
    {
      name: 'webfont-extract',
      file: 'dist/webfont-extract.umd.js',
      format: 'umd'
    },
  ],
  external: [
    'graceful-fs',
    'mkdirp',
    'xmldom'
  ],
  plugins: [
    babel({
      include: 'src/**'
    })
  ]
}
