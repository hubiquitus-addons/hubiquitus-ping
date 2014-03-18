var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:addons:ping');
var _ = require('lodash');
var http = require('http');
var url = require('url');

module.exports = function (addr, name) {
  name = name || hubiquitus.properties.name;

  if (!_.isString(name)) throw new TypeError('Name must be a string');
  if (!_.isString(addr)) throw new TypeError('Addr must be an http URL');

  logger.info('ping configured with name: ' + name + '; addr: ' + addr);

  if (this.started) return logger.warn('already emitting...');
  this.started = true;

  var endpoint = url.resolve(addr, '/ping/' + hubiquitus.properties.ID + '/' + name);

  var tick = (function tick() {
    logger.trace('ping [' + endpoint + ']...');
    http.get(endpoint, onRes)
      .on('socket', onSock)
      .on('error', onErr);
    return tick;
  })();

  function onRes(res) {
    logger.trace('ping ack : ' + res.statusCode + ' !');
    setTimeout(tick, 30000);
  }

  function onSock(sock) {
    sock.emit('agentRemove');
  }

  function onErr(err) {
    logger.debug('ping failed', err);
    setTimeout(tick, 30000);
  }
};
