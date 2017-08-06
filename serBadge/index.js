const SerialPort = require('serialport');
const Readline = SerialPort.parsers.Readline;

function SerBadge(prt) {
  const port = new SerialPort(prt, {baudRate: 115200});
  const parser = new Readline();
  let colors = require('colors');

  port.pipe(parser);
  let timer;

  console.log("------------START----------".rainbow);

  parser.on('data', (line) => {

    if( line.indexOf("(RTCWDT_RTC_RESET)") > -1 ) {
      console.log("------------RESET DETECTED--------------------".rainbow);
      timer = setInterval(() => {
        port.write('\x03');
      }, 750);
    }
    if( line.indexOf("MicroPython v") > -1 ) {
      console.log("------------MICRO PYTHON----------------------".rainbow);
      if(timer) clearInterval(timer);
      console.log("hi".data);
      //setInterval(() => {
      //  port.write('help()');
      //}, 750);
    }

    console.log(line.underline.blue);
  });
  port.write('AT\n');
}

// p = new Port('/dev/ttyUSB0');

module.exports = SerBadge;
