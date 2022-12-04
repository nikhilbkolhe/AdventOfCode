import {open} from 'fs/promises'

const fileHandle = await open('input.txt');

//variable to hold a count.
let count = 0;

//if lb < lb and ub < ub or lb > lb and ub > ub then the ranges are encompassing
const isEncompassing = (lb1,ub1,lb2,ub2) => {
    if((lb1 < lb2 && ub1 < ub2) || (lb1 > lb2 && ub1 > ub2))
        return false;
    else
        return true;
} 

for await (let line of fileHandle.readLines()){
    //split the two ranges and then split each range again to get upper and lower bounds
    let inputs  = line.split(',').map((value) => {
        // for each boundat value convert to int
        return value.split('-').map((value2) => {
            return parseInt(value2)
        })
    });
    //final input is like this [[lb1, ub1], [lb2, ub2]] 
    if (isEncompassing(inputs[0][0], inputs[0][1], inputs[1][0], inputs[1][1]))
        count += 1;
}

console.log(count);
