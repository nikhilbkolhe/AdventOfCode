
class Monkey {
    constructor(id, items, operation, test, monkeyCollection,successOutcome, failureOutcome){
        this.id = id;        
        this.items = items;
        this.test = test;
        this.testResult = {success : successOutcome,  failure : failureOutcome}
        this.operation = operation;
        this.inspectioncount = 0;
        this.monkeyCollection = monkeyCollection;
    }
    _getBored(currentInterest){
        return Math.floor(currentInterest/3);
    }

    inspectItems(){
        // we need to iterate over a copy as original array gets modified by shift
        // in passItemMethod
        let itemCopy = [...this.items];
        itemCopy.forEach((item) => this._inspectNext(item))
    }

    _inspectNext(item){
        let newInterest = this.operation(item);
        newInterest = this._getBored(newInterest);
        if(this.test(newInterest)){
            this.passItem(newInterest, this.testResult.success);
        }
        else {
            this.passItem(newInterest, this.testResult.failure);
        }
        this.inspectioncount++;
    }

    passItem(item, reciever){
        this.items.shift();
        let recieverMonkey = this.monkeyCollection.find(monke => monke.id === reciever)
        recieverMonkey.items.push(item);
    }

}

// --------------------------- Hardcode monkey objects for actual input ---------------------------------------------//
let monkeys= [];

//0th Monkey
monkeys.push(new Monkey(0,
                        [52, 78, 79, 63, 51, 94],
                        (old) => {return old*13},
                        (newInterest) => { return newInterest % 5 === 0},
                        monkeys,
                        1,
                        6));



//1st Monkey
monkeys.push(new Monkey(1,
    [77, 94, 70, 83, 53],
    (old) => {return old + 3},
    (newInterest) => { return newInterest % 7 === 0},
    monkeys,
    5,
    3));                        

//2nd Monkey
monkeys.push(new Monkey(2,
    [98, 50, 76],
    (old) => {return old * old},
    (newInterest) => { return newInterest % 13 === 0},
    monkeys,
    0,
    6));                        


//3rd Monkey
monkeys.push(new Monkey(3,
    [92, 91, 61, 75, 99, 63, 84, 69],
    (old) => {return old +5},
    (newInterest) => { return newInterest % 11 === 0},
    monkeys,
    5,
    7));                        

//4th Monkey
monkeys.push(new Monkey(4,
    [51, 53, 83, 52],
    (old) => {return old + 7},
    (newInterest) => { return newInterest % 3 === 0},
    monkeys,
    2,
    0)); 
    
//5th Monkey
monkeys.push(new Monkey(5,
    [76, 76],
    (old) => {return old + 4},
    (newInterest) => { return newInterest % 2 === 0},
    monkeys,
    4,
    7));              
    
//6th Monkey
monkeys.push(new Monkey(6,
    [75, 59, 93, 69, 76, 96, 65],
    (old) => {return old *19},
    (newInterest) => { return newInterest % 17 === 0},
    monkeys,
    1,
    3));                        

//7th Monkey
monkeys.push(new Monkey(7,
    [89],
    (old) => {return old + 2},
    (newInterest) => { return newInterest % 19 === 0},
    monkeys,
    2,
    4));                        


//---------------------------------- hardCode Monkey Objects for test input ---------------------------------------------------//
let testMonkeys = []

//0th Monkey
testMonkeys.push(new Monkey(0,
    [79, 98],
    (old) => {return old*19},
    (newInterest) => { return newInterest % 23 === 0},
    testMonkeys,
    2,
    3));



//1st Monkey
testMonkeys.push(new Monkey(1,
[54, 65, 75, 74],
(old) => {return old + 6},
(newInterest) => { return newInterest % 19 === 0},
testMonkeys,
2,
0));                        

//2nd Monkey
testMonkeys.push(new Monkey(2,
[79, 60, 97],
(old) => {return old * old},
(newInterest) => { return newInterest % 13 === 0},
testMonkeys,
1,
3));                        


//3rd Monkey
testMonkeys.push(new Monkey(3,
[74],
(old) => {return old +3},
(newInterest) => { return newInterest % 17 === 0},
testMonkeys,
0,
1));                        

//export collection of actual and test input monkeys
export {monkeys, testMonkeys};
