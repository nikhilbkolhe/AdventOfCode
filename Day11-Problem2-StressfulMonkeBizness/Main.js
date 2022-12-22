import { monkeys,testMonkeys } from "./HardcodedMonkeys.js";
const monkeyCollection = monkeys;

// created a monke class in HardcodedMonkeys.js and defined methods that have all the buisness logix.

for (let round = 0; round < 10000; round++) {
    if ( (round+1) % 1000 === 0 || round ===0 || round === 19)
        console.log(`=== After round ${round} ===`)
    monkeyCollection.forEach((monkey) => {
                                    monkey.inspectItems();
                                    if ( (round+1) % 1000 === 0 || round ===0 || round === 19)
                                        console.log(`Monkey ${monkey.id} inspected items ${monkey.inspectioncount} times`)
                                });
}

monkeyCollection.sort((monkey1, monkey2) => monkey2.inspectioncount - monkey1.inspectioncount)

console.log(monkeyCollection[0].inspectioncount * monkeyCollection[1].inspectioncount);