const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});




let alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

// Decimal to base 26
const decto26 = number => {
    let temp = number;
    let rest = 0;
    let array = [];
    let quotient= 0;
    do {
        quotient= parseInt(temp/26);
        rest = temp - quotient*26;
        array.push(rest);
        temp = quotient;
    } while (quotient !== 0); 
    let l = array.length;
    for (let i = 0; i < (8 - l); i++) {
        array.push(0);
    }
    return array.reverse();
}

// Base 26 to Decimal
const n26todec = array =>{
    let dec =0;
    for (let i = 0; i < array.length; i++) {
        dec = dec + Math.pow(26,7-i)*array[i];
    }
    return dec;
}

// Base 26 to string
const stringify = array => {
    let letters = [];
    for (let i = 0; i < array.length; i++) {
        letters[i] = alphabet [array[i]];
    }
    return letters;
}

// Incrementing
const increment = array => {
    let incrementedDec = n26todec(array) + 1;
    return decto26(incrementedDec);
}


//RULE 1: Increasing straight of 3 letters (with number base 26)
const straightN = array => {
    for (let i = 0; i < array.length-2; i++) {
        if ( ( array[i+1] === (array[i]+1) ) && ( array[i+2] === (array[i+1]+1) ) ) {
            return true;
        }
    }
    return false;
}

//RULE 2: no i(8) , no l(11), no o(14)
const forbid = array => {
    for (let i = 0; i < array.length; i++) {
        switch (array[i]) {
            case 8:
                do {
                    array = increment(array);
                } while (array[i] === 8);
                break;
            case 11:
                do {
                    array = increment(array);
                } while (array[i] === 11);
                break;
            case 14:
                do {
                    array = increment(array);
                } while (array[i] === 14);
                break;
            default:
                break;
        } 
    }
    return array;
}

//RULE 3: 2 pairs
const doubles = array =>{
    let count = 0;
    for (let i = 1; i < array.length; i++) {
        if ( array[i] === array[i-1]) {
            count = count + 1;
            i = i+1;
        }
    }
    switch (count) {
        case 2:
            return true;    
        default:
            return false; 
    }
}



const machinery = string => {
    let tempString = string;
    let lindex =[];   
    // Create Array where items are index of password letters in alphabet
    for (let i = 0; i < string.length; i++) {
        lindex.push(alphabet.indexOf(tempString.substring(i,i+1)));
    }
    
    // Keep incrementing while rules are not followed
    let temp26 = lindex;
    do {
        temp26 = forbid(temp26);
        temp26 = increment(temp26);
    } while ( (straightN(temp26) === false) || (doubles(temp26) === false) );
    
    tempString = stringify(temp26);

    console.log(tempString);
}


machinery(input);




//// Unused but working functions created while exploring solution \\\\

// Replace a character
const replacer = (string, oldCharPosition, newChar) => {
    return string.substring(0,oldCharPosition) + newChar + string.substring(oldCharPosition+1,string.length)
}

//RULE 1: Increasing straight of 3 letters (not used)
const straightL = string => {
    for (let i = 0; i < string.length-2; i++) {
        Lett1 = string.substring(i,i+1);
        Lett2 = string.substring(i+1,i+2);
        Lett3 = string.substring(i+2,i+3);
        indexL1 = alphabet.indexOf(Lett1);
        indexL2 = alphabet.indexOf(Lett2);
        indexL3 = alphabet.indexOf(Lett3);
        if ( ( indexL2 === (indexL1+1) ) && ( indexL3 === (indexL2+1) ) ) {
            return true;
        }
    }
    return false;
}