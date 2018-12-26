const carlo = require('carlo');

let url = ""

if (process.argv[2]) {
  url = process.argv[2]
} else {
  url = 'index.html'
}

carlo.launch().then(async app => {
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);
  app.setIcon('icon.png')
  await app.exposeFunction('env', _ => process.env);
  await app.load(url);
});
