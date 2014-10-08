var hubiquitus = require('hubiquitus-core');
var logger = hubiquitus.logger('hubiquitus:addons:ping');
var _ = require('lodash');
var request = require('request');
var url = require('url');

var failsafe;
try {
  failsafe = require('hubiquitus-failsafe');
} catch (err) {
  logger.debug('Working without failsafe addon');
}

module.exports = function (addr, name) {
  name = name || hubiquitus.properties.container.name;

  if (!_.isString(name)) throw new TypeError('Name must be a string');
  if (!_.isString(addr)) throw new TypeError('Addr must be an http URL');

  logger.info('ping configured with name: ' + name + '; addr: ' + addr);

  if (this.started) return logger.warn('already emitting...');
  this.started = true;

  var endpoint = url.resolve(addr, '/ping/' + hubiquitus.properties.container.id + '/' + name);

  var tick = (function tick() {
    logger.trace('ping [' + endpoint + ']...');
    var payload = {form:{}};
    if (failsafe) payload.form.failsafe = failsafe.stats();

    request.post(endpoint, payload, onRes);
    return tick;
  })();

  function onRes(err, response) {
    if (err) {
      logger.debug('ping failed', err);
    } else {
      logger.trace('ping ack : ' + response.statusCode + ' !');
    }
    setTimeout(tick, 30000);
  }
};
