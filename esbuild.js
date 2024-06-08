import { build } from 'esbuild';


build({
  entryPoints: [
    'src/index.css',
    'src/animax.min.ts'
  ],
  target: 'es2020',
  bundle: true,
  minify: true,
  outdir: 'dist',
  sourcemap: false,
  platform: "browser",
  allowOverwrite: true,
  loader: {}
}).then(function () {
  console.log('Aplication was successfully built')
}).catch(function (err) {
  console.error('', err)
  process.exit(1);
})