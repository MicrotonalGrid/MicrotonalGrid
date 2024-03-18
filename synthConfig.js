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

    createDisplay(offsetArray)
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
    }
}