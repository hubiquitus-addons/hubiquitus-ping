var hubiquitus = require('hubiquitus-core');
hubiquitus.logger.enable('hubiquitus:addons:ping', 'trace');
require('./index')('sample', 'http://localhost:1337');

hubiquitus.start();
