
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
  //let osc = audioCtx.createOscillator();
}

let buttons = new Array;
createGrid(buttons);

buttons[4][5].className = 'matrixButtOn';

function unmute(event)
{
  if(virgin ===true)
  {
    osc.start();
    virgin = false;
  }
  if(this.className == 'matrixButtOff')
  {
    this.className = 'matrixButtOn';
    osc.connect(audioCtx.destination);
    
  }
  else
  {
    this.className = 'matrixButtOff';
    
    osc.disconnect(audioCtx.destination);
  }
}



