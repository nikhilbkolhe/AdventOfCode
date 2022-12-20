import { monkeys,testMonkeys } from "./HardcodedMonkeys.js";
const monkeyCollection = monkeys;

// created a monke class in HardcodedMonkeys.js and defined methods that have all the buisness logix.

for (let round = 0; round < 20; round++) {
    monkeyCollection.forEach((monkey) => {
                                    monkey.inspectItems();
                                });
}

monkeyCollection.sort((monkey1, monkey2) => monkey2.inspectioncount - monkey1.inspectioncount)

console.log(monkeyCollection[0].inspectioncount * monkeyCollection[1].inspectioncount);