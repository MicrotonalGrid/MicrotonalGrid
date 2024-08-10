/* eslint-disable no-inner-declarations */
import SwitchSynth from "./switchSynth.js"
import Grid from "./grid.js"
import SynthConfig from "./synthConfig.js"

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

  let scrubber = document.createElement("div")   //scrubber setup
  scrubber.style.bottom = 0;
  scrubber.style.right = 65;
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
    mySynth.updateOctave(event.detail.octave);
  }

  function updateSubdivision(event)
  {
    mySynth.updateSubdivision(event.detail.subdivision);
  }

  function unmute(event)
  { 
    mySynth.createOscillators();
    mySynth.startOscillators();
    event.target.className = "playButtoff";
    event.target.textContent = "";
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
    if(parseInt(scrubber.style.right.substring(0,scrubber.style.right.length-2)) < 600)
    {
      currentIteration++;
      updatePreviousIteration();
      incrementBar();
    }
    else
    {
      currentIteration = 0;
      updatePreviousIteration();
      resetBar();
    }
    unmuteSelectedNotes();
  }

  function incrementBar()
  {
    let tem = scrubber.style.right.substring(0,scrubber.style.right.length-2);
      tem = parseInt(tem)+37.5;
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
    scrubber.style.right = '65px';
  }
}