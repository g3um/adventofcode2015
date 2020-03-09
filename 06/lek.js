const kalle = {
    height: 30,
    width: 30
}

const nisse = {
    ...kalle,
    depth: 10
}
console.log(nisse);

const addValues = (...ari) => {
    return ari * 10;
}

console.log(addValues(10, 20, 30));
