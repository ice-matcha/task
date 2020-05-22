# ECMAScript新特性

## ES2015

### let、const

let和const是ES6新增的命令,用于声明变量,与ES5的var不同的是:

1. 块级作用域: 在 ES5 中只有全局作用域和函数作用域,没有块级作用域
2. 不存在变量提升: 在 ES5 中，变量可以在声明之前使用,var 命令经常发生变量提升现象,ES6规定let 和 const 命令不发生变量提升
3. 暂时性死区: 如果在代码块中存在 let 或 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域,所以在声明之前使用这些变量，会报错
4. 不可重复声明: 在相同的作用域内,let 和 const 命令声明的变量不允许重复声明,var 允许重复定义
5. 声明的全局变量不是全局对象的属性

**注意**

const 声明的是只读常量,一旦声明,必须立即初始化,且声明之后值不能改变

### 数组、对象解构

**数组解构:**

基本用法:

```javascript
let colors = ['red', 'green', 'blue'];
let [firstColor, secondColor] = colors;
console.log(firstColor, secondColor); // red green
```
获取固定位置的元素:

```javascript
let colors = ['red', 'green', 'blue'];
let [, , thirdColor] = colors;
console.log(thirdColor); // blue
```
使用默认值:

```javascript
let colors = ['red'];
let [firstColor, secondColor = 'undefined'] = colors;
console.log(firstColor, secondColor); // red undefined
```
**对象解构:**

基础用法:

```javascript
let obj = {
	name: 'Doubi',
	age: 18
};
let { name, age } = obj;

console.log(name, age); // Doubi 18
```
不按顺序解构(与数组解构和对象解构的区别之一):

```javascript
let obj = {
	name: 'Doubi',
	age: 18
};
let { age, name } = obj;

console.log(name, age); // Doubi 18
```
解构对象重命名:
```javascript
let obj = {
	name: 'Doubi',
	age: 18
};
let { name: newName, age } = obj;

console.log(newName, age); // Doubi 18
```
使用默认值:

```javascript
let obj = {
	name: 'Doubi',
	age: 18
};
let { name, sex="boy" } = obj;

console.log(name, sex); // Doubi boy
```

### 模板字符串

模板字符串是ES6中非常重要的一个新特性，这个特性使得处理相关业务变得更加容易。如在处理嵌入表达式、多行字符串、字符串中插入变量、字符串格式化等方面的应用,一下是基础示例:

```javascript
let name = 'Doubi';
let str = `Hello ${name}`;
console.log(str);	// Hello Doubi
```
表达式:

```javascript
let a = 10;
let b = 8;
let c = "Javascript";
let str = `My age is ${a+b} and I love ${c}`
console.log(str);	// My age is 18 and I love Javascript
```
标签模板字符串:

```javascript
// 带标签的模板字符串
// 模板字符串的标签就是一个特殊的函数，
// 使用这个标签就是调用这个函数

function testTag (strings, name, gender) {
  let sex = gender ? 'man' : 'woman';
  return strings[0] + name + strings[1] + sex + strings[2];
}

let name = 'Doubi';
let gender = true;
let result = testTag`hey, ${name} is a ${gender}.`;
console.log(result);	//hey, Doubi is a man.
```

### 字符串拓扩展方法

startsWith() 字符串中是否以某段字符串开头
endsWith() 字符串中是否以某段字符串结尾
includes() 字符串中是否包含某段字符串

```javascript
let str = 'Error: foo is not defined.';

console.log(str.startsWith('Error'));	//true
console.log(str.endsWith('.'));			//true
console.log(str.includes('foo'));		//true
````

### 展开语法

展开语法(Spread syntax), 可以在函数调用/数组构造时, 将数组表达式或者string在语法层面展开；还可以在构造字面量对象时, 将对象表达式按key-value的方式展开。示例:

```javascript
function sum(x, y, z) {
  return x + y + z;
}

const numbers = [1, 2, 3];
console.log(sum(...numbers)); //6
```

### 箭头函数

箭头函数表达式的语法比函数表达式更简洁,它适用于那些本来需要匿名函数的地方,箭头函数没有 this,，它只会从自己的作用域链的上一层继承this, 使用示例:

```javascript
let arr = [1,2,3];
arr.map((item) => {
	console.log(item);	//1,2,3
})
```

### Object(新增方法)

Object.preventExtensions(obj)  让一个对象变的不可扩展，也就是永远不能再添加新的属性。
Object.isExtensible(obj) 判断一个对象是否是可扩展的
Object.seal(obj) 让一个对象密封(只能读写 不能新增)
Object.isSealed(obj) 判断一个对象是否密封
Object.isFrozen(arr)  让一个对象被冻结(只能读)
Object.isFrozen(obj) 判断一个对象是否被冻结
Object.keys(obj) 返回一个由给定对象的所有可枚举自身属性的属性名组成的数组
Object.getOwnPropertyNames(obj) 返回一个由指定对象的所有自身属性的属性名（包括不可枚举属性）组成的数组
Object.is(value1, value2) 判断两个值是否是同一个值。
Object.create(proto [, propertiesObject ]) 是E5中提出的一种新的对象创建方式，第一个参数是要继承的原型，如果不是一个子函数，可以传一个null，第二个参数是对象的属性描述符，这个参数是可选的。
Object.assign 把任意多个的源对象自身的可枚举属性拷贝给目标对象，然后返回目标对象。
Object.defineProperty() 定义单个对象属性或方法(可以设置读写可枚举)
Object.defineProperties() 定义多个对象属性或方法(可以设置读写可枚举)

### Proxy

### Reflect

### Promise
(待补充...)

### class类

### Set、Map

### Symbol

### for...of循环

### 可迭代接口

### 生成器

### Modules

## ES2016

## ES2017

## ES2018
