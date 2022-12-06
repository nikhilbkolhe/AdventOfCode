import * as fs from 'node:fs'

// read the imput charcter into a string
let inputSignal = fs.readFileSync('./input.txt').toString();

function findStartOfPacket(ipstring){
    // for each character in string
    for (let i = 0; i < ipstring.length ; i++){
        //take next thirteen characters and current in a set
        let set = new Set(ipstring.substring(i,i+14));
        //if size of set is 14 means current 14 characters of string are all unique
        // which is start of message
        if (set.size === 14){
            return i+13+1;
        }
    }
}

console.log(findStartOfPacket(inputSignal));
