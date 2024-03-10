
function onMouseClick(event)
{
  if(this.className == 'matrixButtOff')
  {
    this.className = 'matrixButtOn';
  }
  else
  {
    this.className = 'matrixButtOff';
  }
  console.log(this);
}


function onMouseOver(event)
{
  if(event.buttons>0)
  {
    if(this.className == 'matrixButtOff')
    {
      this.className = 'matrixButtOn';
    }
    else
    {
      this.className = 'matrixButtOff';
    }
    
  }
}
/***
 * 
 * Gets passed an existing array and appends a grid of buttons with turn on off functionality, which 
 * can then be manipulated where it is created by referencing the array passed in out there
 * 
 */
function createGrid(buttons) 
{
  for (var j = 0; j < 16 ; j++)
  {
    buttons.push(new Array);
        
    for (var i = 0; i < 16 ; i++)
    {
          
      buttons[j].push(document.createElement("div"));
      buttons[j][i].style.bottom = (i * 37.5) + 5.5;
      buttons[j][i].style.right = (700- (j * 37.5) + 7.5);
    
      buttons[j][i].id = "button"+i+j;
      buttons[j][i].className = "matrixButtOff";
      buttons[j][i].addEventListener('mouseover',onMouseOver, false);
      buttons[j][i].addEventListener('mousedown',onMouseClick, false);
      document.getElementById("matrix").appendChild(buttons[j][i]);          
    }
  }
}

