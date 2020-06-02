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

* 分为标记和整理两个阶段
* 标记阶段的操作和标记清除一致
* 清除阶段会先执行整理，移动对象的位置

**优点:**

* 减少碎片化空间

**缺点:**

* 不会立即回收垃圾对象
* 移动对象需要消耗一定的时间，回收效率慢
       
## 3. 描述V8中新生代存储区垃圾回收的流程

1. 从 From 空间分配对象，若 semispace 被分配满，则执行 Scavenge 算法进行垃圾回收。
2. 检查 From 空间的存活对象，若对象存活，则检查对象是否符合晋升条件，若符合条件则晋升到老生代，否则将对象从 From 空间复制到 To 空间。
3. 若对象不存活，则释放不存活对象的空间。
4. 完成复制后，将 From 空间与 To 空间进行角色翻转（flip）。

## 4. 描述增量标记算法在何时使用及工作原理

晋升条件:

1. 在垃圾回收的过程中，如果发现某个对象之前被清理过，那么会将其晋升到老生代内存空间中
2. 在 From 空间和 To 空间进行反转的过程中，如果 To 空间中的使用量已经超过了 25%，那么就将 From 中的对象直接晋升到老生代内存空间中

工作原理:

GC触发标记清除回收时，程序会暂停，标记清除算法一口气标记全部活动对象，相对耗时太久。
增量标记将标记过程根据直接可达对象和间接可达对象(例如obj.foo和obj.foo.bar)，将一整个过程拆分成多个小过程，每个过程指标记一层可达对象，标记完继续执行程序，然后再执行下个标记小过程。
这样对用户来说，程序执行更连贯。

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