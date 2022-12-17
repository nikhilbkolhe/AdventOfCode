import * as fs from 'node:fs'
import { Serializer } from 'node:v8';

const inputData = fs.readFileSync('./input.txt').toString();

const rowMajorOrder = inputData.split("\n");

const size = {
    rows : rowMajorOrder.length,
    columns : rowMajorOrder[0].length
}

//IIFE to generate closures for every column and save them in an array.
// Reason for creating closure is same as that of rows but we need to save them
// in an array as we will be iterating through each tree in a row order form.
// Also  I did this because I wanted to practise more about closures.
const columnVisibilities = ( (inputData) =>
{
    let columnVisibilities = [];
    for(let i = 0; i < size.rows; i++){
        let columnArray = inputData.map( (element) => {
            return element[i];
        });
        columnVisibilities.push(generateColumnVisibility(columnArray.join("")));
    }
    return columnVisibilities
})(rowMajorOrder);

//Generate colsures for a particular row in order to optimize checking for visibility.
//when traversing from left to right in ur grid. If current tree size is greater than the 
// last known maximum tree size it is gaurenteed to be visible from left.
// this allows to not iterate through left side of array in order to check left visibility.
// TODO: Check if optimization can be done for right visibility. I think maybe through merge sort like alo ot can be optimized
function generateRowVisibility (row){
    let rowArray = row.split("");
    let visibleLeftLength = parseInt(rowArray[0]);
    rowArray = rowArray.map(element => parseInt(element));
    function lookLeft(index){
        if(rowArray[index] <= visibleLeftLength){
            return false;
        }
        else{
            visibleLeftLength = rowArray[index];
            return true;
        }
    }
    function lookRight(index){
       if (rowArray[index] > Math.max(...rowArray.slice(index+1)))
          return true;
        else
            return false;
    }
    function getRightScenicScore(index){
        let score = rowArray.length - index -1;
        for (let i = index+1 ; i < rowArray.length; i++){
            if (rowArray[index] <= rowArray[i]){
                score = i - index;
                break;
            }
        }
        return score
    }
    function getLeftScenicScore(index){
        let score = index;
        for (let i = index-1; i >= 0 ; i--){
            if (rowArray[index] <= rowArray[i]){
                score = index - i;
                break;
            }
        }
        return score
    }

    return {rowArray, lookLeft, lookRight, getRightScenicScore, getLeftScenicScore}
}


function generateColumnVisibility (column){
    let columnArray = column.split("");
    let visibleUpLength = parseInt(column[0]);
    columnArray = columnArray.map(element => parseInt(element));
    function lookUp(index){
        if(columnArray[index] <= visibleUpLength)
            return false;
        else
            visibleUpLength = columnArray[index];
            return true;
    }
    function lookDown(index){
       if (columnArray[index] > Math.max(...columnArray.slice(index+1)))
          return true;
        else
            return false;
    }
//TODO: use more ES6 sytax to achieve the same
    function getBottomcenicScore(index){
        let score = columnArray.length - index -1;
        for (let i = index+1 ; i < columnArray.length; i++){
            if (columnArray[index] <= columnArray[i]){
                score = i - index;
                break;
            }
        }
        return score
    }
    function getTopScenicScore(index){
        let score = index;
        for (let i = index-1; i >= 0; i--){
            if (columnArray[index] <= columnArray[i]){
                score = index - i;
                break;
            }
        }
        return score
    }

    return {columnArray, lookUp, lookDown, getBottomcenicScore, getTopScenicScore}
}

function getColumnVisibility(index){
    return columnVisibilities[index];
}


let maxScenicScore = 0;

for(let i = 1; i < size.rows - 1; i++){
    let rowvisibility = generateRowVisibility(rowMajorOrder[i],i);
    
    for(let index = 1; index < rowvisibility.rowArray.length - 1; index++ ){
        let columnVisibility = getColumnVisibility(index);
        //the first two function calls have binary OR in order to prevent shortcircuting.
        //So that the max tree from left and top can always be updated in the closures.
        let currentScenicScore = (rowvisibility.getLeftScenicScore(index) *
                                            rowvisibility.getRightScenicScore(index) *
                                            columnVisibility.getTopScenicScore(i) *
                                            columnVisibility.getBottomcenicScore(i));                                    
        maxScenicScore = maxScenicScore < currentScenicScore ? currentScenicScore : maxScenicScore;                                                
    };
}


console.log(maxScenicScore);