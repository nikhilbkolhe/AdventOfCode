import {open } from 'fs/promises'

// get filehandle
const file = await open('./input.txt')

//read file as a string
let op = await file.readFile({encoding:'utf-8'});

let sum = 0;

//converts string to array
const getInputInAnArray = (string) => {
    return string.split('\n');
}

const getCommonBadge = (elf1, elf2, elf3) => {
    //convert string inputs to set.
    let setA = new Set(elf1);
    let setB = new Set(elf2);
    let setC = new Set(elf3);
    //return an element which is common in all three sets
    for (let entry of setA.entries()){
        if (setB.has(entry[0]) && setC.has(entry[0])){
            return entry[0]
        }
    }
}
// convert common value to numeric priority.
const getPriorityValue = (categoryValue) => {
   if (categoryValue.charCodeAt(0) < 91){
        return categoryValue.charCodeAt(0) - 65 + 26 + 1;
   }
   else{
    return categoryValue.charCodeAt(0) - 97 + 1;
   } 
}

const inpArray = getInputInAnArray(op);

for (let i = 0; i + 3 < inpArray.length; i+=3){
    sum += getPriorityValue(getCommonBadge(inpArray[i],inpArray[i+1],inpArray[i + 2]))

}

console.log(sum);