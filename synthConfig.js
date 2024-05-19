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
        newOffsetDisplay.className = "offsets";//textContent
        newOffsetDisplay.textContent = this.offsets[currentArrayPosition];//textContent

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
        // downTriangle.addEventListener("augmentOffset",this.timmy,false);

        newControlUnit.downArrow = downTriangle;

        newControlUnit.container.appendChild(newControlUnit.display);
        newControlUnit.container.appendChild(newControlUnit.downArrow);
        newControlUnit.container.appendChild(newControlUnit.upArrow);
        offsetArray.push(newControlUnit);
        document.getElementById("matrix").appendChild(offsetArray[currentArrayPosition].container); 
    }

    onMouseClickUp(event)
    {
        let newOffsetValue =  Number(document.getElementById("offset"+event.target.parentNode.id.slice(-2)).innerText)+ 1;
        let interactedIndex = Number(event.target.parentNode.id.slice(-2));
        document.getElementById("offset"+event.target.parentNode.id.slice(-2)).innerText = newOffsetValue;    
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
        let newOffsetValue =  Number(document.getElementById("offset"+event.target.parentNode.id.slice(-2)).innerText)- 1;
        let interactedIndex = Number(event.target.parentNode.id.slice(-2));
        document.getElementById("offset"+event.target.parentNode.id.slice(-2)).innerText = Number(document.getElementById("offset"+event.target.parentNode.id.slice(-2)).innerText)- 1;
        const offsetChangeEvent = new CustomEvent("offsetchange", {
            detail: {
              subdivision: newOffsetValue,
              index: interactedIndex
            }
          });
        window.dispatchEvent(offsetChangeEvent);
    }
  

    createDisplay(offsetArray,octaveDisplay,subdivisionsDisplay,rootNoteDisplay,offsetControls)
    {
        for (var i = 0; i < 16 ; i++)
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
        musicSystemInfo.textContent = "Music System"  ;//textContent
        musicSystemInfo.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(musicSystemInfo);  


        octaveDisplay = document.createElement("div");
        octaveDisplay.style.bottom = String(365)+"px";
        octaveDisplay.style.right = String(800-730)+"px";

        octaveDisplay.id = "octaveDisplay";
        octaveDisplay.className = "octave";
        octaveDisplay.textContent = String(this.octave)  ;//textContent

        document.getElementById("matrix").appendChild(octaveDisplay);  

        subdivisionsDisplay = document.createElement("div");
        subdivisionsDisplay.style.bottom = String(370)+"px";
        subdivisionsDisplay.style.right = String(800-750)+"px";

        subdivisionsDisplay.id = "subdivisionsDisplay";
        subdivisionsDisplay.className = "subdivisions";
        subdivisionsDisplay.textContent = String(this.subdivisions)  ;//textContent
        document.getElementById("matrix").appendChild(subdivisionsDisplay);  


        let x;
        x = document.createElement("div");
        x.style.bottom = String(387)+"px";
        x.style.right = String(800-755)+"px";

        x.id = "x";
        x.className = "subdivisions";
        x.textContent = "x"  ;//textContent
        x.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(x);  

        
        let rootInfo;
        rootInfo = document.createElement("div");
        rootInfo.style.bottom = String(300)+"px";
        rootInfo.style.right = String(800-790)+"px";
        rootInfo.style.width = 120+"px";

        rootInfo.id = "rootInfo";
        rootInfo.className = "subdivisions";
        rootInfo.textContent = "Root Frequency"  ;//textContent
        rootInfo.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(rootInfo);  

        rootNoteDisplay = document.createElement("div");
        rootNoteDisplay.style.bottom = String(280)+"px";
        rootNoteDisplay.style.right = String(800-790)+"px";
        rootNoteDisplay.style.width = 110+"px";

        rootNoteDisplay.id = "rootFreq";
        rootNoteDisplay.className = "octave";
        rootNoteDisplay.textContent = String(this.rootNote)  ;//textContent
 
        document.getElementById("matrix").appendChild(rootNoteDisplay);      
        

    }
}