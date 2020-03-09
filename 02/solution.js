const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });


function getnum(dimrow,x) {
    let l,w,h;
    [l , w , h] = dimrow.match(/\d+/g);
    if (x === 'l') {
        return l;
    }
    if (x === 'w') {
        return w;
    }
    if (x === 'h') {
        return h;
    }
}
let inputArray = input.split('\r\n');

function minsurf(x,y,z) {
    return Math.min(2*(1*x+1*y),2*(1*y+1*z),2*(1*x+1*z));
}


function surface() {
    let wrap = 0;
    let rib = 0;
    
    for (let i = 0; i<inputArray.length; i++) {
        let li = getnum(inputArray[i],'l');
        let wi = getnum(inputArray[i],'w');
        let hi = getnum(inputArray[i],'h');
        wrap = wrap + 2*li*wi + 2*wi*hi + 2*hi*li + Math.min(li*wi,wi*hi,hi*li);
        rib = rib + minsurf(li,wi,hi) + li * wi * hi;
    }
    // return wrap;
    return rib;
}       


console.log(surface());
