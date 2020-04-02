const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});
const inputTest = fs.readFileSync('inputTest.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});


// table maker
const tablemaker = (lines, columns, fill) => {
    tempArr = new Array(lines).fill(fill).map(currentRow => {
        return new Array(columns).fill(fill);
    })
    return tempArr;
}

// INSTRUCTIONS MANAGEMENT
const instructions = input.split('\r\n');

//parse input (3 data point)
const parseInput = instruction => {
    arrayInput =["","","",""];
    arrayInput[0] = instruction.substring(0,instruction.indexOf(' would'));
    arrayInput[2] = instruction.substring(instruction.indexOf('to ')+3,instruction.length-1);
    let effect = instruction.substring(instruction.indexOf('would')+6,instruction.indexOf('would')+10);
    switch (effect) {
        case 'lose':
            arrayInput[1] = -instruction.match(/\d+/g);
            break;
        case 'gain':
            arrayInput[1] = parseInt(instruction.match(/\d+/g));
            break;
        default:
            console.log(err);
            break;
    }
    arrayInput[3] = instruction.substring(instruction.indexOf('would')+6,instruction.indexOf('would')+10);
    return arrayInput;
 }

//Table of instructions
instructionsArray = tablemaker(instructions.length,4,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }

console.table(instructionsArray);
//List of name (unique)
const namesAll = array =>{
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i][0]);
        result.push(array[i][2]);
    }
    return result;
};
const names = [...new Set(namesAll(instructionsArray).map(instruction => instruction))];
// console.log(names);
//Part 2 - New instructions
const addGuest = (instructionsArray,names, string) => {
    for (let i = 0; i < names.length; i++) {
        instructionsArray.push([string,0,names[i],'gain']);
        instructionsArray.push([names[i],0,string,'gain']);
    }
    names.push(string);
    
}
addGuest(instructionsArray,names,'Host');

console.table(instructionsArray);
//Permutation, credit to "Delimited" user on stackoverflow for an elegant & concise alternative to something I had many lines of code for
const permutator = (inputArr) => {
    let result = [];
  
    const permute = (arr, m = []) => {
    // when done with removing each element and permutating all the remaing array, original array is empty so current permutation Matrix M stored in result
      if (arr.length === 0) {
        result.push(m)
      } else {
        for (let i = 0; i < arr.length; i++) {
          // store temporary copy of current array
          let curr = arr.slice();
          // remove element i
          let next = curr.splice(i, 1);
          // complete the array with each other element
          permute(curr.slice(), m.concat(next))
       }
     }
   }
  
   permute(inputArr)
  
   return result;
}

const NamesCombinations = permutator(names);
// console.table(NamesCombinations);

// Function to find all arrays with specific value in instructionsArray
const checkValue = (arrayOfarrays, value) => {
    return arrayOfarrays.filter( array => array.includes(value));
}

//Function to compare arrays
const areArraysEqual = (array1, array2) => {
    if(array1.length === array2.length) {
        for (let i = 0; i < array1.length; i++) {
            if( array1[i] !== array2[i]) {
                return false
            }
        }
        return true;
    } else {
        return false;
    }
}

//Function to find maximun in last column
const maximum = (arrayOfarrays) => {
    let l = arrayOfarrays[0].length;
    let max = arrayOfarrays[0][l-1];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < arrayOfarrays.length; i++) {
            if (max < parseInt(arrayOfarrays[i][l-1])) {
                max = parseInt(arrayOfarrays[i][l-1]);
            }
        }
    }
    return max;
}


const calculator = arrayOfseatings => {
   
    for (let i = 0; i < arrayOfseatings.length; i++) {
        let total =0;
        for (let j = 0; j < arrayOfseatings[i].length ; j++) {
            switch (j) {
                case arrayOfseatings[i].length-1:
                    CurrValue = arrayOfseatings[i][j]; // Current city in current trip (line)
                    ArraysWithCurrValue =  checkValue(instructionsArray , CurrValue); //Look for all arrays with the current city in input
                    CurrPair = [arrayOfseatings[i][j] , arrayOfseatings[i][0]]; //creates array of current city & next city
                    break;
            
                default:
                    CurrValue = arrayOfseatings[i][j]; // Current city in current trip (line)
                    ArraysWithCurrValue =  checkValue(instructionsArray , CurrValue); //Look for all arrays with the current city in input
                    CurrPair = [arrayOfseatings[i][j] , arrayOfseatings[i][j+1]]; //creates array of current city & next city
                    break;
            }

            let score =0;
            for (let k = 0; k < ArraysWithCurrValue.length; k++) { // check all the arrays with current city and find the array with next city
                testArray = [ ArraysWithCurrValue[k][0] , ArraysWithCurrValue[k][2] ];
                testArray2 = [ ArraysWithCurrValue[k][2] , ArraysWithCurrValue[k][0] ];
                if (areArraysEqual(CurrPair,testArray) || areArraysEqual(CurrPair , testArray2)) { //
                    score += ArraysWithCurrValue[k][1];
                } 
            }
                
            total += score;
        }
        
        arrayOfseatings[i].push(total);
    }
    // console.table(arrayOfseatings);
    // console.log('minimum:');console.log(minimum(arrayOftrips));
    console.log('maximum:');console.log(maximum(arrayOfseatings));
}


calculator(NamesCombinations);