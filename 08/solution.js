const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});

// Input management
const strings = input.split('\r\n');

//Calculate code length



//Part 1
const stringent = strings => {
    let answer = 0;
    for (let i = 0; i < strings.length; i++) {
        //Code characters
        codeLength = strings[i].length;
        // console.log(codeLength);
        stringLength = eval(strings[i]).length;
        // console.log(stringLength);
        answer = answer + codeLength - stringLength;
    }
    console.log(`\nPart 1: ${answer}`);
}
stringent(strings);

//Part 2
const countSpecialChar = strings => {
    let sum =0;
    for (let i = 0; i < strings.length; i++) {
        let specialCharCount =0;
        for (let j = 0; j < strings[i].length; j++) {
            if(strings[i].substring(j, j+1) === '\"' || strings[i].substring(j, j+1) === '\\') {
                specialCharCount = specialCharCount + 1;
            }
        }
        sum = sum + specialCharCount + 2;
    }
    console.log(`\nPart 2: ${sum}`);
}
countSpecialChar(strings);