import {open} from 'fs/promises';

const file = await open('./input.txt');

let sum = 0;

const getRepeatedValue = (inputString) => {
    const partition1 = inputString.substring(0,inputString.length / 2)
    const partition2 = inputString.substring(inputString.length / 2, inputString.length);
    for (let word1 of partition1){
        for (let word2 of partition2){
            if (word1 === word2){
                return word1;
            }
        }
    }
}

const getPriority = (repeatedValue) => {
   if (repeatedValue.charCodeAt(0) < 91){
        return repeatedValue.charCodeAt(0) - 65 + 26 + 1;
   }
   else{
    return repeatedValue.charCodeAt(0) - 97 + 1;
   } 
}


for await (let line of file.readLines()){
    let commonWord = getRepeatedValue(line);
    let priority = getPriority(commonWord);
    sum += priority;
    console.log(`CommonWord: ${commonWord} ==> priority: ${priority} ===> Sum: ${sum}`)
}

console.log(sum);