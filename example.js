var winston = require('winston');
 
require('./src/app').Zabbix;
 
winston.add(winston.transports.Zabbix, {"host": "127.0.0.1", "level": "debug", key: "test"});

winston.log("error", "Hello", "World");