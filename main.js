var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var osc = audioCtx.createOscillator();
osc.start();

osc.connect(audioCtx.destination);


let square1 = document.createElement("div");

square1.id = "lol'";
square1.className = "button2";
square1.style.cssText="transform:translate(10px, 10px)";

 document.getElementById("matrix").appendChild(square1);

// var Somethign = "<span class=\"button2\"></span>";
//		document.getElementById("matrix").innerHTML += Somethign;

// var Somethign = "<span class=\"greenSquare\"></span>";
//		document.getElementById("caissa").innerHTML += Somethign;


