const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
  });

let size = 200;

let tempArr = new Array(size).fill(0);
const world = tempArr.map(currentRow => {
    return new Array(size).fill(0);
})


world[size*0.5-1][size*0.5-1]=2;

function isPositive(value) {
    return value > 0;
}



const mapWay = way => {
    let x = size*0.5-1;
    let y = size*0.5-1;
    for (let i = 0; i < way.length; i += 2) {
        if (way.substring(i , i+1) === '^' ) {
            y = 1*y+1;            
        } 
        if (way.substring(i , i+1) === 'v' ) {
            y = 1*y-1;            
        } 
        if (way.substring(i , i+1) === '>' ) {
            x = 1*x+1;            
        }  
        if (way.substring(i , i+1) === '<' ) {
            x = 1*x-1;            
        } 
        world[x][y] = world[x][y] +1;
    }
    x = size*0.5-1;
    y = size*0.5-1;
    for (let i = 1; i < way.length; i += 2) {
        if (way.substring(i , i+1) === '^' ) {
            y = 1*y+1;            
        } 
        if (way.substring(i , i+1) === 'v' ) {
            y = 1*y-1;            
        } 
        if (way.substring(i , i+1) === '>' ) {
            x = 1*x+1;            
        }  
        if (way.substring(i , i+1) === '<' ) {
            x = 1*x-1;            
        } 
        world[x][y] = world[x][y] +1;
    }
    // console.table(world);
    return world;
    
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





console.log(count(mapWay(input)));

