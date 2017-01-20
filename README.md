# winston-zabbix

[Zabbix][1] transport for [winston][0].

## Installation

``` sh
$ npm install winston
$ npm install winston-zabbix
```

## Usage
``` js
var winston = require('winston');

/*
 * Requiring `winston-zabbix` will expose
 * `winston.transports.Zabbix`
 */ 
require('./src/app').Zabbix;
 
winston.add(winston.transports.Zabbix, {"host": "127.0.0.1", "level": "debug", key: "test"});

winston.log("error", "Hello", "World");
```

The Zabbix transport uses [node-zabbix-sender](https://github.com/shamil/node-zabbix-sender) behind the scenes.  Options are the following:

* __host:__ Zabbix server hostname. *[required]*
* __port:__ Zabbix trapper port (default: 10051)
* __timeout:__ is a socket timeout in milliseconds, when connecting to the zabbix server
* __with_timestamps:__ when you log, timestamp will be added as well
* __items_host:__ a target monitored host in zabbix. used when you don't specify the host when you log
* __key:__ key name for trapper item. You have to configure this in Zabbix. *[required]*
* __level:__ Level of messages that this transport should log.
* __silent:__ Boolean flag indicating whether to suppress output.
* __tags:__ You can defined tags for your Zabbix alert message.

## License
MIT License

Copyright (c) 2017 Akashdeep Singh

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[0]: https://github.com/flatiron/winston
[1]: http://www.zabbix.com/