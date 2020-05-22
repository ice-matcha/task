# ECMAScript新特性

## ES2015

### let、const

let和const是ES6新增的命令,用于声明变量,与ES5的var不同的是:

1.块级作用域: 在 ES5 中只有全局作用域和函数作用域,没有块级作用域
2.不存在变量提升: 在 ES5 中，变量可以在声明之前使用,var 命令经常发生变量提升现象,ES6规定let 和 const 命令不发生变量提升
3.暂时性死区: 如果在代码块中存在 let 或 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域,所以在声明之前使用这些变量，会报错
4.不可重复声明: 在相同的作用域内,let 和 const 命令声明的变量不允许重复声明,var 允许重复定义
5.声明的全局变量不是全局对象的属性

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

### 展开数组

### 箭头函数

### Object

### Proxy

### Reflect

### Promise

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
