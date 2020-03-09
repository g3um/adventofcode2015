const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf-8', (input, err) => {
  if (err) {
    console.log(err);
  }
});

const instructions = input.split('\n');
const cmdArray = [];

const createGrid = fillWith =>
  [...Array(1000)].map(() => Array(1000).fill(fillWith));

var lightGrid1 = createGrid(false);
var lightGrid2 = createGrid(0);

const getInstructions = instruction => {
  if (instruction.substring(0, 7) === 'turn on') {
    return instruction.substring(0, 7);
  } else if (instruction.substring(0, 8) === 'turn off') {
    return instruction.substring(0, 8);
  } else {
    return instruction.substring(0, 6);
  }
};

// Massage data
for (let i = 0; i < instructions.length; i++) {
  let instruction = getInstructions(instructions[i]);
  let numbers = instructions[i].match(/\d+,\d+/g);
  const [left, top] = numbers[0].split(',');
  const [right, bottom] = numbers[1].split(',');
  cmdArray.push([
    instruction,
    parseInt(left),
    parseInt(top),
    parseInt(right),
    parseInt(bottom)
  ]);
}

const letThereBeLight = (instruction, l, t, r, b, part2 = false) => {
  let grid = part2 !== true ? lightGrid1 : lightGrid2;
  console.log(`${instruction} ${l},${t} through ${r},${b}.`);
  for (let x = l; x <= r; x++) {
    for (let y = t; y <= b; y++) {
      switch (instruction) {
        case 'turn on':
          grid[x][y] = part2 !== true ? true : grid[x][y] + 1;
          break;
        case 'turn off':
          grid[x][y] = part2 !== true ? false : Math.max(0, grid[x][y] - 1);
          break;
        case 'toggle':
          grid[x][y] = part2 !== true ? !grid[x][y] : grid[x][y] + 2;
          break;
        default:
          break;
      }
    }
  }
};

cmdArray.map((cmd) => {
  letThereBeLight(cmd[0], cmd[1], cmd[2], cmd[3], cmd[4]);
  letThereBeLight(cmd[0], cmd[1], cmd[2], cmd[3], cmd[4], true);
});

// Solution, part 1
let lightsOn1 = 0;
lightGrid1.map(lightRow => {
  lightsOn1 = lightsOn1 + lightRow.filter(Boolean).length;
});

// Solution, part 2
let lightsOn2 = 0;
lightGrid2.map(lightRow => {
  lightsOn2 = lightsOn2 + lightRow.reduce((a, b) => a + b, 0);
});

console.log(`\nPart 1 - After following the instructions, ${lightsOn1} are on.`);
console.log(`\nPart 2 - the total brightness of all lights combined after following Santa's instructions, is ${lightsOn2}.`);