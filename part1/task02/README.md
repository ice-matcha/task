## 1. 描述引用计数的工作原理和优缺点

**工作原理：**

* 核心思想: 设置引用数，判断当前引用数是否为0
* 引用计数器
* 引用关系改变时修改引用数字
* 引用数字为0时立即回收

**优点：**

* 发现垃圾立即回收，
* 最大限度减少程序暂停

**缺点：**

* 无法回收循环引用的对象
* 时间开销大

## 2. 描述标记整理算法的工作流程

       
## 3. 描述V8中新生代存储区垃圾回收的流程


## 4. 描述增量标记算法在何时使用及工作原理


## 代码1

```javascript
const fp = require("lodash/fp");

const cars = [
    {name: "Ferrari FF", horsepower: 660, dollar_value: 700000, in_stock: true},
    {name: "Spyker C12 Zagato", horsepower: 650, dollar_value: 648000, in_stock: false},
    {name: "Jaguar XKR-s", horsepower:550, dollar_value: 132000, in_stock:false},
    {name: "Audi R8",horsepower: 525,dollar_value: 114200, in_stock: false},
    {name :"Aston Martin One-77",horsepower: 750, dollar_value: 1850000, in_stock: true},
    {name: "Pagani Huayra", horsepower:700, dollar_value: 1300000, in_stock:false}
];
```

### 练习1

```javascript
const getLastCart = cars => fp.last(cars);
const getInStock = car => fp.prop("in_stock", car);
let isLastInStock = fp.flowRight([getInStock,getLastCart]);
console.log(isLastInStock(cars));
```

### 练习2

```javascript
const getFirstCart = cars => fp.first(cars);
const getCarName = car => fp.prop("name", car);
let getFirstCarName = fp.flowRight([getCarName,getFirstCart]);
console.log(getFirstCarName(cars));
```

### 练习3

```javascript
let _average = function(xs) {
    return fp.reduce(fp.add, 0, xs) / xs.length;
}

let get_dollar_list = (cars) => {
    return fp.map(car => car.dollar_value, cars);
}

let averageDollarValue = fp.flowRight([_average,get_dollar_list]);

console.log(averageDollarValue(cars));
```

### 练习4

```javascript
let _underscore = fp.replace(/\W+/g, '_');

let strToLowerCase = (str) => str.toLowerCase();

let sanitizeNames = fp.map(fp.flowRight([_underscore, strToLowerCase]));

let str = ["Hello World"];

console.log(sanitizeNames(str));
```

## 代码2

### 练习1

```javascript
let maybe = Maybe.of([5,6,1]);
let ex1 = (functor, num) => {
    return functor.map(fp.map(fp.add(num)));
}
console.log(ex1(maybe, 1));
```

### 练习2

```javascript
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = (functor) => {
    return functor.map(fp.first)._value;
};
console.log(ex2(xs));
```

### 练习3

```javascript
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
});

let user = {id:2, name:'Albert'};
let ex3 = (data, title) => safeProp(title,data).map(fp.first)._value;
console.log(ex3(user,"name"));
```

### 练习4

```javascript
let ex4 = n => Maybe.of(n || undefined).map(n => parseInt(n))._value;
```