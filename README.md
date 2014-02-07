# hubiquitus-ping

Hubiquitus ping is a simple module to ping a monitoring server.

```js
var hubiquitus = require('hubiquitus-core');
require('hubiquitus-ping')('container_name', 'http://monitor:port');
```

This gives a name to the container and ping the specified address every 30s.
