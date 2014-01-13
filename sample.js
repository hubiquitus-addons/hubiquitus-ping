var commander = require('commander');

commander
  .version('0.0.1')
  .option('-n, --name <n>', 'Container name')
  .parse(process.argv);

var hubiquitus = require('hubiquitus-core');
hubiquitus.logger.enable('hubiquitus:addons:ping', 'trace');

require('./index')(commander.name, 'http://localhost:1337');

hubiquitus.start();
