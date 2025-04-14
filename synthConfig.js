import updateUrl from "./urlUpdater.js"

export default class SynthConfig
{
    rootNote;
    subdivisions;
    offsets;
    octave;  

    subdivisionDisplays;

    constructor(rootNote,subdivisions,offsets,octave)
    {
        this.rootNote = rootNote;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.octave = octave;
    }

    updateDisplays(octave,subdivisions,offsets,rootNote=220)
    {
        this.rootNote = rootNote;
        this.subdivisions = subdivisions;
        this.offsets = offsets;
        this.octave = octave;
        
        document.getElementById("octaveDisplayText").textContent = this.octave;
        document.getElementById("subdivisionsDisplayText").innerText = this.subdivisions;
        document.getElementById("rootFreq").innerText = this.rootNote;

        updateUrl("octaveDisplayText", this.octave);
        updateUrl("subdivisionsDisplayText", this.subdivisions);

        for (let i = 0; i < 16 ; i++)
          {
            let indexX =  String(i).padStart(2,"0")
            let currentElement = document.getElementById("offset"+indexX);
            currentElement.innerText = this.offsets[i]%subdivisions;
            currentElement.setAttribute("offsetValue",this.offsets[i]);
            updateUrl("offset"+indexX, this.offsets[i]);

            switch(Math.floor(this.offsets[i]/subdivisions))
            {
              case 0:
                currentElement.style.background = "#FFFFFF";
                break;
              case 1:
                currentElement.style.background = "#77FFFF";
                break;
              case 2:
                currentElement.style.background = "#FF77FF";
                break;
              case 3:
                currentElement.style.background = "#FFFF77";
                break;
              case 4:
                currentElement.style.background = "#7777FF";
                break;
              case 5:
                currentElement.style.background = "#FF7777";
                break;
              default:
                currentElement.style.background = "#FFFFFF";
                break;
            }            
          }
    }

    addNoteControl(offsetArray)
    {
        let currentArrayPosition = offsetArray.length;

        let newControlUnit = 
        {
            container:{},
            display:{},
            upArrow:{},
            downArrow:{}
        };

        let newContainer = document.createElement("div");
        newContainer.id = 'offsetsGroup'+String(currentArrayPosition).padStart(2,"0");

        newControlUnit.container = newContainer;


        let newOffsetDisplay = document.createElement("div");
        newOffsetDisplay.style.bottom = String((currentArrayPosition * 37.5) + 5.5)+"px";
        newOffsetDisplay.style.right = String((700+ 37.5))+"px";
    
        newOffsetDisplay.id = "offset"+String(currentArrayPosition).padStart(2,"0");
        newOffsetDisplay.className = "offsets";
        newOffsetDisplay.textContent = this.offsets[currentArrayPosition]%this.subdivisions; 
        newOffsetDisplay.setAttribute("offsetValue",this.offsets[currentArrayPosition]);

        
        switch(Math.floor(this.offsets[currentArrayPosition]/this.subdivisions))
        {
          case 0:
            newOffsetDisplay.style.background = "#FFFFFF";
            break;
          case 1:
            newOffsetDisplay.style.background = "#77FFFF";
            break;
          case 2:
            newOffsetDisplay.style.background = "#FF77FF";
            break;
          case 3:
            newOffsetDisplay.style.background = "#FFFF77";
            break;
          case 4:
            newOffsetDisplay.style.background = "#7777FF";
            break;
          case 5:
            newOffsetDisplay.style.background = "#FF7777";
            break;
          default:
            newOffsetDisplay.style.background = "#FFFFFF";
            break;
        }

        newControlUnit.display = newOffsetDisplay;

        let upTriangle = document.createElement("div");
        upTriangle.style.bottom =  String((currentArrayPosition * 37.5) +15)+"px";
        upTriangle.style.right = String(800-40)+"px";

        upTriangle.id = "upTriange"+String(currentArrayPosition).padStart(2,"0");
        upTriangle.className = "upTriangle";
        upTriangle.style.width = 40+"px";
        upTriangle.style.height = 15+"px";
        upTriangle.style.height = 15+"px";
        upTriangle.addEventListener('mousedown',this.onMouseClickUp, false);

 
        newControlUnit.upArrow = upTriangle;

        let downTriangle = document.createElement("div");
        downTriangle.style.bottom =  String((currentArrayPosition * 37.5) )+"px";
        downTriangle.style.right = String(800-40)+"px";

        downTriangle.id = "donTriange"+String(currentArrayPosition).padStart(2,"0");
        downTriangle.className = "downTriangle";
        downTriangle.style.width = 40+"px";
        downTriangle.style.height = 15+"px";

        downTriangle.addEventListener('mousedown',this.onMouseClickDown, false);

        newControlUnit.downArrow = downTriangle;

        newControlUnit.container.appendChild(newControlUnit.display);
        newControlUnit.container.appendChild(newControlUnit.downArrow);
        newControlUnit.container.appendChild(newControlUnit.upArrow);
        offsetArray.push(newControlUnit);
        document.getElementById("matrix").appendChild(offsetArray[currentArrayPosition].container); 
    }

    onMouseClickUp(event)
    {
        let currentElement  = document.getElementById("offset"+event.target.parentNode.id.slice(-2));

        let newOffsetValue =  Number(currentElement.getAttribute("offsetValue")) + 1;

        let interactedIndex = Number(event.target.parentNode.id.slice(-2));
        let numSubdivisions =  document.getElementById("subdivisionsDisplayText").innerText ;
        currentElement.innerText = newOffsetValue%numSubdivisions;  
        currentElement.setAttribute("offsetValue",newOffsetValue);

        updateUrl("offset"+event.target.parentNode.id.slice(-2) , newOffsetValue);

        switch(Math.floor(newOffsetValue/numSubdivisions))
        {
          case 0:
            currentElement.style.background = "#FFFFFF";
            break;
          case 1:
            currentElement.style.background = "#77FFFF";
            break;
          case 2:
            currentElement.style.background = "#FF77FF";
            break;
          case 3:
            currentElement.style.background = "#FFFF77";
            break;
          case 4:
            currentElement.style.background = "#7777FF";
            break;
          case 5:
            currentElement.style.background = "#FF7777";
            break;
          default:
            currentElement.style.background = "#FFFFFF";
            break;
        }

        const offsetChangeEvent = new CustomEvent("offsetchange", {
            detail: {
              subdivision: newOffsetValue,
              index: interactedIndex
            }
          });
        
        window.dispatchEvent(offsetChangeEvent);
    }

    onMouseClickDown(event)
    {
        let currentElement  = document.getElementById("offset"+event.target.parentNode.id.slice(-2));

        let newOffsetValue =  Number(currentElement.getAttribute("offsetValue")) - 1;

        let interactedIndex = Number(event.target.parentNode.id.slice(-2));
        let numSubdivisions =  document.getElementById("subdivisionsDisplayText").innerText ;
        currentElement.innerText = newOffsetValue%numSubdivisions;  
        currentElement.setAttribute("offsetValue",newOffsetValue);

        switch(Math.floor(newOffsetValue/numSubdivisions))
        {
          case 0:
            currentElement.style.background = "#FFFFFF";
            break;
          case 1:
            currentElement.style.background = "#77FFFF";
            break;
          case 2:
            currentElement.style.background = "#FF77FF";
            break;
          case 3:
            currentElement.style.background = "#FFFF77";
            break;
          case 4:
            currentElement.style.background = "#7777FF";
            break;
          case 5:
            currentElement.style.background = "#FF7777";
            break;
          default:
            currentElement.style.background = "#FFFFFF";
            break;
        }

        const offsetChangeEvent = new CustomEvent("offsetchange", {
            detail: {
              subdivision: newOffsetValue,
              index: interactedIndex
            }
          });
        
        window.dispatchEvent(offsetChangeEvent);
    }

    onOctaveClickUp(event)
    {
        let newOctaveValue =  Number(document.getElementById("octaveDisplayText").innerText)+ 1;

        document.getElementById("octaveDisplayText").innerText =newOctaveValue;
        const octaveChangeEvent = new CustomEvent("octavechange", {
            detail: {
              octave: newOctaveValue
            }
          });
        window.dispatchEvent(octaveChangeEvent);
    }

    onOctaveClickDown(event)
    {
      let newOctaveValue =  Number(document.getElementById("octaveDisplayText").innerText)- 1;
      if(newOctaveValue<1)
      {
          return;
      }

      document.getElementById("octaveDisplayText").innerText =newOctaveValue;
      const octaveChangeEvent = new CustomEvent("octavechange", {
          detail: {
            octave: newOctaveValue
          }
        });
      window.dispatchEvent(octaveChangeEvent);
    }

    onSubdivisonClickDown(event)
    {
      let newSubdivisionValue =  Number(document.getElementById("subdivisionsDisplayText").innerText)- 1;
      if(newSubdivisionValue<1)
      {
          return;
      }

      document.getElementById("subdivisionsDisplayText").innerText =newSubdivisionValue;
      const subdivisionChangeEvent = new CustomEvent("subdivisionchange", {
          detail: {
            subdivision: newSubdivisionValue
          }
        });
      window.dispatchEvent(subdivisionChangeEvent);
    }

    onSubdivisonClickUp(event)
    {
      let newSubdivisionValue =  Number(document.getElementById("subdivisionsDisplayText").innerText)+ 1;

      document.getElementById("subdivisionsDisplayText").innerText =newSubdivisionValue;
      const subdivisionChangeEvent = new CustomEvent("subdivisionchange", {
          detail: {
            subdivision: newSubdivisionValue
          }
        });
      window.dispatchEvent(subdivisionChangeEvent);
    }

    createDisplay(offsetArray,octaveDisplay,subdivisionsDisplay,rootNoteDisplay,offsetControls)
    {
        for (let i = 0; i < 16 ; i++)
        {
            this.addNoteControl(offsetArray,offsetControls);

        }

        let musicSystemInfo;
        musicSystemInfo = document.createElement("div");
        musicSystemInfo.style.bottom = String(410)+"px";
        musicSystemInfo.style.right = String(800-780)+"px";
        musicSystemInfo.style.width = 100+"px";

        musicSystemInfo.id = "musicSystemInfoDisplay";
        musicSystemInfo.className = "subdivisions";
        musicSystemInfo.textContent = "Music System"  ;
        musicSystemInfo.style.fontSize = "90%"
        musicSystemInfo.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(musicSystemInfo);  

        let newOctaveContainer = document.createElement("div");
        newOctaveContainer.id = 'octaveDisplay';

        octaveDisplay = document.createElement("div");
        octaveDisplay.style.bottom = String(365)+"px";
        octaveDisplay.style.right = String(800-730)+"px";

        octaveDisplay.id = "octaveDisplayText";
        octaveDisplay.className = "octave";
        octaveDisplay.textContent = String(this.octave)  ;

        let octaveUpTriangle = document.createElement("div");
        octaveUpTriangle.style.bottom =  String(360)+"px";
        octaveUpTriangle.style.right = String(800-730-40)+"px";

        octaveUpTriangle.id = "octaveUpTriange";
        octaveUpTriangle.className = "upTriangle";
        octaveUpTriangle.style.width = 40+"px";
        octaveUpTriangle.style.height = 15+"px";
        octaveUpTriangle.style.height = 15+"px";
        octaveUpTriangle.addEventListener('mousedown',this.onOctaveClickUp, false);

        let octaveDownTriangle = document.createElement("div");
        octaveDownTriangle.style.bottom =  String((345) )+"px";
        octaveDownTriangle.style.right = String(800-730-40)+"px";

        octaveDownTriangle.id = "octaveDownTriangle";
        octaveDownTriangle.className = "downTriangle";
        octaveDownTriangle.style.width = 40+"px";
        octaveDownTriangle.style.height = 15+"px";

        octaveDownTriangle.addEventListener('mousedown',this.onOctaveClickDown, false);

        newOctaveContainer.appendChild(octaveDisplay);  
        newOctaveContainer.appendChild(octaveUpTriangle);  
        newOctaveContainer.appendChild(octaveDownTriangle);  
        document.getElementById("matrix").appendChild(newOctaveContainer);  

        let newSubdivisionContainer = document.createElement("div");
        newSubdivisionContainer.id = 'subdivisionDisplay';

        subdivisionsDisplay = document.createElement("div");
        subdivisionsDisplay.style.bottom = String(370)+"px";
        subdivisionsDisplay.style.right = String(800-750)+"px";

        subdivisionsDisplay.id = "subdivisionsDisplayText";
        subdivisionsDisplay.className = "subdivisions";
        subdivisionsDisplay.textContent = String(this.subdivisions)  ;

        let subdivisionUpTriangle = document.createElement("div");
        subdivisionUpTriangle.style.bottom =  String(395)+"px";
        subdivisionUpTriangle.style.right = String(800-750-40)+"px";

        subdivisionUpTriangle.id = "subdivisionUpTriange";
        subdivisionUpTriangle.className = "upTriangle";
        subdivisionUpTriangle.style.width = 40+"px";
        subdivisionUpTriangle.style.height = 15+"px";
        subdivisionUpTriangle.style.height = 15+"px";
        subdivisionUpTriangle.addEventListener('mousedown',this.onSubdivisonClickUp, false);

        let subdivisionDownTriangle = document.createElement("div");
        subdivisionDownTriangle.style.bottom =  String((380) )+"px";
        subdivisionDownTriangle.style.right = String(800-750-40)+"px";

        subdivisionDownTriangle.id = "subdivisionDownTriangle";
        subdivisionDownTriangle.className = "downTriangle";
        subdivisionDownTriangle.style.width = 40+"px";
        subdivisionDownTriangle.style.height = 15+"px";

        subdivisionDownTriangle.addEventListener('mousedown',this.onSubdivisonClickDown, false);


        newSubdivisionContainer.appendChild(subdivisionsDisplay);  
        newSubdivisionContainer.appendChild(subdivisionUpTriangle);  
        newSubdivisionContainer.appendChild(subdivisionDownTriangle);  
        document.getElementById("matrix").appendChild(newSubdivisionContainer);  


        document.getElementById("matrix").appendChild(subdivisionsDisplay);  

        let x;
        x = document.createElement("div");
        x.style.bottom = String(387)+"px";
        x.style.right = String(800-755)+"px";

        x.id = "x";
        x.className = "subdivisions";
        x.textContent = "x"  ;
        x.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(x);  
        
        let rootInfo;
        rootInfo = document.createElement("div");
        rootInfo.style.bottom = String(300)+"px";
        rootInfo.style.right = String(800-790)+"px";
        rootInfo.style.width = 120+"px";

        rootInfo.id = "rootInfo";
        rootInfo.className = "subdivisions";
        rootInfo.textContent = "Root Frequency"  ;
        rootInfo.style.textDecoration = "underline";
        rootInfo.style.fontSize = "90%";
        document.getElementById("matrix").appendChild(rootInfo);  

        rootNoteDisplay = document.createElement("div");
        rootNoteDisplay.style.bottom = String(280)+"px";
        rootNoteDisplay.style.right = String(800-790)+"px";
        rootNoteDisplay.style.width = 110+"px";

        rootNoteDisplay.id = "rootFreq";
        rootNoteDisplay.className = "octave";
        rootNoteDisplay.textContent = String(this.rootNote)  ;
 
        document.getElementById("matrix").appendChild(rootNoteDisplay);      
    }
}