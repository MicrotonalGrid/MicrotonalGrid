
let onOff = document.createElement("div");
onOff.style.bottom = 0;
onOff.style.right =0;
onOff.className = "matrixButtOff";
onOff.addEventListener('click',unmute, false);
document.getElementById("matrix").appendChild(onOff);   
let initialised = true;       


let playChord = document.createElement("div");
playChord.style.bottom = 400;
playChord.style.right =0;
playChord.className = "matrixButtOff";
playChord.addEventListener('click',chord, false);
document.getElementById("matrix").appendChild(playChord);   


let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let oscArray = new Array;

for(var i = 0; i<16 ; i++)
{
  oscArray.push(audioCtx.createOscillator());
  let freq = 440 * Math.pow( 2 , (i/12)); //replace 2 and 12 with subdivs and octave size in the future
  oscArray[i].frequency.setValueAtTime(freq, audioCtx.currentTime);
  console.log(oscArray.length);
  //let osc = audioCtx.createOscillator();
}
console.log(oscArray.length);

let buttons = new Array;
createGrid(buttons);

function unmute(event)
{
  if(initialised ===true)
  {
	  for(var i = 0; i<oscArray.length ; i++)
	  {
		  oscArray[i].start();
		  initialised = false;
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



function chord(event)
{
  if(initialised ===true)
  {
	  for(var i = 0; i<oscArray.length ; i++)
	  {
		  oscArray[i].start();
		  initialised = false;
	  }
  }
  if(this.className == 'matrixButtOff')
  {
	  this.className = 'matrixButtOn';
	  for(var i = 0; i<oscArray.length ; i++)
	  {
      if(buttons[0][i].className == 'matrixButtOn')
		  {oscArray[i].connect(audioCtx.destination);}
	  }    
  }
  else
  {
    this.className = 'matrixButtOff';
	  for(var i = 0; i<oscArray.length ; i++)
	  {
      if(buttons[0][i].className == 'matrixButtOn')
		  {oscArray[i].disconnect(audioCtx.destination);}
	  }
  }
}