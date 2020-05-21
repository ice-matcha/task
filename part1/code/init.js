const arr = [1,2,3];

/*
const one = arr[0];
const two = arr[1];
const three = arr[2];
//const [one,two,three] = arr;
const [one,...three] = arr;
console.log(one,three);
*/

/*
const obj = {name: 'Doubi', age: 18};
const {name: objName} = obj;
console.log(objName);
*/

/*
const temple = `Hello Doubi!`;
console.log(temple);
*/

const one = {
    a: 123,
    b: 456
}

const two = {
    a: 789,
    c: 'abc'
}

let result = Object.assign(one, two);
console.log(result);