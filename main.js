var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var osc = audioCtx.createOscillator();
osc.start();

osc.connect(audioCtx.destination);

