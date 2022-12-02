//import to se file.ReadLines. Only works with Node > v18.12.x.
//TODO: try to find a way to do without using Readlines.
import { open } from 'node:fs/promises';

// My specific input
const file = await open('./input.txt');

//Variable to calculate totalScore
let totalScore = 0;

//Object To quantify inputs and outcomes
const scoreValues = {
    A : 1,
    B : 2,
    C : 3,
    Win : 6,
    Draw : 3,
    Loss : 0
}

// map losing combination of Rock Paper Scissor Values
// Key: ScoreOfOponentInput, Value: ScoreOfInputThatMustBePutToWin  
const winningPair = {
    1 : 2,
    2 : 3,
    3 : 1
}

// map losing combination of Rock Paper Scissor Values
// Key: ScoreOfOponentInput, Value: ScoreOfInputThatMustBePutToLose  
const losingPair = {
    1 : 3,
    2 : 1,
    3 : 2
}

//Variablize outcomes from strategic guide
const outcomeMap = {
    "X" : -1,
    "Y" : 0,
    "Z" : 1
}

const getScore = (opponentChoice, strategyGuideChoice) => {
    //Outcome That is expected according to strategy
    let strategicOutcome = outcomeMap[strategyGuideChoice];
    // Get what your play should be to win based on opponents play from winningPairObject
    if ( strategicOutcome === 1){
        return winningPair[scoreValues[opponentChoice]] + scoreValues.Win;
    }
    // Get what your play should be to draw based on opponents play from winningPairObject
    else if (strategicOutcome === 0){
        return scoreValues[opponentChoice] + scoreValues.Draw;
    }
    // Get what your play should be to draw based on opponents play from winningPairObject
    else {
        return losingPair[scoreValues[opponentChoice]] + scoreValues.Loss;
    }
}

//iterate through inputs to calculate total score.
for await (let line of file.readLines()){
    let imputs = line.split(" ");
    totalScore += getScore(imputs[0],imputs[1]);
}

console.log(totalScore);