/* eslint-disable no-inner-declarations */
import SwitchSynth from "./switchSynth.js"
import Grid from "./grid.js"
import SynthConfig from "./synthConfig.js"
import Life from "./life.js"

{
  document.cookie = "SameSite=none";
  console.log(document.cookie);
  let onOff = document.createElement("div");
  onOff.style.bottom = 0;
  onOff.style.right =0;
  onOff.textContent = "PLAY";
  onOff.className = "playButton";
  onOff.addEventListener('click',unmute, false);
  document.getElementById("matrix").appendChild(onOff); 
  
  let itervalMiliSec = 250;

  let westernSubdivisions = 12;
  let westernOffsets = [0,3,5,7,10,12,12+3,5+12,7+12,10+12,24,24+3,24+5,24+7,24+10,24+12];
  let westernOctave = 2;

  let bohlenSubdivisions = 13;
  let bohlenOffsets = [0,2,3,5,6,8,9,11,12,13,13+2,13+3,13+5,13+6,13+8,13+9];
  let bohlenOctave = 3;

  let arabOctave = 2;
  let arabSubdivisions = 24;
  let arabOffsets = [0,1.5*2,3*2,5*2,6.5*2,8*2,11*2,
                0+24,(1.5*2)+24,(3*2)+24,(5*2)+24,(6.5*2)+24,(8*2)+24,(11*2)+24,48,(1.5*2)+(24*2)];

  let rootNote = 220;
  let subdivisions = westernSubdivisions;
  let offsets = westernOffsets;
  let octave = westernOctave;

  let mySynth = new SwitchSynth(rootNote,subdivisions,offsets,octave,itervalMiliSec);
  let mySynthDisplay = new SynthConfig(rootNote,subdivisions,offsets,octave);

  let offsetDisplays = [];
  let offsetControls = [];
  let octaveDisplay;
  let subdivisionsDisplay;
  let rootNoteDisplay;
  mySynthDisplay.createDisplay(offsetDisplays,octaveDisplay,subdivisionsDisplay,rootNoteDisplay,offsetControls);

  let scrubber = document.createElement("div");
  scrubber.style.bottom = 0;
  scrubber.style.right = 800 - 95 + 'px';
  scrubber.className = 'scrubber';
  document.getElementById("matrix").appendChild(scrubber); 

  let currentIteration = 0;
  let previousIteration = 15; 

  setInterval(eachTick, itervalMiliSec);

  let myGrid = new Grid();
  let buttons = [];
  myGrid.createGrid(buttons);

  window.addEventListener("offsetchange",updateOffsetNote);
  window.addEventListener("octavechange",updateOctave);
  window.addEventListener("subdivisionchange",updateSubdivision);

  let western;
  western = document.createElement("div");
  western.style.bottom = String(568)+"px";
  western.style.right = String(800-780)+"px";
  western.style.width = 100+"px";

  western.id = "western";
  western.className = "offsets";
  western.textContent = "12 tone"  ;
  western.style.textDecoration = "underline";
  western.addEventListener('mousedown',western12Click, false);
  document.getElementById("matrix").appendChild(western);  

  let bohlen;
  bohlen = document.createElement("div");
  bohlen.style.bottom = String(493)+"px";
  bohlen.style.right = String(800-780)+"px";
  bohlen.style.width = 100+"px";

  bohlen.id = "bohlen";
  bohlen.className = "offsets";
  bohlen.textContent = "BP 3^13"  ;
  bohlen.style.textDecoration = "underline";
  bohlen.addEventListener('mousedown',bp13Click, false);
  document.getElementById("matrix").appendChild(bohlen);  

  let arabic;
  arabic = document.createElement("div");
  arabic.style.bottom = String(530)+"px";
  arabic.style.right = String(800-780)+"px";
  arabic.style.width = 100+"px";

  arabic.id = "arabic";
  arabic.className = "offsets";
  arabic.textContent = "Arabic 24"  ;
  arabic.style.textDecoration = "underline";
  arabic.addEventListener('mousedown',arabicClick, false);
  document.getElementById("matrix").appendChild(arabic); 

  let liveStill ;
  liveStill = document.createElement("div");
  liveStill.style.bottom = String(180)+"px";
  liveStill.style.right = String(800-780)+"px";
  liveStill.style.width = 100+"px";
  liveStill.style.height = 50+"px";

  liveStill.textContent = "Conway's Life Mode";
  liveStill.className = "offsets";
  liveStill.id = "toogleConway";

  liveStill.addEventListener('click',liveDie, false);

  document.getElementById("matrix").appendChild(liveStill); 

  let conwayState = false;

  let liveState ;
  liveState = document.createElement("div");
  liveState.style.bottom = String(180-25)+"px";
  liveState.style.right = String(800-780)+"px";
  liveState.style.width = 100+"px";
  liveState.style.filter = "invert(1)";

  liveState.textContent = conwayState;
  liveState.className = "offsets";
  liveState.id = "deadOrAlive";

  document.getElementById("matrix").appendChild(liveState); 
  
  function arabicClick(event)
  {
    subdivisions = arabSubdivisions;
    offsets = arabOffsets;
    octave = arabOctave;
    mySynth.updateAllConfig(octave,subdivisions,offsets);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function bp13Click(event)
  {
    subdivisions = bohlenSubdivisions;
    offsets = bohlenOffsets;
    octave = bohlenOctave;
    mySynth.updateAllConfig(octave,subdivisions, offsets);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function western12Click(event)
  {
    octave = westernOctave;
    subdivisions = westernSubdivisions;
    offsets = westernOffsets;
    mySynth.updateAllConfig(octave,subdivisions, offsets);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function updateOffsetNote(event)
  {
    mySynth.updateSpecificOscillator(event.detail.index ,event.detail.subdivision);
  }

  function updateOctave(event)
  {
    octave = event.detail.octave;
    mySynth.updateOctave(event.detail.octave);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function updateSubdivision(event)
  {
    subdivisions = event.detail.subdivision;

    mySynth.updateSubdivision(event.detail.subdivision);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function unmute(event)
  { 
    mySynth.createOscillators();
    mySynth.startOscillators();
    event.target.className = "playButtoff";
    event.target.textContent = "";
  }

  function liveDie(event)
  {
    conwayState = !conwayState;
    liveState.textContent = conwayState;
  }

  function unmuteSelectedNotes()
  {
    buttons[currentIteration].forEach(button => 
    {
      let currentIndex =   buttons[currentIteration].indexOf(button);
      if(button.className != 'matrixButtOff')
      {
        mySynth.connectSpecificOscillator(currentIndex);
      }
    });
  }

  function eachTick()
  {
    if(parseInt(scrubber.style.right.substring(0,scrubber.style.right.length-2)) > 145)
    {
      currentIteration++;
      updatePreviousIteration();
      incrementBar(currentIteration);
    }
    else
    {
      currentIteration = 0;
      if (conwayState == true)
      {
        Life(buttons);
      }
      updatePreviousIteration();
      resetBar();
    }
    unmuteSelectedNotes(currentIteration);
  }

  function incrementBar(positionNumber)
  {
    let referenceButton = buttons[positionNumber][0];
    let tem = referenceButton.style.right.substring(0,referenceButton.style.right.length-2);
    tem = parseInt(tem)-2.5;
    tem += "px";


    scrubber.style.right = tem;
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
    scrubber.style.right = 800-95 + 'px';
  }
}