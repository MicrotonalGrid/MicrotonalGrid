
let onOff = document.createElement("div");
onOff.style.bottom = 0;
onOff.style.right =0;
onOff.textContent = "PLAY";
onOff.className = "playButton";
onOff.addEventListener('click',unmute, false);
document.getElementById("matrix").appendChild(onOff);   
let previousState = new Array;     
let virgins = new Array;     
let virgin = true;       



let AudioContext = window.AudioContext || window.webkitAudioContext;
let audioCtx = new AudioContext();
let oscArray = new Array;
let numClicked = 0;
let rootNote = 220;
let subdivisions = 12;
let offsets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
let octave = 2;


let scrubber = document.createElement("div")   //scrubber setup
scrubber.style.bottom = 0;
scrubber.style.left = 65;
scrubber.className = 'scrubber';
document.getElementById("matrix").appendChild(scrubber); 

let currentIteration = 0;
let previousIteration = 15; 

setInterval(eachTick, 125);

let buttons = new Array;
createGrid(buttons);

for(var i = 0; i<16 ; i++)
{
  //buttons[i][i].className = 'matrixButtOn';
  let currentOsc = audioCtx.createOscillator();
  currentOsc.frequency.setValueAtTime (Math.pow(octave, (offsets[i]) / subdivisions) * rootNote ,audioCtx.currentTime)   //rootNote*numClicked;
  currentOsc.startedAlready = false;
  oscArray.push(currentOsc);//audioCtx.createOscillator());
  previousState.push(false);
  virgins.push(true);
  //let osc = audioCtx.createOscillator();
}

//buttons[1][15].className = 'matrixButtOn';




function unmute(event)
{
  console.log("in unmute event");
  console.log(event);
  console.log("numClicked : " + numClicked);

  // console.log("freq b4: " + oscArray[numClicked].frequency );
  // oscArray[numClicked].frequency.setValueAtTime ( rootNote*numClicked,audioCtx.currentTime);
  // console.log("freq after: " + oscArray[numClicked].frequency );
 
  if(virgin == true)
  {
    oscArray.forEach(osc => 
    {
      // console.log("index : " + oscArray.indexOf(osc));
      // console.log("osc");
      // console.log(osc);
      osc.start();
      //osc.connect(audioCtx.destination);

      // console.log("osc");
      // console.log(osc);
    });
    virgin = false;
  }
 
  event.target.className = "playButtoff";
  event.target.textContent = "";


}

function unmuteSelectedNotes()
{
  if (virgin == true)
  {
    console.log("forever virgin");
    return;
  }
  buttons[currentIteration].forEach(button => 
  {

    let currentIndex =   buttons[currentIteration].indexOf(button);
    //let previousIndex =  buttons[currentIteration].indexOf(button) == 0 ? 15 : buttons[currentIteration].indexOf(button)-1;

    if(button.className != 'matrixButtOff' && (buttons[previousIteration][currentIndex].className == 'matrixButtOff' || virgins[currentIndex] == true  )){
      console.log("hit turn on");
      oscArray[currentIndex].connect(audioCtx.destination);
    }
    else if (button.className == 'matrixButtOff' && (buttons[previousIteration][currentIndex].className == 'matrixButtOn'  || virgins[currentIndex] == false  ))
    {
      console.log("hit turn off");

      oscArray[currentIndex].disconnect(audioCtx.destination);
    }

  });
}


function eachTick()
{
	if(parseInt(scrubber.style.left.substring(0,scrubber.style.left.length-2)) < 600)
	{
    currentIteration++;
    updatePreviousIteration();
		this.incrementBar();
	}
	else
	{
    currentIteration = 0;
    updatePreviousIteration();
		this.resetBar();
	}
  unmuteSelectedNotes();
}

function incrementBar()
{
	let tem = scrubber.style.left.substring(0,scrubber.style.left.length-2);
		tem = parseInt(tem)+37.9;
		tem += "px";
		//console.log("TEM "  + tem);
		scrubber.style.left = tem;
}

function updatePreviousIteration()
{
  if(currentIteration ==0)
  {
    previousIteration = 15;
  }
  else{
    previousIteration = currentIteration-1;
  }
}

function resetBar()
{
	//test commit
	scrubber.style.left = '65px';
}




