# JavaScript异步编程

## 同步与异步

无论是在浏览器端还是在服务器 ( Node ) 端，JS 的执行都是在单线程下进行的，同步指的是一次只能完成一个任务，如果有多个任务的时必须要排队，后面的任务必须要等待前面的任务完成才能执行，在这种单线程模式下执行的效率较低，任务耗时长，而异步就是为了解决这个问题的主要目的。
异步编程可以理解为在异步操作完成后所要做的任务，它们通常以回调函数或者 Promise 的形式被放入事件队列，再由事件循环 ( Event Loop ) 机制在每次轮询时检查异步操作是否完成，若完成则按事件队列里面的执行规则来依次执行相应的任务。

## 回调函数

回调函数，官方解释：当程序跑起来时，一般情况下，应用程序（application program）会时常通过API调用库里所预先备好的函数。但是有些库函数（library function）却要求应用先传给它一个函数，好在合适的时候调用，以完成目标任务。这个被传入的、后又被调用的函数就称为回调函数（callback function）。

**基础例子**

```javascript
function foo (callback) {
	setTimeout(function () {
		callback();
	}, 1000)
}

foo(function () {
	console.log('这就是一个回调函数');
	console.log('调用者定义这个函数，执行者执行这个函数');
	console.log('其实就是调用者告诉执行者异步任务结束后应该做什么');
})
```

## [Promise](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Promise#%E6%8F%8F%E8%BF%B0)

Promise 对象是一个代理对象（代理一个值），被代理的值在Promise对象创建时可能是未知的。它允许你为异步操作的成功和失败分别绑定相应的处理方法（handlers）。 这让异步方法可以像同步方法那样返回值，但并不是立即返回最终执行结果，而是一个能代表未来出现的结果的promise对象

一个 Promise有以下几种状态:

* pending: 初始状态，既不是成功，也不是失败状态。
* fulfilled: 意味着操作成功完成。
* rejected: 意味着操作失败。

pending 状态的 Promise 对象可能会变为fulfilled 状态并传递一个值给相应的状态处理方法，也可能变为失败状态(rejected)并传递失败信息。当其中任一种情况出现时，Promise 对象的 then 方法绑定的处理方法(handlers) 就会被调用(then方法包含两个参数：onfulfilled 和 onrejected，它们都是 Function 类型。当Promise状态为fulfilled时，调用 then 的 onfulfilled 方法，当Promise状态为rejected时，调用 then 的 onrejected 方法， 所以在异步操作的完成和绑定处理方法之间不存在竞争)。

### 基础用法

```javascript
const p = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('test');
  }, 300);
});

p.then((value) => {
  console.log(value);
});
```

### 链式调用

连续执行两个或者多个异步操作是一个常见的需求，在上一个操作执行成功之后，开始下一个的操作，并带着上一步操作所返回的结果。可以通过创造一个 Promise 链来实现这种需求。

```javascript
new Promise((resolve, reject) => {
	resolve();
}).then(() => {
	console.log("first then");
}).then( () => {
	console.log("second then");
}).then( () => {
	console.log("third then");
});
```

### 异常处理

有可能会在一个回调失败之后继续使用链式操作，即 使用 catch 可以捕抓到链式操作中抛出的异常。

```javascript
new Promise((resolve, reject) => {
	resolve();
}).then(() => {
	console.log("first then");
}).then( () => {
	throw new Error("Test Error");
}).catch( (error) => {
	console.log(error);
});
```

## Generator

生成器对象是由一个 generator function 返回的。

```javascript
function* gen() { 
  yield 1;
  yield 2;
  yield 3;
}

let g = gen(); 
console.log(g.next());
console.log(g.next());
console.log(g.next());
console.log(g.next());
```

## Async

```javascript
function run () {
	console.log("running");
}

function eat () {
	console.log('eatting');
}

async function main () {
  try {
    await run();

    await eat();

  } catch (e) {
    console.log(e)
  }
}

main();
```