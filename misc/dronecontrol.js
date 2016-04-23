//drone 
var bebop = require('node-bebop');
var drone = bebop.createClient();
var tookOff = 0;
var interval;
var direction = 'hover';

//console input
var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

//gps 
var telnet = require('another-telnet-client');
var connection = new telnet();
var gpsCmd = 'head /tmp/gps_nmea_out'; //get gps buffer
var interval;
var params = {
    host: '192.168.42.1',
    port: 23,
    shellPrompt: '/ # ',
    timeout: 1500
};
var gpsBuffer, parsedGps;

function keepAlive(connection) {
    connection.exec('ls', function (response) {
        keepAlive.response = response;
    });
}

connection.on('ready', function (prompt) {
    console.log('connected.');
    for (i = 0; i < 100; i++) {
        connection.exec(gpsCmd, function (response) {
            console.log('' + getCoordinates(connection));
        });
    }
    interval = setInterval(function () { keepAlive(connection); }, 500);
});


connection.on('timeout', function () {
    console.log('socket timeout!');
    interval.clearInterval();
    connection.end();
});

connection.on('close', function () {
    interval.clearInterval();
    console.log('connection closed');
});

connection.connect(params);

function getCoordinates(connection)
{
    var splitResp,buffer;
    connection.exec(gpsCmd, function (response) {
        if (response !== undefined) {
            splitResp = response.split('\n');
            splitResp.forEach(function (element) {
                if (element.includes('$GNRMC')) {
                    buffer = element.split(',');
                }
            });
        }
    });
    if (buffer !== undefined)
        return buffer[3] + ' ' + buffer[4] + ' ' + buffer[5] + ' ' + buffer[6];
    else
        return '';
}

/*
function keyDirection(key) {
    if (key == '\u001B\u005B\u0041') {
        return 'up';
    }
    if (key == '\u001B\u005B\u0043') {
        return 'right';
    }
    if (key == '\u001B\u005B\u0042') {
        return 'down';
    }
    if (key == '\u001B\u005B\u0044') {
        return 'left';
    }
    if (key == ' ') {
        return 'hover';
    }
    if (key == '/') {
        return 'clockwise';
    }
    if (key == '.') {
        return 'counterclockwise';
    }
    if (key == ',') {
        return 'land';
    }
        if (key == '\u0003') { process.exit(); }    // ctrl-c
}
*/

function keyDirection(key)
{
    switch(key)
    {
        case '\u001B\u005B\u0041':
            {
                return 'up';
                break;
            }
        case '\u001B\u005B\u0043':
            {
                return 'right';
                break;
            }
        case '\u001B\u005B\u0042':
            {
                return 'down';
                break;
            }
        case '\u001B\u005B\u0044':
            {
                return 'left';
                break;
            }
        case ' ':
            {
                return 'hover';
                break;
            }
        case '/':
            {
                return 'clockwise';
                break;
            }
        case '.':
            {
                return 'counterclockwise';
                break;
            }
        case ',':
            {
                return 'land';
                break;
            }
        case  '\u0003':
            {
                process.exit();
                break;
            }
    }
}

//take off and land after 60 seconds
function timeLimit(drone) {
    drone.takeOff(function () {
        console.log('took off');
        setTimeout(function () {
            drone.land();
            }, 60000);
    });
}

//set the direction and speed of the drone
function droneController(direction,value)
{
    if (direction != droneController.prevDirection) {
        console.log(direction);
        switch (direction) {
            case 'up'   :            { drone.up(value);               break; }
            case 'down' :            { drone.down(value);             break; }
            case 'left' :            { drone.left(value);             break; }
            case 'right':            { drone.right(value);            break; }
            case 'hover':            { drone.stop();                  break; }
            case 'clockwise':        { drone.clockwise(value);        break; }
            case 'counterclockwise': { drone.counterClockwise(value); break; }
            case 'backward':         { drone.backward(value);         break; }
            case 'forward':          { drone.forward(value);          break; }
            case 'land': {
                drone.land(function () {
                    console.log("landing");
                }); break;
            }
        }
    }
    droneController.prevDirection = direction;
}

drone.connect(function () {
    console.log("Press any key to take off.");
    onPress = stdin.on('data', function (key) {
        if (tookOff == 0)
        {
            timeLimit(drone);
            interval = setInterval(function () { droneController(direction, 30); },50);
            tookOff = 1;
        }
        direction = keyDirection(key);
    });
});


