const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });

let size = 1000;

let tempArr = new Array(size).fill(false);
const world = tempArr.map(currentRow => {
    return new Array(size).fill(false);
})
// console.table(world);

let inputArray = input.split('\r\n');

function getaction(str) {
    if (str.substring(0, 2) === 'to') {
        return "tog"
    }
    if (str.substring(0, 7) === 'turn on') {
        return "on"
    }
    if (str.substring(0, 7) === 'turn of') {
        return "off"
    }
}

function getnum(dimrow,x) {
    let left,top,right,bottom;
    [left , top , right, bottom] = dimrow.match(/\d+/g);
    if (x === 'l') {
        return left;
    }
    if (x === 't') {
        return top;
    }
    if (x === 'r') {
        return right;
    }
    if (x === 'b') {
        return bottom;
    }
}

function isPositive(value) {
    return value > 0;
}



const count = Arr => {
    let counter = 0;
    for (let i = 0; i < Arr.length; i++) {
        for (let j = 0; j<Arr.length; j++) {
            if (isPositive(Arr[i][j])) {
                counter = counter + 1;
            }
        }     
    }
    return counter;
}

let lightsOn = 0;
function light() {
    for (let i = 0; i<inputArray.length; i++) {
        let l = getnum(inputArray[i],'l');
        let t = getnum(inputArray[i],'t');
        let r = getnum(inputArray[i],'r');
        let b = getnum(inputArray[i],'b');

            console.log(`\n raw row: ${inputArray[i]}, action: ${getaction(inputArray[i])}, numbers:${l}, ${t}, ${r}, ${b}  `);
            for (let j = l; j<=r; j++) {
                for (let k = t; k<=b; k++) {
                    if (getaction(inputArray[i]) === "on") {
                        world[j][k] = true;
                    }
                    if (getaction(inputArray[i]) === "off") {
                        world[j][k] = false;
                    }
                    if (getaction(inputArray[i]) === "tog") {
                        world[j][k] = !world[j][k];
                    }
                }
            }
    }
//   console.table(world);
//   console.log(count(world));
world.map(lightRow => {
    lightsOn = lightsOn + lightRow.filter(Boolean).length;
    });
console.log(lightsOn);
} 



console.log(light());






        // if (getaction(inputArray[i]) === "on") {
        // }
 
        // if (getaction(inputArray[i]) === "off") {
        //     for (let j = sri; j<=eri; j++) {
        //         for (let k = sci; k<=eci; k++) {
        //             world[j][k]=0;
        //         }
        //     }
        // }     
        
        // if (getaction(inputArray[i]) === "tog") {
        //     for (let j = sri; j<=eri; j++) {
        //         for (let k = sci; k<=eci; k++) {
        //             // console.log(`\ntog before: ${world[j][k]} `);
        //             world[j][k] = 1 - world[j][k];
        //             // console.log(`\ntog after: ${world[j][k]} `);
        //         }
        //     }
        // }   