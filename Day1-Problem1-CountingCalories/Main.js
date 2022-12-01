//import to se file.ReadLines. Only works with Node > v18.12.x.
//TODO: try to find a way to do without using Readlines.
import { open } from 'node:fs/promises';

// My specific input
const file = await open('./input.txt');

//Variable to hold Max calories carried by an elf.
let maxValue = 0 

let sum = 0;

const calcMaxValue = (prevMax, currentCalories) => {
    if (prevMax > currentCalories)
        return prevMax;
    else
        return currentCalories;
}


//for loop example copied from 
//https://nodejs.org/docs/latest-v18.x/api/fs.html#filehandlereadlinesoptions
for await (const line of file.readLines()) {
    if(line.length === 0){
        maxValue = calcMaxValue(maxValue,sum);
        sum = 0;
        continue;
    }
    sum = sum + parseInt(line);
}

console.log(maxValue);




