var Cylon = require('cylon');
var bebop = require('node-bebop');

var drone = bebop.createClient();

var xAxis = 0;
var zAxis = 0;

drone.connect(function() {
 console.log("connect");
 drone.takeOff(function(){
   console.log('took off');
 })

 setTimeout(function() {
   drone.stop();
   setTimeout(function() {
     drone.land();
     setTimeout(function() {
       drone.emergency();
     }, 5000);
   }, 5000);
 }, 20000);
});

Cylon.robot({

 connections: {
   leapmotion: { adaptor: 'leapmotion' }
 },

 devices: {
   leapmotion: { driver: 'leapmotion' }
 },

 work: function(my) {
     my.leapmotion.on('hand', function(hand) {
       palmX =  hand.palmPosition[1];
       palmZ =  hand.palmPosition[2];

       if(palmX > 150) {
         upDown("up");
       } else if(palmX < 50){
         upDown("down");
       } else {
         upDown("hover");
       }

       if(palmZ > 100) {
         frontBack("back");
       } else if(palmZ < 0){
         frontBack("front");
       } else {
         frontBack("hover");
       }


   });
 }
}).start();

function upDown(where) {
 if(xAxis != where) {

   if(where == "up") {
     console.log("x", where);
     drone.up(30);
   } else if(where == "down") {
     console.log("x", where);
     drone.down(30);
   } else {
     console.log("x", where);
     drone.down(0);
   }
 }
 xAxis = where;
}

function frontBack(where) {
 if(zAxis != where) {

   if(where == "front") {
     console.log("z", where);
     drone.forward(30);
   } else if(where == "back") {
     console.log("z", where);
     drone.backward(30);
   } else {
     console.log("z", where);
     drone.stop();
   }
 }
 zAxis = where;
}
