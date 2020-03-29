const fs = require('fs');
const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
    if (err) {
      console.log(err);
    }
});




const lookandsay = (string,times) => {
    let counter = 1;
    let result = "";
    let tempString = string;
    for (j=0; j < times; j++) {
        for (let i = 0; i < tempString.length; i++) {
            if(tempString.substring(i, i+1) === tempString.substring(i+1, i+2)) {
                counter = counter +1;
            } else {
                result = result.concat(counter.toString(), tempString.substring(i, i+1));
                counter =1;
            }
        }
        tempString = result;
        result ="";
    }
    // console.log(tempString);
    part1 = tempString.length;
    console.log(part1);
}


lookandsay(input,50);



// Write output in file
// fs.writeFile("output.txt", lookandsay(input,40), function(err) {
//     if(err) {
//         return console.log(err);
//     }
//     console.log("The file was saved!");
// }); 
