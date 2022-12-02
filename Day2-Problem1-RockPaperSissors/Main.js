//import to se file.ReadLines. Only works with Node > v18.12.x.
//TODO: try to find a way to do without using Readlines.
import { open } from 'node:fs/promises';

// My specific input
const file = await open('./input.txt');

//Variable to calculate totalScore
let totalScore = 0;

//Object To quantify inputs and outcomes
const scoreValues = {
    X : 1,
    Y : 2,
    Z : 3,
    A : 1,
    B : 2,
    C : 3,
    Win : 6,
    Draw : 3,
    Loss : 0
}

// map losing combination of opponent and strategic inputs
const losingPair = {
    1 : 2,
    2 : 3,
    3 : 1
}

const getScore = (opponentChoice, strategyGuideChoice) => {
    //round will be draw if score of both strategic and oponent value is same. 
    if (scoreValues[opponentChoice] === scoreValues[strategyGuideChoice]){
        return scoreValues[strategyGuideChoice] + scoreValues.Draw;
    }
    /*
        X looses to B, Draw to X | 1 looses to 2.
        Y looses to C, Draw to Y | 2 looses to 3.
        Z looses to A, Draw to Z | 3 looses to 1.
        So if value of losingPair of (key = strategyGuideChoice) == opponentChoice, 
        it's a loss.   
    */
    else if (losingPair[scoreValues[strategyGuideChoice]] === scoreValues[opponentChoice]){
        return scoreValues[strategyGuideChoice] + scoreValues.Loss;
    }
    // if not draw or loss means win
    else{
        return scoreValues[strategyGuideChoice] + scoreValues.Win;
    }
}

//iterate through inputs to calculate total score.
for await (let line of file.readLines()){
    let imputs = line.split(" ");
    totalScore += getScore(imputs[0],imputs[1]);
}

console.log(totalScore);