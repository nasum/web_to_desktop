const path = require('path')
const carlo = require('carlo');
const meow = require('meow')

const cli = meow(`
  Usage
    $ web_to_desktop <input>

  Options
    --channel, -c Browser to be used.
`,{
  flags: {
    channel: {
      type: 'string',
      alias: 'c',
      default: 'stable'
    }
  }
})

let url = cli.input[0]

if (url == null) {
  url = path.join(__dirname, 'index.html')
}

const channel = cli.flags.channel

const config = {
  channel: [channel]
}

carlo.launch(config).then(async app => {
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);
  app.setIcon(path.join(__dirname, 'icon.png'))
  await app.exposeFunction('env', _ => process.env);
  await app.load(url);
});
