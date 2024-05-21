export default class Grid
{
  constructor()
  {

  }

  onMouseClick()
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


  onMouseOver(event)
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
  createGrid(buttons) 
  {
    for (let j = 0; j < 16 ; j++)
    {
      buttons.push([]);
          
      for (let i = 0; i < 16 ; i++)
      {
            
        buttons[j].push(document.createElement("div"));
        buttons[j][i].style.bottom = String((i * 37.5) + 5.5)+"px";
        buttons[j][i].style.right = String((700- (j * 37.5) + 7.5))+"px";
      
        buttons[j][i].id = "button"+i+j;
        buttons[j][i].className = "matrixButtOff";
        buttons[j][i].addEventListener('mouseover',this.onMouseOver, false);
        buttons[j][i].addEventListener('mousedown',this.onMouseClick, false);
        document.getElementById("matrix").appendChild(buttons[j][i]);          
      }
    }
  }
}
