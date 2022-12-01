//import to se file.ReadLines. Only works with Node > v18.12.x.
//TODO: try to find a way to do without using Readlines.
import { open } from 'node:fs/promises';

// My specific input
const file = await open('./input.txt');

//Array to hold top 3 clories carrying elves. 
const topThree = [0,0,0];

let sum = 0;

//maintain an array with top three calorie counting elves.
//TODO: try to think of a way where you dont need to sort every time 
//and place new element in its poisitin in place. 
const calcMaxThree = (maxArray,currentCalories) => {
   maxArray.push(currentCalories);
   maxArray = maxArray.sort((a,b) => {return b-a} );
   maxArray.pop();
}

//for loop example copied from 
//https://nodejs.org/docs/latest-v18.x/api/fs.html#filehandlereadlinesoptions
for await (const line of file.readLines()) {
    if(line.length === 0){
        calcMaxThree(topThree, sum);
        sum = 0;
        continue;
    }
    sum = sum + parseInt(line);
}


console.log(topThree.reduce((sum,calorie) => {
    return sum + calorie;
}));




