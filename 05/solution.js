const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });

let inputrow = input.split('\r\n');


function threevow(str) {
  let countvow = 0;
  for (let i = 0; i<str.length; i++) {
    if (str.substring(i, i+1) === 'a' || str.substring(i, i+1) === 'e' || str.substring(i, i+1) === 'i' || str.substring(i, i+1) === 'o' || str.substring(i, i+1) === 'u' ){
      countvow = countvow + 1;
    }
  }
return countvow >= 3;
}

function twice(str) {
  let counttwice = 0;
  for (let i = 1; i<str.length; i++) {
    if (str.substring(i-1, i) === str.substring(i , i+1)) {
      counttwice = counttwice + 1;
    }
  }
return counttwice >= 1;
}

function forb(str) {
  let countforb = 0;
  let teststr;
  for (let i = 1; i<str.length; i++) {
    teststr = str.substring(i-1, i).concat(str.substring(i , i+1));
    if (teststr === 'ab' || teststr === 'cd' || teststr === 'pq' || teststr === 'xy') {
      countforb = countforb + 1;
    }
  }
  return countforb >= 1;
}

function pair(str) {
  let countpair=0;
  let teststr;
  let movestr;
  for (let i = 1; i<str.length; i++) {
    teststr = str.substring(i-1, i+1);
    for (let j = i+1; j<str.length; j++) {
      movestr = str.substring(j, j+2);
      if (teststr === movestr) {
        countpair = countpair + 1;
      }
    }
  }
  return countpair >= 1;
}

function same(str) {
  let countsame=0;
  for (let i = 0; i<str.length-2; i++) {
    if (str.substring(i, i+1) === str.substring(i+2, i+3)) {
      countsame = countsame + 1;
    }
  }
  return countsame >= 1;
}

function nice() {
  let countnice = 0;
  for (let i = 0; i<inputrow.length; i++) {
      if (threevow(inputrow[i]) && twice(inputrow[i]) && !forb(inputrow[i])) {
      countnice = countnice +1;
    }
  }
  return countnice;
}

function nicepart2() {
  let countnice = 0;
  for (let i = 0; i<inputrow.length; i++) {
      if (pair(inputrow[i]) && same(inputrow[i])) {
      countnice = countnice +1;
    }
  }
  return countnice;
}

console.log(nicepart2());

