const fp = require("lodash/fp");

/**
 * 代码1
 */
// horsepower马力, dollar_value价格,in_stock库存
const cars = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-s", horsepower:550, dollar_value: 132000, in_stock:false},
    {name: "Audi R8",horsepower: 525,dollar_value: 114200, in_stock: false},
    {name :"Aston Martin One-77",horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower:700, dollar_value: 1300000, in_stock:false}
];


//练习1
const getLastCart = cars => fp.last(cars);
const getInStock = car => fp.prop("in_stock", car);
let isLastInStock = fp.flowRight([getInStock,getLastCart]);
console.log(isLastInStock(cars));


//练习2
const getFirstCart = cars => fp.first(cars);
const getCarName = car => fp.prop("name", car);
let getFirstCarName = fp.flowRight([getCarName,getFirstCart]);
console.log(getFirstCarName(cars));

//练习3
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
}

let get_dollar_list = (cars) => {
    return fp.map(car => car.dollar_value, cars);
}

let averageDollarValue = fp.flowRight([_average,get_dollar_list]);

console.log(averageDollarValue(cars));



//练习4
let _underscore = fp.replace(/\W+/g, '_');

let strToLowerCase = (str) => str.toLowerCase();

let sanitizeNames = fp.map(fp.flowRight([_underscore, strToLowerCase]));

let str = ["Hello World"];

console.log(sanitizeNames(str));