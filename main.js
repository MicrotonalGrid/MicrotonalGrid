
let onOff = document.createElement("div");
onOff.style.bottom = 0;
onOff.style.right =0;
onOff.className = "matrixButtOff";
onOff.addEventListener('click',unmute, false);
document.getElementById("matrix").appendChild(onOff);   
let virgin = true;       


let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let oscArray = new Array;

for(var i = 0; i<16 ; i++)
{
  oscArray.push(audioCtx.createOscillator());
  let freq = 220 * Math.pow( 2 , (i/12)); //replace 2 and 12 with subdivs and octave size in the future
  oscArray[i].frequency.setValueAtTime(freq, audioCtx.currentTime);
  console.log(oscArray.length);
  //let osc = audioCtx.createOscillator();
}
console.log(oscArray.length);

let buttons = new Array;
createGrid(buttons);

buttons[4][5].className = 'matrixButtOn';

function unmute(event)
{
  if(virgin ===true)
  {
	for(var i = 0; i<oscArray.length ; i++)
	{
		oscArray[i].start();
		virgin = false;
	}
  }
  if(this.className == 'matrixButtOff')
  {
	this.className = 'matrixButtOn';
	for(var i = 0; i<oscArray.length ; i++)
	{
		oscArray[i].connect(audioCtx.destination);
	}    
  }
  else
  {
    this.className = 'matrixButtOff';
	for(var i = 0; i<oscArray.length ; i++)
	{
		oscArray[i].disconnect(audioCtx.destination);
	}
  }
}



