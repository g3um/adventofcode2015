const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});





  // Grid
const tablemaker = (sizex, sizey, fill) => {
    tempArr = new Array(sizex).fill(fill).map(currentRow => {
        return new Array(sizey).fill(fill);
    })
    return tempArr;
}
// console.table(gridmaker(3,7,0));

  // Instructions management
const instructions = input.split('\r\n');
const getaction = instruction => {
    if (instruction.substring(0, 7) === 'turn on') {
        return instruction.substring(0, 7);
    }
    if (instruction.substring(0, 8) === 'turn off') {
        return instruction.substring(0, 8);
    }
    if (instruction.substring(0, 6) === 'toggle') {
        return instruction.substring(0, 6);
    }
}

// let cmdArray = [];
// Create a table of input
instructionsArray = tablemaker(instructions.length,5,'');
for (let i = 0; i < instructions.length; i++) {
    let coordinates = instructions[i].match(/\d+/g);
    instructionsArray[i][0] = getaction(instructions[i]);
    instructionsArray[i][1] = coordinates[0];
    instructionsArray[i][2] = coordinates[1];
    instructionsArray[i][3] = coordinates[2];
    instructionsArray[i][4] = coordinates[3];

    //1 line equivalent
    // cmdArray.push([getaction(instructions[i]), coordinates[0], coordinates[1], coordinates[2], coordinates[3]]);
}
// console.table(instructionsArray);

const grid = tablemaker(1000, 1000, 0);
const lightitup = (instruction, l, t, r, b) => {
    for (let i = l; i <= r; i++) {
        for (let j = t; j <= b; j++) {
            switch (instruction) {
                case 'turn on':
                    grid[i][j] = 1;
                    break;
                case 'turn off':
                    grid[i][j] = 0;
                    break;
                default:
                    grid[i][j] = 1 - grid[i][j];
                    break;
                }
            }
        }
}

instructionsArray.map( (action) => {
    lightitup(action[0], action [1], action [2], action [3], action [4]);
});


//Calculation
const count = Arr => {
    let counter = 0;
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j<Arr.length; j++) {
            if (Arr[i][j]>0) {
                counter = counter + 1;
            }
        }     
    }
    return counter;
}

console.log(count(grid));
// console.table(instructionsArray);
// /\d+/g
// console.table(lightgrid(0));
// console.log(getaction('toggle 363,899 through 948,935'));