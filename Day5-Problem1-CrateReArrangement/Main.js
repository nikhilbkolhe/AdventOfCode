import {open } from 'fs/promises'

const file = await open ('./input.txt');

//hardcoded the first part inputs lol
// try to parse them as well
const input = [
'QFMRLWCV'
,'DQL'
,'PSRGWCNB'
,'LCDHBQG'
,'VGLFZS'
,'DGNP'
,'DZPVFCW'
,'CPDMS'
,'ZNWTVMPC'
]

// regex to extract 
const regex = /^move (\d+) from (\d+) to (\d+)$/;


const moveCrates = (number, from, to) => {
    // simulate removing top n crates from source stack.
    let removedCrates = input[from].substring(input[from].length - number);
    // update source stack after removing  top n crates
    input[from] = input[from].substring(0,input[from].length - number);
    //imp thing to remember, when you move multiple crates one by one they will get reversed 
    //while placing on other pile as the top most crate will be moved first
    input[to] = input[to].concat(removedCrates.split("").reverse().join(""));
}


for await (let instruction of file.readLines()){
    let [number, from, to] = instruction.replace(regex,'$1-$2-$3').split('-');
    moveCrates(parseInt(number),parseInt(from) - 1, parseInt(to) -1);
}

console.log(input.reduce((topCrates, stack) => {
   return topCrates.concat(stack[stack.length - 1]);
},''))