const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
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
    arrayInput =["","",""];
    arrayInput[0] = instruction.substring(0,instruction.indexOf(' to'));
    arrayInput[1] = instruction.substring(instruction.indexOf('to')+3,instruction.indexOf(' ='));
    arrayInput[2] = instruction.match(/\d+/)[0];
    return arrayInput;
 }

//Table of instructions
instructionsArray = tablemaker(instructions.length,3,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }
// console.table(instructionsArray);
//List of cities (unique)
const citiesAll = array =>{
    let result = [];
    for (let i = 0; i < array.length; i++) {
        result.push(array[i][0]);
        result.push(array[i][1]);
    }
    return result;
};
const cities = [...new Set(citiesAll(instructionsArray).map(instruction => instruction))];


// Function to find all arrays with specific value in instructionsArray
const checkValue = (arrayOfarrays, value) => {
    return arrayOfarrays.filter( array => array.includes(value));
}


//Function to find minimum in last column
const minimum = (arrayOfarrays) => {
    let l = arrayOfarrays[0].length;
    let min = arrayOfarrays[0][l-1];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < arrayOfarrays.length; i++) {
            if (min > parseInt(arrayOfarrays[i][l-1])) {
                min = parseInt(arrayOfarrays[i][l-1]);
            }
        }
    }
    return min;
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

const CitiesCombinations = permutator(cities);


const calculator = arrayOftrips => {
    let distance =0;
    for (let i = 0; i < arrayOftrips.length; i++) {
        let total =0;
        for (let j = 0; j < arrayOftrips[i].length-1 ; j++) {
            CurrValue = arrayOftrips[i][j]; // Current city in current trip (line)
            ArraysWithCurrValue =  checkValue(instructionsArray , CurrValue); //Look for all arrays with the current city in input
            CurrPair = [arrayOftrips[i][j] , arrayOftrips[i][j+1]]; //creates array of current city & next city
            for (let k = 0; k < ArraysWithCurrValue.length; k++) { // check all the arrays with current city and find the array with next city
                testArray = [ ArraysWithCurrValue[k][0] , ArraysWithCurrValue[k][1] ];
                testArray2 = [ ArraysWithCurrValue[k][1] , ArraysWithCurrValue[k][0] ];
                if (areArraysEqual(CurrPair,testArray) || areArraysEqual(CurrPair , testArray2)) { //
                    distance = parseInt(ArraysWithCurrValue[k][2]);
                } 
            }
            total = total + distance; 
        }
        arrayOftrips[i].push(total);
    }
    // console.table(arrayOftrips);
    console.log('minimum:');console.log(minimum(arrayOftrips));
    console.log('maximum:');console.log(maximum(arrayOftrips));
}


calculator(CitiesCombinations);


