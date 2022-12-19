import * as fs from 'node:fs'

const signals = fs.readFileSync('./input.txt').toString().split("\n");

const registers = {
    X : 1
}

const instructionPointer = {
    instruction:"",
    args:null,
    step:0
}

const signalTracker = {
    index : 0,
    length : signals.length
}

function loadNextInstruction(){
    let [instruction, arg] = signals[signalTracker.index].split(" ");
    if (instruction === "noop") {
        instructionPointer.instruction = "noop";
        instructionPointer.step= 1;
    }
    else if (instruction === "addx"){
        instructionPointer.instruction = "addx";
        instructionPointer.args = parseInt(arg);
        instructionPointer.step = 2;
    }
    signalTracker.index++;
}

function processInstruction(){
    if(instructionPointer.instruction === "noop" || (instructionPointer.instruction === "addx" && instructionPointer.step === 2)){
        instructionPointer.step--;
        return true;
    }
    else if (instructionPointer.instruction === "addx" && instructionPointer.step === 1){
        registers.X += instructionPointer.args;
        instructionPointer.step--;
    }
}


function registerInterestingSignal(clock){
    if (clock == 20 || clock == 60 || clock == 100 || clock == 140 || clock == 180 || clock == 220){
        return clock * registers.X;
    }
    else {
        return 0;
    }
}

let sumOfInterestingSignals = 0

//ProcessInstruction is before loading instruction but the results are available only after the current clock is finished.
//That is just before starting of next clock.
for (let clock = 0; signalTracker.index < signalTracker.length; clock++) {
    processInstruction();                                                  
    if (instructionPointer.step === 0) {                                   
        loadNextInstruction()
    }
    sumOfInterestingSignals += registerInterestingSignal(clock + 1);            
}

console.log(sumOfInterestingSignals);