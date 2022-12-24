import * as fs from 'node:fs'

const inputs = fs.readFileSync('./input.txt').toString().split('\n').filter(ip => ip.length > 0);



function parseInput(ipStr, obj){
    let opArray = [];
    //Used this object because i wanted to update the index of main loop after recursive call
    if (obj == null){
        obj = {};
        obj.current = 0
    }
    let result = null
    // init of j helps with recursive calls to strat from middle of string
    for (let j = obj.current; j < ipStr.length; j++){
        // need to update the object variable after every increment
        obj.current = j;
        // indicates start of an array
        if(ipStr[j] === '['){
            // to make a recursive call from the next element of the string after bracket
            obj.current+=1;
            // make recursive call and hold the output in result variable
            result = parseInput(ipStr,obj);
            // reset the value of for loop index which parses string to the new position after recursive call
            j = obj.current;       
        }
        // this means we need to add the current result in current calls opArray. 
        else if(ipStr[j] === ','){
            if(result != null){
                typeof result == 'string'? opArray.push(parseInt(result)): opArray.push(result);
                result = null;
            }
        }
        // we have successfully constructed a child array and returun it to its parent function call
        else if(ipStr[j] === ']'){
            if(result != null){
                typeof result == 'string'? opArray.push(parseInt(result)): opArray.push(result);
                result = null;
            }
            return opArray;
        }
        // means current element of string is just part of a number
        else{
            //we need to convert the result holding variale to string to accomodate more than 1 digit no's
            if (result == null)
                result = ""
            result += ipStr[j];
            
        }

    }
    // once all chars have been parsed, return the final result, Although I doubt code ever reaches here as last char is always ].
    return result;
}

function compare(leftArray, rightArray){
    let opValue = null;
        for (let i = 0; i< Math.max(leftArray.length, rightArray.length); i++) {
            let li = leftArray[i];
            let ri = rightArray[i];
            // if right array runs out of elements, incorrect order
            if (ri == undefined){
                opValue = false;
                return opValue;
            }
            // if left array runs out of elements, correct order
            else if (li == undefined ){
                opValue = true;
                return opValue;
            }
            if(typeof li == 'number' && typeof ri == 'number'){ 
                // if left number is higher, incorrect order           
                if ( li > ri){
                    opValue = false;
                    return opValue;
                }
                // if left number is lower, correct order
                else if (li < ri){
                    opValue = true;
                    return opValue;
                }
                //if both numbers equal. continue the loop to next elements of array
            }
            // if both elements at current index are arrays, ,make recursive call
            else if (Array.isArray(li) && Array.isArray(ri)){
                let result = compare(li, ri)
                // if we get a result even if true or false. all function calls up the call stack will stop and return the result
                if ( result != null){
                    opValue = result;
                    return opValue;
                }                
            }
            // if any one of the elements at current index is a number. convert both to array and make a new recursive call
            else if (Array.isArray(li) && typeof ri == 'number'){
                let result = compare(li, [ri]);
                if ( result != null){
                    opValue = result;
                    return opValue;
                } 
            }
            else if (typeof li == 'number' && Array.isArray(ri)){
                let result = compare([li], ri);
                if ( result != null){
                    opValue = result;
                    return opValue;
                } 
            }
    }
    return opValue;
}

let sum = 0
for (let i = 1; i < inputs.length; i+=2){
    let leftArray = parseInput(inputs[i-1]);
    let rightArray = parseInput(inputs[i]);
    if(compare(leftArray,rightArray)){
        sum +=  (i+1) / 2;
    }
}

console.log(sum);