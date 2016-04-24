var telnet = require('another-telnet-client');
var connection = new telnet();
var gpsCmd = 'head /tmp/gps_nmea_out';
var interval;

var params = {
  host: '192.168.42.1',
  port: 23,
  shellPrompt: '/ # ',
  timeout: 1500
};

function keepAlive(connection)
{
    connection.exec('ls', function (response) {
        keepAlive.response = response;
    });
}

connection.on('ready', function (prompt) {
        console.log('connected.');
        connection.exec(gpsCmd, function (response) {
            console.log(response);
        });
        interval = setInterval(function () { keepAlive(connection); },500);
    });


connection.on('timeout', function() {
    console.log('socket timeout!');
    interval.clearInterval();
    connection.end();
});

connection.on('close', function () {
    interval.clearInterval();
    console.log('connection closed');
});

connection.connect(params);

