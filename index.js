var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:addons:ping');
var _ = require('lodash');
var http = require('http');
var url = require('url');

module.exports = function (name, addr) {
  if (!_.isString(name)) throw new TypeError('Name must be a string');
  if (!_.isString(addr)) throw new TypeError('Addr must be an http URL');

  logger.info('ping configured with name: ' + name + '; addr: ' + addr);
  hubiquitus.addActor('hping', function () {
    if (this.started) return;
    this.started = true;

    var endpoint = url.resolve(addr, '/ping/' + name);
    (function tick() {
      logger.trace('ping...');
      http.get(endpoint, function (res) {
        setTimeout(tick, 500);
      }).on('error', function (err) {
        logger.warn('ping failed', err);
      });
    })();
  }, {name: name, addr: addr});

  hubiquitus.send('hping-master', 'hping');
};