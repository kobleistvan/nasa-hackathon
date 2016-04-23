var bebop = require('node-bebop');

var drone = bebop.createClient();
var stdin = process.openStdin();
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

var tookOff = 0;
var interval;
var direction = 'hover';

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

//take off and land after 20 seconds
function timeLimit(drone) {
    drone.takeOff(function () {
        console.log('took off');
        setTimeout(function () {
            drone.land();
            }, 60000);
    });
}

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


