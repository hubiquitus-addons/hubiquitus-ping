# Hubiquitus-ping

**Hubiquitus-ping** is a simple module to ping a monitoring server, designed to used along with [**hubiquitus-ping-monitor**](https://github.com/hubiquitus-addons/hubiquitus-ping-monitor), a complementary module that can handle pings from multiple containers and process them.

Install the module with :

    $ npm install hubiquitus-ping

To use it :

```js
var hubiquitus = require('hubiquitus-core');
hubiquitus.set('name', 'sample');
require('hubiquitus-ping')('http://monitor:port');
```

This gives a name to the container and pings the specified address every 30 seconds.
See the hubiquitus-ping-monitor documentation [here](https://github.com/hubiquitus-addons/hubiquitus-ping-monitor).
