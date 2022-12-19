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


let crtPixels = "";

function displayPixelOnCRT(clock){
    // if any portion of sprite falls on the pixel being drawn at the current position of the line.
    if(((clock) % 40 >= registers.X-1) && ((clock) % 40 <= registers.X+1) ){
        crtPixels += "#";
    }
    else{
        crtPixels+=".";
    }
    if((clock+1) % 40 == 0){
        crtPixels += "\n";
    }
}


//ProcessInstruction is before loading instruction but the results are available only after the current clock is finished.
//That is just before starting of next clock.
for (let clock = 0; signalTracker.index < signalTracker.length; clock++) {
    processInstruction();                                                  
    if (instructionPointer.step === 0) {                                   
        loadNextInstruction()
    }
    displayPixelOnCRT(clock);          
}

console.log(crtPixels);