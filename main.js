/* eslint-disable no-inner-declarations */
import SwitchSynth from "./switchSynth.js"
import Grid from "./grid.js"

{
  let onOff = document.createElement("div");
  onOff.style.bottom = 0;
  onOff.style.right =0;
  onOff.textContent = "PLAY";
  onOff.className = "playButton";
  onOff.addEventListener('click',unmute, false);
  document.getElementById("matrix").appendChild(onOff);        

  let rootNote = 220;
  let subdivisions = 12;
  let offsets = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
  let octave = 2;

  let mySynth = new SwitchSynth(rootNote,subdivisions,offsets,octave);

  let scrubber = document.createElement("div")   //scrubber setup
  scrubber.style.bottom = 0;
  scrubber.style.left = 65;
  scrubber.className = 'scrubber';
  document.getElementById("matrix").appendChild(scrubber); 

  let currentIteration = 0;
  let previousIteration = 15; 

  setInterval(eachTick, 125);

  let myGrid = new Grid();
  let buttons = [];
  myGrid.createGrid(buttons);

  mySynth.createOscillators();

  function unmute(event)
  { 
    mySynth.startOscillators();
    event.target.className = "playButtoff";
    event.target.textContent = "";
  }

  function unmuteSelectedNotes()
  {
    buttons[currentIteration].forEach(button => 
    {
      let currentIndex =   buttons[currentIteration].indexOf(button);
      if(button.className != 'matrixButtOff' 
        &&(
            buttons[previousIteration][currentIndex].className == 'matrixButtOff' 
            || mySynth.oscillatorState[currentIndex] == false  
          )
        )
      {
        mySynth.connectSpecificOscillator(currentIndex);
      }
      else if (button.className == 'matrixButtOff' 
                && (
                  buttons[previousIteration][currentIndex].className == 'matrixButtOn' 
                  || mySynth.oscillatorState[currentIndex] == true  
                )
              )
      {
        mySynth.disconnectSpecificOscillator(currentIndex);
      }
    });
  }

  function eachTick()
  {
    if(parseInt(scrubber.style.left.substring(0,scrubber.style.left.length-2)) < 600)
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
    let tem = scrubber.style.left.substring(0,scrubber.style.left.length-2);
      tem = parseInt(tem)+37.9;
      tem += "px";
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
    scrubber.style.left = '65px';
  }
}