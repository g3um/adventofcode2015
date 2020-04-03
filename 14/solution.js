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
    arrayInput =["",0,0,0,"",0,0,0];
    arrayInput[0] = instruction.substring(0,instruction.indexOf(' can')); //array 0 reindeer name
    for (let i = 0; i < instruction.match(/\d+/g).length; i++) {
    arrayInput[i+1] = parseInt(instruction.match(/\d+/g)[i]); //array 1,2,3 speed, flytime, resttime
    }
    arrayInput[4]='fly'; //array 4 status
    arrayInput[5]=arrayInput[2]; //array 5 remaining flytime or remaining waitime, array 6 distance, array 7 score

    return arrayInput;
 }

//Table of instructions
instructionsArray = tablemaker(instructions.length,4,'');
    for (let i = 0; i < instructions.length; i++) {
        instructionsArray[i] = parseInput(instructions[i]);
    }
// console.table(instructionsArray);


//Function to find maximum in specific column
const maximum = (arrayOfarrays,col) => {
    let max = arrayOfarrays[0][col];
    for (let j = 0; j < 2; j++) {
        for (let i = 0; i < arrayOfarrays.length; i++) {
            if (max < parseInt(arrayOfarrays[i][col])) {
                max = parseInt(arrayOfarrays[i][col]);
            }
        }
    }
    return max;
}

//Function to find winners (reindeer or reindeers that have the max distance)
const roundWinners = instructionsArray => {
    for (let i = 0; i < instructionsArray.length; i++) {
        if (instructionsArray[i][6] === maximum(instructionsArray,6)) {
            instructionsArray[i][7] +=1;
        }
    }
    return maximum(instructionsArray,7);
} 



const race = (instructionsArray, endTime) => {
    for (let t = 0; t < endTime; t++) {
        for (let i = 0; i < instructionsArray.length; i++) {
            switch (instructionsArray[i][4]) {
                case 'fly':
                    instructionsArray[i][6] += instructionsArray[i][1];
                    instructionsArray[i][5] -= 1; //remaining flytime decreases
                        if (instructionsArray[i][5] === 0) { // when flytime / wait time is over
                            instructionsArray[i][4] = 'wait';
                            instructionsArray[i][5] = instructionsArray[i][3];
                        }
                    break;
                    
                case 'wait':
                    instructionsArray[i][5] -= 1; //remaining waitime decreases
                    if (instructionsArray[i][5] === 0) { // when flytime / wait time is over
                        instructionsArray[i][4] = 'fly';
                        instructionsArray[i][5] = instructionsArray[i][2];
                    }
                    break;
                default:
                    console.log('error status');
                    break;
            }
        }
        
        
        roundWinners(instructionsArray);
        
    }
    console.log('Max distance :');console.log(maximum(instructionsArray,6)); //Part2
    console.log('Max score :');console.log(maximum(instructionsArray,7)); //Part1
}

race(instructionsArray,2503);