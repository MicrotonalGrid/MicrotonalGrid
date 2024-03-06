
let onOff = document.createElement("div");
onOff.style.bottom = 0;
onOff.style.right =0;
onOff.className = "matrixButtOff";
onOff.addEventListener('click',unmute, false);
document.getElementById("matrix").appendChild(onOff);   
let virgins = new Array;       


let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let oscArray = new Array;
let numClicked = 0;
let rootNote = 220;
let subdivisions = 12;
let offsets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let octave = 2;

for(var i = 0; i<16 ; i++)
{
  let currentOsc = audioCtx.createOscillator();
  currentOsc.frequency.setValueAtTime (Math.pow(octave, (offsets[i]) / subdivisions) * rootNote ,audioCtx.currentTime)   //rootNote*numClicked;
  currentOsc.startedAlready = false;
  oscArray.push(currentOsc);//audioCtx.createOscillator());
  virgins.push(true);
  //let osc = audioCtx.createOscillator();
}

let buttons = new Array;
createGrid(buttons);

buttons[4][5].className = 'matrixButtOn';

function unmute(event)
{
  console.log("in unmute event");
  console.log(event);
  console.log("numClicked : " + numClicked);

  // console.log("freq b4: " + oscArray[numClicked].frequency );
  // oscArray[numClicked].frequency.setValueAtTime ( rootNote*numClicked,audioCtx.currentTime);
  // console.log("freq after: " + oscArray[numClicked].frequency );
 
  if(virgins[numClicked] ===true)
  {

    oscArray[numClicked].start();
    virgins[numClicked] = false;
  }
  if(this.className == 'matrixButtOff')
  {
    this.className = 'matrixButtOn';
    oscArray[numClicked].connect(audioCtx.destination);
    
  }
  else
  {
    this.className = 'matrixButtOff';
    
    oscArray[numClicked].disconnect(audioCtx.destination);
    numClicked = numClicked <15 ? numClicked +1 : 0;

  }


}



