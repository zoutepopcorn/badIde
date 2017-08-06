const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;
let isImport = false;

function SerBadge(prt, cb) {
  const port = new SerialPort(prt, {baudRate: 115200});
  const parser = new Readline();
  let colors = require('colors');
  this.write= (msg) => {
      console.log(` -->> ${msg} `.green);
      port.write(`${msg}\x0D`);
  }
  port.pipe(parser);
  let timer;
  console.log("------------ START ----------".rainbow);
  parser.on('data', (line) => {
    // todo
    if( line.indexOf("(RTCWDT_RTC_RESET)") > -1 ) {
      console.log("------------ RESET DETECTED --------------------".rainbow);
      cb({type: "status", data: "reset"});
    }
    if( line.indexOf("MicroPython v") > -1 ) {
      cb({type: "status", data: "python"});
      console.log("------------MICRO PYTHON----------------------".rainbow);
      if(timer) clearInterval(timer);
      console.log("hi".data);
      if(!isImport) {
        setTimeout(() => {
          port.write("import shell\x0D");
          isImport = true;
        }, 2000);
      }
    }
    if(line.indexOf("E (") < 0)
      cb({type: "data", data: line})
      console.log(line.underline.blue);
  });

}

module.exports = SerBadge;
