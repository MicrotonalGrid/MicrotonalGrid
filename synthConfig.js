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

    createDisplay(offsetArray,octaveDisplay,subdivisionsDisplay,rootNoteDisplay)
    {
        for (var i = 0; i < 16 ; i++)
        {
                
            offsetArray.push(document.createElement("div"));
            offsetArray[i].style.bottom = String((i * 37.5) + 5.5)+"px";
            //offsetArray[i].style.bottom = String(400-((i * 37.5) + 5.5))+"px";
            offsetArray[i].style.right = String((700+ 37.5))+"px";
        
            offsetArray[i].id = "offset"+i;
            offsetArray[i].className = "offsets";//textContent
            offsetArray[i].textContent = this.offsets[i];//textContent

            document.getElementById("matrix").appendChild(offsetArray[i]); 
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
        octaveDisplay.style.bottom = String(370)+"px";
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
        rootInfo.style.right = String(800-780)+"px";
        rootInfo.style.width = 110+"px";

        rootInfo.id = "rootInfo";
        rootInfo.className = "subdivisions";
        rootInfo.textContent = "Root Frequency"  ;//textContent
        rootInfo.style.textDecoration = "underline";
        document.getElementById("matrix").appendChild(rootInfo);  

        let rootFreq;
        rootFreq = document.createElement("div");
        rootFreq.style.bottom = String(280)+"px";
        rootFreq.style.right = String(800-790)+"px";
        rootFreq.style.width = 110+"px";

        rootFreq.id = "rootFreq";
        rootFreq.className = "octave";
        rootFreq.textContent = String(this.rootNote)  ;//textContent
 
        document.getElementById("matrix").appendChild(rootFreq);  


        
    }
}