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
        newContainer.id = 'offsetsGroup'+currentArrayPosition;

        newControlUnit.container = newContainer;


        let newOffsetDisplay = document.createElement("div"); //todo : fix constructor to use document.createElement and keep track of this stuff. 
        newOffsetDisplay.style.bottom = String((currentArrayPosition * 37.5) + 5.5)+"px";
        //let currentArrayPosition = offsetArray.push(document.createElement("div"));
        //currentArrayPosition--;
        newOffsetDisplay.style.bottom = String((currentArrayPosition * 37.5) + 5.5)+"px";
        //offsetArray[i].style.bottom = String(400-((i * 37.5) + 5.5))+"px";
        newOffsetDisplay.style.right = String((700+ 37.5))+"px";
    
        newOffsetDisplay.id = "offset"+currentArrayPosition;
        newOffsetDisplay.className = "offsets";//textContent
        newOffsetDisplay.textContent = this.offsets[currentArrayPosition];//textContent

        newControlUnit.display = newOffsetDisplay;

        //document.getElementById("matrix").appendChild(offsetArray[currentArrayPosition]); 

        let upTriangle = document.createElement("div");
        //upTriangle = document.createElement("div");
        upTriangle.style.bottom = String( 20)+"px";
        upTriangle.style.right = String(800-40)+"px";
        //myTriangle.style.width = 120+"px";

        upTriangle.id = "donTriange";
        upTriangle.className = "upTriangle";
        upTriangle.style.width = 40+"px";
        upTriangle.style.height = 20+"px";
 
        newControlUnit.upArrow = upTriangle;
        //upTriangle.addEventListener('mousedown',this.jimmy, false);
        //document.getElementById(offsetArray[currentArrayPosition].id).appendChild(upTriangle);  

        let downTriangle = document.createElement("div");
        //downTriangle = document.createElement("div");
        downTriangle.style.bottom = String(0)+"px";
        downTriangle.style.right = String(800-40)+"px";
        //myTriangle.style.width = 120+"px";

        downTriangle.id = "donTriange";
        downTriangle.className = "downTriangle";
        downTriangle.style.width = 40+"px";
        downTriangle.style.height = 20+"px";
        newControlUnit.downArrow = upTriangle;

        //offsetArray.push(document.createElement("div"));
        newControlUnit.container.appendChild(newControlUnit.display);
        newControlUnit.container.appendChild(newControlUnit.downArrow);
        newControlUnit.container.appendChild(newControlUnit.upArrow);
        offsetArray.push(newControlUnit);
        document.getElementById("matrix").appendChild(offsetArray[currentArrayPosition].container); 
        // offsetArray[currentArrayPosition].id = 'offsetsGroup'+currentArrayPosition;
        // offsetArray[currentArrayPosition].appendChild(newControlUnit.display);
        // offsetArray[currentArrayPosition].appendChild(newControlUnit.downArrow);
        // offsetArray[currentArrayPosition].appendChild(newControlUnit.upArrow);

 
        // downTriangle.addEventListener('mousedown',this.onMouseClickX, false);
        // downTriangle.addEventListener("augmentOffset",this.timmy,false);
        // document.getElementById(offsetArray[currentArrayPosition].id).appendChild(downTriangle);  
    }

    onMouseClickX()
    {
        console.log("button clocked");
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