/* eslint-disable no-inner-declarations */
import SwitchSynth from "./switchSynth.js"
import Grid from "./grid.js"
import SynthConfig from "./synthConfig.js"
import Life from "./life.js"
import updateUrl from "./urlUpdater.js"

{
  document.cookie = "SameSite=none";
  console.log(document.cookie);
  let onOff = document.createElement("div");
  onOff.style.bottom = 0;
  onOff.style.right =0;
  onOff.textContent = "PLAY";
  onOff.className = "playButton";
  onOff.addEventListener('click',unmute, true);
  document.getElementById("matrix").appendChild(onOff); 
  let playing = false;
  
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
  scrubber.style.right = 142.5 + 'px';
  //scrubber.style.right = 800 - 95 + 'px';
  scrubber.className = 'scrubber';
  document.getElementById("matrix").appendChild(scrubber); 

  let currentIteration = 15;

  let myGrid = new Grid();
  let buttons = [];
  myGrid.createGrid(buttons);

  window.addEventListener("statechange",updateGridStateInUrl);
  window.addEventListener("offsetchange",updateOffsetNote);
  window.addEventListener("octavechange",updateOctave);
  window.addEventListener("subdivisionchange",updateSubdivision);
  window.addEventListener("copy", copyPressed);
  window.addEventListener("paste", pastePressed);

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

  let loadState ;
  loadState = document.createElement("div");
  loadState.style.bottom = String(100)+"px";
  loadState.style.right = String(800-780)+"px";
  loadState.style.width = 100+"px";
  loadState.style.height = 50+"px";

  loadState.textContent = "Load State";
  loadState.className = "offsets";
  loadState.id = "loadState";

  loadState.addEventListener('click',loadStateEvent, true);

  //document.getElementById("matrix").appendChild(loadState); 
 
  let saveState ;
  saveState = document.createElement("div");
  saveState.style.bottom = String(50)+"px";
  saveState.style.right = String(800-780)+"px";
  saveState.style.width = 100+"px";
  saveState.style.height = 50+"px";
  saveState.style.filter= "invert(1)";
  saveState.textContent = "Share Dialog";
  saveState.className = "offsets";
  saveState.id = "saveState";

  saveState.addEventListener('click',saveStateFunc, true);

  document.getElementById("matrix").appendChild(saveState); 


  // showShareBox here

  let shareBox ;
  shareBox = document.createElement("div");
  shareBox.style.bottom = String(200)+"px";
  shareBox.style.right = String(200)+"px";
  shareBox.style.width = 400+"px";
  shareBox.style.height = 200+"px";
  shareBox.style.visibility = "hidden"; //can also be made visible/hidden
  shareBox.style.background = "#9f5bda";
  //shareBox.textContent = "Save State Using Clipboard";
  shareBox.className = "offsets";
  shareBox.id = "shareBox";

  //shareBox.addEventListener('click',showShareBox, true);

  let shareBoxTitle;
  shareBoxTitle = document.createElement("label");
  //shareBoxTitle.style.bottom = String(0)+"px";
  //shareBoxTitle.style.right = String(0)+"px";
  //shareBox.style.width = 400+"px";
  //shareBox.style.height = 300+"px";
  //shareBox.style.visibility = "hidden"; //can also be made visible
  //shareBox.style.background = "#9f5bda";
  shareBoxTitle.textContent = "Copy to Share/Paste new state & load";
  //shareBoxTitle.className = "offsets";
  //shareBox.id = "shareBoxTitle";
  shareBoxTitle.style.position = "relative";


  let shareBoxText;  

  shareBoxText = document.createElement("textarea");
  shareBoxText.style.bottom = String(0)+"px";
  shareBoxText.style.right = String(0)+"px";
  shareBoxText.style.width = 300+"px";
  shareBoxText.style.height = 100+"px";
  shareBoxText.style.border = "solid" + "2px " + "black" ;
  shareBoxText.style.background = "#b491d2";
  shareBoxText.style.position = "relative";
  shareBoxText.style.textWrap = "balance";
  shareBoxText.id = "shareBoxInput";



  
  let shareBoxLoad;
  shareBoxLoad = document.createElement("div");
  shareBoxLoad.style.bottom = String(-10)+"px";
  shareBoxLoad.style.right = String(-250)+"px";
  shareBoxLoad.style.width = 100+"px";
  shareBoxLoad.style.height = 50+"px";
  //shareBox.style.visibility = "hidden"; //can also be made visible
  shareBoxLoad.style.background = "#66269e";
  shareBoxLoad.style.color = "#ffffff"
  shareBoxLoad.textContent = "Load";
  //shareBoxTitle.className = "offsets";
  //shareBox.id = "shareBox";
  shareBoxLoad.addEventListener('click',loadFromSaveBox, true);
  shareBoxLoad.style.position = "relative";
  shareBoxLoad.style.justifyContent = "center";
  shareBoxLoad.style.display = "flex";
  shareBoxLoad.style.alignItems = "center";

  let shareBoxSave;
  shareBoxSave = document.createElement("div");
  shareBoxSave.style.bottom = String(40)+"px";
  shareBoxSave.style.right = String(-50)+"px";
  shareBoxSave.style.width = 100+"px";
  shareBoxSave.style.height = 50+"px";
  //shareBox.style.visibility = "hidden"; //can also be made visible
  shareBoxSave.style.background = "#66269e";
  shareBoxSave.style.color = "#ffffff"
  shareBoxSave.textContent = "Close";
  //shareBoxTitle.className = "offsets";
  //shareBox.id = "shareBox";
  shareBoxSave.addEventListener('click',closeSavebox, true);
  shareBoxSave.style.position = "relative";
  shareBoxSave.style.justifyContent = "center";
  shareBoxSave.style.display = "flex";
  shareBoxSave.style.alignItems = "center";



  document.getElementById("matrix").appendChild(shareBox); 
  document.getElementById("shareBox").appendChild(shareBoxTitle);
  document.getElementById("shareBox").appendChild(shareBoxText);
  document.getElementById("shareBox").appendChild(shareBoxLoad);
  document.getElementById("shareBox").appendChild(shareBoxSave);



  let hasUrlAccess = false;

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
    event.stopPropagation();
    mySynth.createOscillators();
    mySynth.startOscillators();
    loadStateFunc();
    event.target.className = "playButtoff";
    event.target.textContent = "";
    playing = true;
    setInterval(eachTick, itervalMiliSec);
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
      //updatePreviousIteration();
      incrementBar(currentIteration);
    }
    else
    {
      currentIteration = 0;
      if (conwayState == true)
      {
        Life(buttons);
      }
      //updatePreviousIteration();
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

  function resetBar()
  {
    scrubber.style.right = 800-95 + 'px';
  }

  function updateGridStateInUrl(event) 
  {
    if(playing == true)
    {
      //console.log("inside if");
      let myElement = document.getElementById(event.detail.idOfButtonPressed);
      console.log("element id : " + myElement.id);
      if(myElement.className == 'matrixButtOff')
      {
        myElement.className  = 'matrixButtOn';
      }
      else
      {
        myElement.className  = 'matrixButtOff';
      }

      let gridState = saveGridToUrl();
      updateUrl("gridState", gridState);
    }
  }

  function loadStateEvent(event)
  {
    event.stopPropagation();
    loadStateFunc();
    //let text;
    //navigator.clipboard.readText().then((clipText) => (text = clipText));
    //console.log(text);
  }



  function loadStateFunc()
  {
    const url = new URL(location);
    url.searchParams.forEach(processUrlParam);
    mySynth.updateAllConfig(octave,subdivisions,offsets);
    mySynthDisplay.updateDisplays(octave,subdivisions,offsets);
  }

  function loadFromSaveBox()
  {
    returnObjectFromTextBox(document.getElementById("shareBoxInput").value);
    console.log("Load from save box complete");
  }


  function returnObjectFromTextBox(textInBox) //todo, related to above.
  {
    console.log("etneringthing");

    let arrayX= textInBox.split("X"); // split input box code into array. 

    console.log("arrayX");
    console.log(arrayX);

    updateUrl("octaveDisplayText", arrayX[0]);
    updateUrl("subdivisionsDisplayText",  arrayX[1]);
    
    for (let index = 2; index < 18; index++) 
    {
      let indexX = (index-2).toString().padStart(2,"0");
      updateUrl("offset"+indexX, arrayX[index]); // loop through offsets
    }

    let gridState =  "";
    for (let index = 18; index < 18+16; index++) 
    {
      gridState+= arrayX[index] ;
      gridState+=  index < 18+16 ? "X" : ""; 
    }

    updateUrl("gridState", gridState);
    loadStateFunc();
  }


  function closeSavebox()
  {
    document.getElementById("shareBox").style.visibility = "hidden"; // XXXX
  }

  function generateSharecode()
  {
    let  shareCodeUpdated = '';
    
    shareCodeUpdated += octave.toString();
    shareCodeUpdated += 'X';
    shareCodeUpdated += subdivisions.toString();
    shareCodeUpdated += 'X';

    for(let i = 0; i<16 ; i++)  
    {
      shareCodeUpdated += offsets[i];
      shareCodeUpdated += 'X';
    }    
    shareCodeUpdated +=saveGridToUrl();
    return shareCodeUpdated;
  }

  function processUrlParam(value , key)
  {
    console.log("key : " + key);
    console.log("value : " + value);

    switch(key)
    {
   
      case"gridState":
      {
        loadStateFromUrl(value);
        break;
      }
      case "offset00":
      case "offset01":
      case "offset02":
      case "offset03":
      case "offset04":
      case "offset05":
      case "offset06":
      case "offset07":
      case "offset08":
      case "offset09":
      case "offset10":
      case "offset11":
      case "offset12":
      case "offset13":
      case "offset14":
      case "offset15": 
      {
        let offsetIndex = Number(key.substring(6));
        offsets[offsetIndex] = value;
        break;
      }
      case "octaveDisplayText": 
      {
        octave = value;
        break;
      }
      case "subdivisionsDisplayText": {
        subdivisions = value;
        break;
      }
    }
  }

  //   function showShareBox(event)
  // { 

  // }

  function copyPressed(event)
  {/*
    if(hasUrlAccess == true)
    {
      navigator.clipboard.writeText(saveGridToUrl()); // copy states from url only
  
    }*/
  }
  function pastePressed(event)
  {
/*
    if(hasUrlAccess == true)
    {
    console.log(event.clipboardData.getData("text")); 
    }*/
  }

  function saveStateFunc(event)
  {
    event.stopPropagation();
    let gridState = saveGridToUrl();
    updateUrl("gridState", gridState);
    navigator.clipboard.writeText(window.location.href); // put something here to check frames
    document.getElementById("shareBoxInput").value = generateSharecode(); // gridState;
    document.getElementById("shareBox").style.visibility = "visible"; // XXXX
  }

  function loadStateFromUrl(text)
  {
    let arrayX= text.split("X");
    let stateInBinary = "";

    for(let myString of arrayX)
    {
      let interm = parseInt(myString,36).toString(2).padStart(16,"0");
      stateInBinary += parseInt(myString,36).toString(2).padStart(16,"0");
    }
    
    for (let i  = 0; i  < 16; i ++) 
    {
        for (let j = 0; j < 16; j++) 
        {
          if(stateInBinary[ ( i*16  )+j ] == "1")
          {
            buttons[i][j].className = "matrixButtOn";
          }
          else
          {
            buttons[i][j].className = "matrixButtOff";
          }   
        }                
    }
  }


  function saveGridToUrl()
  {
    let gridData = "";
    let returnText = "";
    for (let i  = 0; i  < 16; i ++) 
    {
      for (let j = 0; j < 16; j++) 
      {
        if(buttons[i][j].className == "matrixButtOn")
        {
          gridData+="1";
        }
        else
        {
          gridData+="0";
        }   
      } 
      returnText +=parseInt(gridData , 2).toString(36) ;

      if(i != 15 ) 
        {
          returnText +=    "X" ; 
          
          gridData = "";
        }     
    }

    let toReturn  = returnText;

    return toReturn;
  }

}