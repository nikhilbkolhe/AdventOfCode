import * as fs from 'node:fs'

const inputs = fs.readFileSync('./input.txt').toString().split("\n");

// number of knots to be generated.
const noOfKnots = 10;

// IIFE to generate a specified number of knots with each knot having [0,0] as its 
// row and column index.
// 1st co-ordinate array is considiered as HEAD and last as TAIL.
let currentKnotPositions = ((num)=>{
    let tempArray = [];
   for (let index = 0; index < num; index++) {
     tempArray.push([0, 0]);
   }
   return tempArray;
})(noOfKnots);


function inSameColumn(knot1, knot2){
    return knot1[1] === knot2[1];
}

function inSameRow(knot1, knot2){
    return knot1[0] === knot2[0];
}

function ifColumnDistanceValid(previousKnot, currentKnot){
    return Math.abs(previousKnot[1] - currentKnot[1]) > 1 ? true : false;
}

function ifRowDistanceValid(previousKnot, currentKnot){
    return Math.abs(previousKnot[0] - currentKnot[0]) > 1 ? true : false;
}

// Calculated using pythagorus theorem.
// Distance is valid only if, either the column has diff of 2 in its co-ordinates and diff of 1 in row co-ordinates
// or vice-versa, which makes hypo sqaure = 5
function ifDiagonalDistanceValid(previousKnot, currentKnot){
    if (((previousKnot[1] - currentKnot[1]) ** 2) + ((previousKnot[0] - currentKnot[0]) ** 2) >= 5)
        return true;
    else
        return false;

}

let tailVisitations = [];

// If the current position is not already visited then add to tailVisitations array. 
function recordTailVisitation(knot){
    if (tailVisitations.find((pos) => pos[0] === knot[0] && pos[1] === knot[1]) == undefined){
        tailVisitations.push([...knot]);
    }
}


 
function MoveDiagonal(prevKnot, currKnot){
  MoveColumnWise(prevKnot, currKnot);
  MoveRowWise(prevKnot,currKnot);
}


//Knots always move in reference to their previous knot.
//This method for Knots in same column.
//If previous Knot is below, then increase current knots rowNum.
// Else decrease the current knots rowNum.
function MoveColumnWise(prevKnot, currKnot){
    if (prevKnot[0] > currKnot[0]){
        currKnot[0]++;
    }
    else{
        currKnot[0]--;
    }
}

//Knots always move in reference to their previous knot.
//This method for Knots in same row.
//If previous Knot is on right, then increase current knots colNum.
// Else decrease the current knots colNum.
function MoveRowWise( prevKnot, currKnot){
    if(prevKnot[1] > currKnot[1]){
        currKnot[1]++;
    }
    else{
        currKnot[1]--;
    }
}

//Head always moves according to direction specified
//Since we are doing each step 1 by 1 we just increment or decrement
//Head Co-Ordinate by 1.
function MoveHead(direction, currentKnotPositions){
    let head = currentKnotPositions[0];
    switch (direction) {
        case "U":
            head[0]--;
            break;
        case "D":
            head[0]++;
            break;
        case "L":
            head[1]--;
            break;
        case "R":
            head[1]++;
            break;
    }
}

//Knots always move in reference to their previous knot.So we dont need direction over here.
//This method iterated through all knots to update their position.
//If current and prevKnot are in same Row and has valid distance in its columns. We update current's column.
//If current and prevKnot are in same Column and has valid distance in its row. We update current's row.
//Else we need to move the current knot diagonally and has valid diagonal distance. Then update its row as well as column in ref to prev knot.
function MoveKnots(currentKnotPositions) {

    for (let i = 1; i < currentKnotPositions.length; i++){
        let currentKnot = currentKnotPositions[i];
        let previousKnot = currentKnotPositions[i-1];
        if(inSameRow(previousKnot, currentKnot) && ifColumnDistanceValid(previousKnot, currentKnot)){
            MoveRowWise(previousKnot, currentKnot);
        }
        else if (inSameColumn(previousKnot, currentKnot) && ifRowDistanceValid(previousKnot, currentKnot)){
            MoveColumnWise(previousKnot, currentKnot);
        }
        else{
            if (ifDiagonalDistanceValid(previousKnot, currentKnot)){
                MoveDiagonal(previousKnot, currentKnot);
            }
        }
        // Tail is considered to be the last knot. Record its current position.
        if (i == currentKnotPositions.length -1){
            recordTailVisitation(currentKnot);
        }
    }
}


//if current commund is U 4. This method will process it like U U U U.
function processInput(input,currentKnotPositions){
    let [direction, steps] = input.split(" ");
    steps = parseInt(steps);
    for (let index = 0; index < steps; index++) {             //Move throughEach step 1 by 1
        MoveHead(direction,currentKnotPositions);             //Update headPosition for current step.
        MoveKnots(currentKnotPositions);                      //Update Position of each knot for current step. 
    }

}

// iterate through each command
inputs.forEach(element => {
    processInput(element,currentKnotPositions);
});


console.log(tailVisitations.length);