var AudioContext = window.AudioContext || window.webkitAudioContext;
var audioCtx = new AudioContext();
var osc = audioCtx.createOscillator();
//osc.start();

osc.connect(audioCtx.destination);

let buttons = new Array;

for (var j = 0; j < 16 ; j++)
{
	buttons.push(new Array);
				
	for (var i = 0; i < 16 ; i++)
	{
					
        buttons[j].push(document.createElement("div"));
        
        let styleText1 = "transform:translate(" + i*100 +"px, " + j*10 + "px)";
       let styleText12 = "top:" + j*10 + "px; left:" + i*10 + "px";
        ////console.log(styleText1);
       // console.log("transform:translate(" + 10 + "px, " + 10 +"px)");

        ///buttons[j][i].cssText=styleText12; //+ (j * 37.5) + 50 + "px, " + (561- (i * 37.5) + 5) + "px)"; //x coord
       // buttons[j][i].cssText += (561- (i * 37.5) + 5) + "px)";
        //buttons[j][i].cssText= styleText12;
        buttons[j][i].style.top = (i * 20) + 5;
        buttons[j][i].style.left = (j * 20) + 5;
		buttons[j][i].id = "button"+i+j;
		buttons[j][i].className = "matrixButton";
		document.getElementById("matrix").appendChild(buttons[j][i]);						
	}
}
/*


let square1 = document.createElement("div");

square1.id = "lol'";
square1.className = "matrixButton";
square1.style.cssText="transform:translate(" + 10 + "px, " + 10 +"px)";

 document.getElementById("matrix").appendChild(square1);*/


/*
 reference grid loop
	for (var j:int = 0; j < 16 ; j++)
			{
				buttons.push(new Vector.<soundButton>);
				
				for (var i:int = 0; i < 16 ; i++)
				{
					
					buttons[j].push(new soundButton());
					buttons[j][i].y = (561- (i * 37.5) + 5);
					buttons[j][i].x  = (j * 37.5) + 50;
					buttons[j][i].visible = true;
					buttons[j][i].alpha = 0.5
					this.addChild(buttons[j][i]);						
                }
            }
				*/