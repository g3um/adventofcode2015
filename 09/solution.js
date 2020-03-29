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
        instructionsArray[i][0] = parseInput(instructions[i])[0];
        instructionsArray[i][1] = parseInput(instructions[i])[1];
        instructionsArray[i][2] = parseInput(instructions[i])[2];
    }
// console.table(instructionsArray);
//List of cities (unique)
const cities = [...new Set(instructionsArray.map(instruction => instruction[0]))];

// Function to find all arrays with specific value in an array of arrays
const checkValue = (arrayOfarray, value) => {
    let found = arrayOfarray.filter( array => array.includes(value));
    return found;
}

//Function to find minimum in last column
const minimum = (arrayOfarrays) => {
    let l = arrayOfarrays[0].length;
    let min = arrayOfarrays[0][l-1];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < arrayOfarrays.length; i++) {
            if (min > arrayOfarrays[i][l-1]) {
                min = arrayOfarrays[i][l-1];
            }
        }
    }
    return min;
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

const calculator = arrayOftrips => {
    let distance =0;
    for (let i = 0; i < arrayOftrips.length; i++) {
        let total =0;
        for (let j = 0; j < arrayOftrips[i].length-1; j++) {
            ArraysWithCurrValue = checkValue(instructionsArray,arrayOftrips[i][j]);
            CurrPair = [arrayOftrips[i][j] , arrayOftrips[i][j+1]];
            for (let k = 0; k < ArraysWithCurrValue.length; k++) {
                if (([ArraysWithCurrValue[k][0] , ArraysWithCurrValue[k][1]] = CurrPair) || ([ArraysWithCurrValue[k][1] , ArraysWithCurrValue[k][0]] = CurrPair)) {
                    distance = parseInt(ArraysWithCurrValue[k][2]);
                } 
            }
            total = total + distance; 
        }
        arrayOftrips[i].push(total);
    }
    // console.table(arrayOftrips);
    console.log(minimum(arrayOftrips));
}

let combinations = permutator(cities);
calculator(combinations);

// console.table(checkValue(instructionsArray,'Snowdin'));

// console.table(combinations);


//TEST
// arr = [['a','z'], ['a','a'], ['c','w']];
// console.log(checkValue(arr,'a'));
 
