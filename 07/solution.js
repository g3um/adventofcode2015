const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});


// 1- Binary converter (not used)
 const binary = (decimal) => {
    number = decimal;
    bin = "";
    while (number != 0) {
        remainder = number - Math.trunc(number/2) * 2 + "";
        number = Math.trunc(number/2);
        bin = remainder.concat(bin);
    }
    return bin;
}


// 2- Decimal converter (not used)
const decimal = (binary) => {
    string = binary.toString();
    dec = 0;
    for (let i = 0; i < string.length; i++) {
        dec = dec * 2 + parseInt(string.substring(i , i+1));
    }
    return dec;
}

// 3- table maker
const tablemaker = (lines, columns, fill) => {
    tempArr = new Array(lines).fill(fill).map(currentRow => {
        return new Array(columns).fill(fill);
    })
    return tempArr;
}


// 4- INSTRUCTIONS MANAGEMENT \\
const instructions = input.split('\r\n');
// 4.1- Get signal (left part)
const getCommand = instruction => {
    return instruction.substring(0, instruction.indexOf(' ->'));
}
// 4.2- Get receivng wire (right part)
 const getWire = instruction => {
    return instruction.substring(instruction.indexOf('->')+3,instruction.length);
 }
// 4.3- Get bitwise operator (Gate) 
 const getGate = instruction => {
     arrayGate =["",""];
    if (instruction.indexOf('AND') != -1) {
        arrayGate[0] = 'AND';
        arrayGate[1] = '&'
    } else {
        if (instruction.indexOf('NOT') != -1) {
            arrayGate[0] = 'NOT';
            arrayGate[1] = '~'
        } else {
            if (instruction.indexOf('OR') != -1) {
                arrayGate[0] = 'OR';
                arrayGate[1] = '|'
            } else {
                if (instruction.indexOf('LSHIFT') != -1) {
                    arrayGate[0] = 'LSHIFT';
                    arrayGate[1] = '<<'
                } else {
                    if (instruction.indexOf('RSHIFT') != -1) {
                        arrayGate[0] = 'RSHIFT';
                        arrayGate[1] = '>>'
                    } else {
                        arrayGate[0] = 'none';
                        arrayGate[1] = getCommand(instruction);
                    }
                }
            }
        }
    }
    return arrayGate;
}
// 4.4- Get wires and numbers around bitwise operator
const getCmdWires = instruction => {
    arrayWires =["",""]
    if (getGate(instruction)[0] === 'NOT') {
        arrayWires[1] = instruction.substring(instruction.indexOf(getGate(instruction)[0])+getGate(instruction)[0].length+1, instruction.indexOf(' ->'));
    }
    if (getGate(instruction)[0] != 'NOT' && getGate(instruction)[0] != 'AND' && getGate(instruction)[0] != 'OR' && getGate(instruction)[0] != 'LSHIFT' && getGate(instruction)[0] != 'RSHIFT') {
        arrayWires[1] = getCommand(instruction);
    } else {

    arrayWires[0] = instruction.substring(0, instruction.indexOf(getGate(instruction)[0])-1);
    arrayWires[1] = instruction.substring(instruction.indexOf(getGate(instruction)[0])+getGate(instruction)[0].length+1,instruction.indexOf(getGate(instruction)[0])+getGate(instruction)[0].length+3); 
    }
    return arrayWires;
}
// 4.5- Create a table of input
instructionsArray = tablemaker(instructions.length,4,'');
for (let i = 0; i < instructions.length; i++) {
    instructionsArray[i][0] = getCmdWires(instructions[i])[0];
    instructionsArray[i][1] = getGate(instructions[i])[1];
    instructionsArray[i][2] = getCmdWires(instructions[i])[1];
    instructionsArray[i][3] = getWire(instructions[i]);
    for (let j = 0; j < 4; j++) {
        switch (instructionsArray[i][j]) {
            case 'do':
                instructionsArray[i][j] = 'doo';
                break;
            case 'if':
                instructionsArray[i][j] = 'iff';
                break;
            case 'in':
                instructionsArray[i][j] = 'inn';
                break;
            case 'fs':
                instructionsArray[i][j] = 'fss';
                break;
            default:
                break;
        }
    }
    
    
}

// console.table(instructionsArray);

// 5- bitwise operations
partCounter =0;
function bitwise() {
    start: while (partCounter < 2) {       
        //declare & initialize variables
        for (let jj = 0; jj < instructions.length; jj++) {
            eval('global.' + instructionsArray[jj][3] + '=\'\' ;');
        }
        //bitwise operations
        //Run through table X times
        for (let index = 0; index < instructions.length; index++) {
            //1 table runthrough
            for (let iii = 0; iii < instructions.length; iii++) {
                switch (instructionsArray[iii][0]) {
                    case '': // not or direct assign (only 1 bit)
                        switch (instructionsArray[iii][1]) {
                            case '~':
                                eval(instructionsArray[iii][3] + " = " + instructionsArray[iii][1] + instructionsArray[iii][2] +';' );
                                break;
                        
                            default:
                                eval(instructionsArray[iii][3] + "=" + instructionsArray[iii][2] +';' );
                                break;
                        }
                        break;
                
                    default: //all bitwise operations with 2 bits
                        eval(instructionsArray[iii][3] + " = " + instructionsArray[iii][0] + instructionsArray[iii][1] + instructionsArray[iii][2] +';' );
                        break;
                }
            }
        }

        partCounter = partCounter +1    
        console.log(`\nPart ${partCounter} :`);

        //Part 2
        for (let i = 0; i < instructions.length; i++) { 
            switch (instructionsArray[i][3]) {
                case 'b':
                    instructionsArray[i][2] = a;
                    break;
            
                default:
                    break;
            }
        }
        console.log(a);
        
        continue start;
    }
    
}



console.log(bitwise());


