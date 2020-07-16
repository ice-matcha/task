### 什么是Virtual DOM

Virtual DOM(虚拟DOM)，是由普通的JS对象来描述DOM对象，因为不是真实的DOM对象，所以叫Virtual DOM。

### 为什么要使用虚拟DOM

- 手动操作DOM比较麻烦，还需要考虑浏览器兼容性问题，DOM的操作复杂度随着项目的复杂度增大而增大

- 为了简化DOM的复杂操作，于是出现了各种MVVM框架，MVVM框架解决了视图和状态的同步问题

- 为了简化视图的操作可以使用模板引擎，但模板引擎没有解决跟踪状态变化的问题，于是Virtual DOM出现了

- Virtual DOM的好处是当状态发生变化时不需要立即更新DOM，只需要创建一个虚拟树来描述DOM，Virtual DOM内部将会有效地(diff算法)更新DOM

- 参考github上[virtual-dom](https://github.com/Matt-Esch/virtual-dom)的描述：

  +	虚拟DOM可以维护程序的状态，跟踪上一次的状态
+	通过比较前后两次状态的差异更新真实的DOM

### 虚拟DOM的操作和虚拟DOM库

**作用：**

- 维护视图和状态的关系
- 复杂视图情况下提升渲染性能
- 除了渲染DOM，还可以实现SSR、原生应用、小程序等

**Virtual DOM库：**

- [virtual-dom](https://github.com/Matt-Esch/virtual-dom)
- [snabbdom](https://github.com/snabbdom/snabbdom) Vue2.x内部使用的Virtual DOM就是改造的Snabbdom，最快的Virtual DOM之一

### 代码演示

(待补链接)