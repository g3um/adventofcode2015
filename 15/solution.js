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

const parseInput = instruction => {
    let arrayInput = [];
    arrayInput[0] = instruction.substring(0,instruction.indexOf(':')); // Ingredient name
    arrayInput[1] = parseInt(instruction.substring(instruction.indexOf('capacity ')+9,instruction.indexOf(',')));
    arrayInput[2] = parseInt(instruction.substring(instruction.indexOf('durability ')+11,instruction.indexOf(', f')));
    arrayInput[3] = parseInt(instruction.substring(instruction.indexOf('flavor ')+7,instruction.indexOf(', t')));
    arrayInput[4] = parseInt(instruction.substring(instruction.indexOf('texture ')+8,instruction.indexOf(', c')));
    arrayInput[5] = parseInt(instruction.substring(instruction.indexOf('calories ')+9,instruction.length));

    return arrayInput;
 }

//Table of instructions
instructionsArray = tablemaker(instructions.length,4,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }
// console.table(instructionsArray);


//Function to find maximum in array
const maximum = array => {
    let max = parseInt(array[0]);

    for (let i = 0; i < array.length; i++) {
        if (max < parseInt(array[i])) {
            max = parseInt(array[i]);
        }
    }
    return max;
}



const mixIngredients = (array,step) => {
    let result=1;
    let calories=0;
    let resultArray=[];

    // List of all combination of 4 variables and a sum of 100
    let combiResult =[];
    for (let a = 1; a < 98; a++) {
        for (let b = 1; b < 98; b++) {
            for (let c = 1; c < 98; c++) {
                for (let d = 1; d < 98; d++) {
                    if ((a+b+c+d) == 100) {
                        combiResult.push([a,b,c,d]);
                    }
                }
            }
        }
    }

        
    for (let i=0; i<combiResult.length;i++) {
        let a=combiResult[i][0];
        let b=combiResult[i][1];
        let c=combiResult[i][2];
        let d=combiResult[i][3];
        for (let j = 1; j < array[0].length-1; j++) {
            result *= a * array[0][j] + b * array[1][j]+ c * array[2][j] + d * array[3][j];
            
            if (result < 0) {
                result =0;
            }
        }
        calories = a * array[0][5] + b * array[1][5]+ c * array[2][5] + d * array[3][5];
        switch (step) {
            case 1:
                resultArray.push(result)
                break;
            case 2:
                if (calories == 500){
                    resultArray.push(result);
                }
            default:
                break;
        }
        result=1;
    }
    return(maximum(resultArray));
}

console.log('Part 1:');console.log(mixIngredients(instructionsArray,1));
console.log('Part 2:');console.log(mixIngredients(instructionsArray,2));