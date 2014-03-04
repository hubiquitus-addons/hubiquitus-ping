var commander = require('commander');
var version = require('./package').version;

commander
  .version(version)
  .option('-n, --name <n>', 'Container name')
  .parse(process.argv);

var hubiquitus = require('hubiquitus-core');
hubiquitus.set('name', commander.name);
hubiquitus.logger.enable('hubiquitus:addons:ping', 'trace');

require('./index')('http://localhost:1337');

hubiquitus.start();
