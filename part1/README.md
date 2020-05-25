# 简答题

## 1.下列代码的执行结果为10

```javascript
var a = [];
for(var i = 0; i < 10; i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6](); // 10
```
**解析:**
在ES6之前JS中没有块级作用域的概念，上面代码中for循环的var声明实际上是一个window全局变量。所以在执行 ```a[i]()``` 时调用了 i 这个变量，但在这函数作用域内没有定义i，于是向上查找全局变量i，在for循环体中每次循环都会修改全局变量i的值，直到循环体结束时，i的为10，所以调用 ```a[6]()```所打印的结果为: 10

## 2.下列代码执行的结果会报错，错误提示:"Uncaught ReferenceError: Cannot access 'temp' before initialization"

```javascript
var temp = 123;
if(true){
	console.log(temp);
	let temp;
}
//Uncaught ReferenceError: Cannot access 'temp' before initialization
```

**解析:**
在if的代码块中声明了变量 let temp; 此时if代码块的作用域内与temp变量形成了绑定关系，而let声明的变量不能在声明之前调用，所以上面代码的执行结果会报错:"Uncaught ReferenceError: Cannot access 'temp' before initialization"

## 3.找出数组中的最小值

```javascript
let arr = [12, 34, 32, 89, 4];
let min = arr.reduce((a, b) =>{
	return b < a ? b : a;
});

console.log(min); // 4
```

## 4.var、let和const的区别

**var与let/const的区别**

1. 块级作用域: 在 ES5 中只有全局作用域和函数作用域,没有块级作用域
2. 不存在变量提升: 在 ES5 中，变量可以在声明之前使用,var 命令经常发生变量提升现象,ES6规定let 和 const 命令不发生变量提升
3. 暂时性死区: 如果在代码块中存在 let 或 const 命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域,所以在声明之前使用这些变量，会报错
4. 不可重复声明: 在相同的作用域内,let 和 const 命令声明的变量不允许重复声明,var 允许重复定义
5. 声明的全局变量不是全局对象的属性

**let与const的区别**

* let声明可以没有初始值，变量声明后可以修改
* const声明必须要有初始值，变量一旦声明就不允许修修改

## 5.下列代码的执行结果为:20

```javascript
var a = 10;
var obj = {
	a: 20,
	fn () {
		setTimeout(() => {
			console.log(this.a);
		},1000);
	}
}

obj.fn();	//20
```

**解析:**
this最终指向的是调用它的对象，上面代码中的fn是通过obj.fn()调用的，此时this指向的是对象obj

## 6.Symbol类型的用途

symbol 是一种基本数据类型 （primitive data type）。Symbol()函数会返回symbol类型的值，该类型具有静态属性和静态方法。它的静态属性会暴露几个内建的成员对象；它的静态方法会暴露全局的symbol注册，且类似于内建对象类，但作为构造函数来说它并不完整，因为它不支持语法："new Symbol()"。
每个从Symbol()返回的symbol值都是唯一的。一般将symbol值能作为对象属性的标识符。

## 7.深、浅拷贝

**浅拷贝**

将 原对象/原数组 的引用,直接赋给 新对象/新数组，新 对象/数组 只是 原对象/数组 的一个引用(可以理解为:传址)。

**深拷贝**

是指建一个新的 对象/数组，将 原对象的各项属性的值/原数组的所有元素 拷贝过来，在改变新的 数组/对象 时，不会改变 原数组/对象(可以理解为:传值)。

## 8.js异步编程、Event Loop、宏任务和为任务

**js异步编程**

无论是在浏览器端还是在服务器 ( Node ) 端，JS 的执行都是在单线程下进行的，也就是指一次只能完成一个任务，如果有多个任务的时必须要排队，后面的任务必须要等待前面的任务完成才能执行，在这种单线程模式下执行的效率较低，任务耗时长，而异步就是为了解决这个问题的主要目的。
异步编程(待补充...)


## 9.Promise改进后的代码

```javascript
```

## 10.TypeScript和JavaScript的区别

## 11.TypeScript的优缺点