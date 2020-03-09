const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });

const count = way => {
    let up= 0
    let down =0
    for (let i = 0; i < way.length; i++) {
        if (way.substring(i , i+1 ) === '(' ) {
            up = up+1;            
        } 
        else {
            down = down+1;
        }
        total = up-down;
        if (total === -1) {
            return i+1
        }   
    }
    total = up-down;
    return total;
}

console.log(count(input));


