export default function Life(currentGrid)
{
    let nextGrid = [];
    let nextToneStates = [];
    function nextState(cell, iterationIndex, toneIndex)
    {
        function wrappedInt(rawInt)
        {
            let calculatedInt = rawInt;
            if(rawInt >15)
            {
                calculatedInt = 0;
            }
            else if(rawInt<0)
            {
                calculatedInt = 15;
            }
            return calculatedInt;
        }
       
        let neighborStates =0;

        let neighborStateGrid = [];
        neighborStateGrid.push( currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex-1)].className );
        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex)].className );
        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex+1)].className );

        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex)][wrappedInt(toneIndex-1)].className );
        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex)][wrappedInt(toneIndex+1)].className );

        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex-1)].className );
        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex)].className );
        neighborStateGrid.push(currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex+1)].className );

        for (const thing of neighborStateGrid) 
        {
            if(thing == "matrixButtOn")
            {
                neighborStates++;
            }
        }

        if(neighborStates <2 && cell.className == "matrixButtOn")
        {
           return "matrixButtOff";        
        }
        else if((neighborStates == 2 || neighborStates == 3 )  && cell.className == "matrixButtOn")
        {
            return "matrixButtOn"; // do nothing!
        }
        else if(neighborStates >3   && cell.className == "matrixButtOn")
        {
            return "matrixButtOff";
        }
        else if(neighborStates == 3   && cell.className == "matrixButtOff")
        {
            return "matrixButtOn";
        }
        else
        {
            return cell.className;
        }
    }
        
    nextToneStates = [];

    for (let column of currentGrid) 
    {       
        let nextColumn = [];
        let nextNoteQuantity = 0;
        for (let square of column) 
        {
            let nextStateToPush =   nextState(square, currentGrid.indexOf(column), column.indexOf(square) );         
            nextColumn.push( nextStateToPush );
            if(nextStateToPush == "matrixButtOn")
            {
                nextNoteQuantity++;
            }
        }    
        nextGrid.push(nextColumn);
        nextToneStates.push(nextNoteQuantity);
    }

    for (let i  = 0; i  < 16; i ++) 
    {
        for (let j = 0; j < 16; j++) 
        {
            currentGrid[i][j].className  = nextGrid[i][j];            
        }                
    }

    const updateGridEvent = new CustomEvent("updateGridTones", { // better name
        detail: {
          nextNotesQuantity: nextToneStates
        }
      });
      console.log("here");
      console.log(nextToneStates);
    window.dispatchEvent(updateGridEvent);
    
}
