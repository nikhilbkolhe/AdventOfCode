import * as fs from 'node:fs'

// read the imput charcter into a string
let inputSignal = fs.readFileSync('./input.txt').toString();

function findStartOfPacket(ipstring){
    // for each character in string
    for (let i = 0; i < ipstring.length ; i++){
        //take next three characters and current in a set
        let set = new Set(ipstring.substring(i,i+4));
        //if size of set is 4 means current 4 characters of string are all unique
        // which is start of packet
        if (set.size === 4){
            return i+3+1;
        }
    }
}

console.log(findStartOfPacket(inputSignal));
