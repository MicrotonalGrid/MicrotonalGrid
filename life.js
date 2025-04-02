export default function Life(currentGrid)
{
    let nextGrid = [];
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
 /*
        
        neighborStates += (currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex-1)].className == "matrixButtOn"? 1 : 0);
        neighborStates += (currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex)].className == "matrixButtOn"? 1 : 0);
        neighborStates += (currentGrid[wrappedInt(iterationIndex-1)][wrappedInt(toneIndex+1)].className == "matrixButtOn"? 1 : 0);

        neighborStates += (currentGrid[wrappedInt(iterationIndex)][wrappedInt(toneIndex-1)].className == "matrixButtOn"? 1 : 0);
        neighborStates += (currentGrid[wrappedInt(iterationIndex)][wrappedInt(toneIndex+1)].className == "matrixButtOn"? 1 : 0);

        neighborStates += (currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex-1)].className == "matrixButtOn"? 1 : 0);
        neighborStates += (currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex)].className == "matrixButtOn"? 1 : 0);
        neighborStates += (currentGrid[wrappedInt(iterationIndex+1)][wrappedInt(toneIndex+1)].className == "matrixButtOn"? 1 : 0);
        */

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

        // console.log(neighborStates + " neighborStates " + cell.id);


        if(neighborStates <2 && cell.className == "matrixButtOn")
        {
            // console.log("ff " + cell.id);
           return "matrixButtOff";
        
        }
        else if((neighborStates == 2 || neighborStates == 3 )  && cell.className == "matrixButtOn")
        {
            // console.log("na " + cell.id);

            return   "matrixButtOn"; // do nothing!
        }
        else if(neighborStates >3   && cell.className == "matrixButtOn")
        {
            // console.log("ff " + cell.id);
            return "matrixButtOff";
        }
        else if(neighborStates == 3   && cell.className == "matrixButtOff")
        {
            // console.log("on " + cell.id);
            return "matrixButtOn";
        }
        else
        {
            return cell.className;
        }
    }


    for (let column of currentGrid) 
    {       
        let nextColumn = [];
        for (let square of column) 
        {           
            nextColumn.push( nextState(square, currentGrid.indexOf(column), column.indexOf(square) ) );

            // 
            // if(square.className == "matrixButtOn")
            //     {
            //         square.className = "matrixButtOff";
            //         // console.log(column.indexOf(square));
            //     }  
            //     else if(square.className == "matrixButtOff")
            //     {
            //         //// console.log(square);
            //         //square.className ="matrixButtOn";
            //     }
        }    
        nextGrid.push(nextColumn);
    }

    // console.log("lol");
    for (let i  = 0; i  < 16; i ++) 
    {
        for (let j = 0; j < 16; j++) {
            currentGrid[i][j].className  = nextGrid[i][j];
            
        }
        
        
    }


}
