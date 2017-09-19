let EventEmitter = require('events').EventEmitter;
let emitter = new EventEmitter();
let PDefer = require('p-defer');
let readline = require('readline');
let reading = false;
function resetStdin() {
	process.stdin.setRawMode(true);
	process.stdin.resume();
	process.stdin.setEncoding('utf8');
}
if (typeof window !== 'object') {
  resetStdin();
  exports = module.exports = function(question) {
    let deferred = PDefer();
    let rli = readline.createInterface ({
      input: process.stdin,
      output: process.stdout,
    });
    reading = true;
    rli.question(question, function(answer) {
      rli.close();
      reading = false;
      resetStdin();
      deferred.resolve(answer);
    });
    return deferred.promise;
  };
  exports.quitOnSigint = true;
  exports.emitWhileReading = true;
  process.stdin.on('data', function(data) {
    if(data === '\x03' && exports.quitOnSigint) {
      process.stdout.write('\n');
      process.exit();
    }
    if(reading && !exports.emitWhileReading) {
      return;
    }
    data = data.replace('\x7f', '\b');
    emitter.emit('data', data, reading);
  });
  ['on', 'once', 'removeListener'].forEach(function(method) {
    exports[method] = emitter[method].bind(emitter);
  });
}
