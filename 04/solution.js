const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });

const crypto = require('crypto');





function hashtest(hashstring) {
  return hashstring.substring(0 , 6) === '000000';
}

let key=0;
let data;
let hash;

do {
  data = input.concat(key);
  hash = crypto.createHash('md5').update(data).digest('hex');
  key = key + 1;
} 
while(hashtest(hash) !== true);

console.log(key-1);


