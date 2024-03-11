// import SwitchSynth  from "./switchSynth.js"
//import {testFunction as testFunction}  from './test.js'
 
//import test from "./test.js"
import SwitchSynth from "./switchSynth.js"
{
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

  //let mySynth = SwitchSynth;
  //let testFuck = new test;


  let AudioContext = window.AudioContext || window.webkitAudioContext;
  let audioCtx = new AudioContext();
  let oscArray = new Array;
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
    let currentOsc = audioCtx.createOscillator();
    currentOsc.frequency.setValueAtTime (Math.pow(octave, (offsets[i]) / subdivisions) * rootNote ,audioCtx.currentTime);
    currentOsc.startedAlready = false;
    oscArray.push(currentOsc);
    previousState.push(false);
    virgins.push(true);

  }

  function unmute(event)
  { 
    if(virgin == true)
    {
      oscArray.forEach(osc => 
      {
        osc.start();
      });
      virgin = false;
    } 
    //testFuck.testX();
    // console.log(testFuck);
    // console.log(testFuck.testLog());
    // console.log(testFuck.testLog);
    // console.log(testFuck.testLog.test());
    // console.log(testFuck.testLog.test);
    
    //testFuck.testLog.test();
    event.target.className = "playButtoff";
    event.target.textContent = "";
  }

  function unmuteSelectedNotes()
  {
    if (virgin == true)
    {
      //console.log("forever virgin");
      return;
    }
    buttons[currentIteration].forEach(button => 
    {
      let currentIndex =   buttons[currentIteration].indexOf(button);

      if(button.className != 'matrixButtOff' && (buttons[previousIteration][currentIndex].className == 'matrixButtOff' || virgins[currentIndex] == true  )){
        oscArray[currentIndex].connect(audioCtx.destination);
      }
      else if (button.className == 'matrixButtOff' && (buttons[previousIteration][currentIndex].className == 'matrixButtOn'  || virgins[currentIndex] == false  ))
      {
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