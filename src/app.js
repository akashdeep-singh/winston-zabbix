//Dependencies
var util = require('util');
var winston = require('winston');
var ZabbixSender = require('node-zabbix-sender');

/**
 * Constructor for instantiating Zabbix transport
 * 
 * @param {object} options
 */
function Zabbix(options) {
  winston.Transport.apply(this, arguments);

  if (!options) {
    options = {};
  }

  this.host = options.host;

  // Host must be explicitly defined
  if (!(this.host)) {
    throw new Error("Winston-zabbix requires host");
  }


  this.key = options.key;

  // Key for Trapper item must be explicitly defined
  if (!(this.key)) {
    throw new Error("Winston-zabbix requires key for trapper item.");
  }

  if (options.tags) {
    this.tags = options.tags.map(function (tag) {
      return "[" + tag + "] ";
    }).join('');
  }

  this.zabbixSender = new ZabbixSender(options);
  this.name = 'zabbix';
}


//Inheriting the winston transport class to be able to override the log method
util.inherits(Zabbix, winston.Transport);


/**
 * Definition for the log method
 * This will send a message to the zabbix trapper
 *
 * @param {string} level
 * @param {string} msg
 * @param {object} meta
 * @param {function} done
 *
 * @api public
 */
Zabbix.prototype.log = function (level, msg, meta, done) {
  if (this.silent) {
    return done(null, true);
  }

  if (!msg) {
    msg = '';
  }

  var message = "" + (this.tags || '') + "[" + level + "] " + "\n\n" + msg.toString();

  if (meta) {
    message += "\n---\n" + util.inspect(meta);
  }

  this.zabbixSender.addItem(this.key, message);
  this.zabbixSender.send(done);
};

//Attaching Zabbix to winston transports
winston.transports.Zabbix = Zabbix;

//Exporting for third-party use
module.exports = winston.transports.Zabbix;