// Input management
const fs = require('fs');
const input = fs.readFileSync('input.json', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});

const jsonData = JSON.parse(input); // for part 2

const rows = input.split('\r\n'); // for part 1

const stringInput = input.replace(/\s/g,''); //not used


////////// PART 1 \\\\\\\\\\
// log all the numbers without parsing
const numbersCatcher = rows => {
    let numbers = [];
    let num, nIndex = 0;
    for (let i = 0; i < rows.length; i++) {
        num = rows[i].match(/\d+/g);
        nIndex = rows[i].indexOf(num);
        if (num !== null) {
            if ( rows[i].substring(nIndex-1, nIndex) === '-') { 
            numbers.push(-parseInt(num));    
            } else {
            numbers.push(parseInt(num));   
            }
        }   
    }
    return numbers;
}

// sum all numbers in array
const sumitup = array =>{
    let sum =0;
    for (let i = 0; i < array.length; i++) {
        sum = sum + array[i];
    }
    return sum;
}

console.log('Part 1:');console.log (sumitup(numbersCatcher(rows)));


////////// PART 2 \\\\\\\\\\

const isObjectWithRed =json => {
  if (json.constructor === Object) {
    for (key in json) {
      if (json[key] === 'red') {
        return true;
      }
    }
  }

  return false;

}

const sumNumbers = json => {
  let count = 0;
  if (!isObjectWithRed(json)) { // current item is not an object with red
    for (var key in json) { 
        if (typeof json[key] === "object") { // if object value is still object apply the function on the object
          count = count + sumNumbers(json[key]);
        } else if (typeof json[key] === "number") {
          count = count + json[key];
        }
      }
  }
  return count;
}
console.log('Part 2:');console.log(sumNumbers(jsonData));

