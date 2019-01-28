const path = require('path')
const carlo = require('carlo');
const meow = require('meow')
const daemonizeProcess = require('daemonize-process')

const cli = meow(`
  Usage
    $ web_to_desktop <input>

  Options
    --channel, -c Browser to be used.
    --daemon, -d run background.
`,{
  flags: {
    channel: {
      type: 'string',
      alias: 'c',
      default: 'stable'
    },
    daemon: {
      type: 'boolean',
      alias: 'd',
    }
  }
})

let url = cli.input[0]

if (url == null) {
  url = path.join('index.html')
}

const channel = cli.flags.channel

const config = {
  title: 'Web to Desktop',
  channel: [channel]
}

if (cli.flags.daemon) {
  daemonizeProcess();
}

carlo.launch(config).then(async app => {
  app.on('exit', () => process.exit());
  app.serveFolder(__dirname);
  app.setIcon(path.join(__dirname, 'icon.png'))
  await app.exposeFunction('env', _ => process.env);
  await app.load(url);
});
