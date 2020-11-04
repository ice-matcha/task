# 做虐

### 1、Vue 3.0 性能提升主要是通过哪几方面体现的？

**(1)、响应式系统升级：**

- Vue.js 2.x 中响应式系统的核心 defineProperty，初始化时会递归遍历所有的属性，转化为getter、setter
- Vue.js 3.0 中使用 Proxy 对象重写响应式系统
  - 可以监听动态新增的属性
  - 可以监听删除的属性
  - 可以监听数组的索引和 length 属性

**(2)、编译优化：**

- Vue.js 2.x 中通过标记静态根节点，优化 diff 的过程
- Vue.js 3.0 中标记和提升所有的静态节点，diff 的时候只需要对比动态节点内容
  - Vue.js 2.x 中无论元素是否参与更新, 每次都会重新创建, 然后再渲染
  - Vue.js 3.0 中对于不参与更新的元素, 会做静态提升, 只会被创建一次, 在渲染时直接复用即可

**(3)、源码体积优化：**

- Vue.js 3.0中移除了一些不常用的API
- Tree-shaking
- Vue.js 3.0源码使用 TS重写，对 TS有更好的支持



### 2、Vue 3.0 所采用的 Composition Api 与 Vue 2.x使用的Options Api 有什么区别？

- Options API

  - 需要将数据的操作挂载到特定的属性上(如：data、methods、props等)
  - Options API 开发复杂组件，同一个功能逻辑的代码被拆分到不同选项

- Composition API

  - Vue.js 3.0 新增的一组基于函数的API，按需引入方法来处理数据
  - 可以更灵活的组织代码的逻辑、结构、提取公共内容
  - 更好的类型推导，容易结合TypeScript

  

### 3、Proxy 相对于 Object.defineProperty 有哪些优点？

- 可监听动态新增的属性
- 可监听数组的变化
- 可以监听删除的属性
- Proxy返回一个新对象，可只操作新对象达到目的，而Object.defineProperty只能遍历对象属性直接修改
- 多层属性嵌套，在访问属性过程中处理下一级属性

### 4、Vue 3.0 在编译方面有哪些优化？

- 利用Vite 可以在开发模式下不需要打包可以直接运行
- Vue.js 2.x中通过标记静态根节点，优化diff的过程
- Vue.js 3.0 中对于不参与更新的元素, 会做静态提升, 只会被创建一次, 在渲染时直接复用即可

### 5、Vue.js 3.0 响应式系统的实现原理？

Vue 3.0使用ES 6的Proxy取代Object.defineProperty方法，性能更为优异，而且数组和对象一样，可以直接触发get和set方法。Proxy称为代理，是一种可以拦截并改变底层JavaScript引擎操作的包装器。

在属性的get方法中调用track方法收集依赖，track方法内部先检查是否有正在收集依赖的监听事件activeEffect，没有就直接返回。然后去检查该对象是不是已经在WeakMap中；如不在，则会先在WeakMap中创建一个该对象的位置，指向一个存放属性的Map，然后去WeakMap中找到该对象对应的Map，再在这个对象的Map中找到这个属性的监听事件集合Set，如果不存在Set就会先创建一个，然后将正在收集依赖的监听事件activeEffect加入到这个属性的事件集合Set中。

在属性的set方法、deleteProperty方法中调用trigger方法触发更新，trigger会先去WeakMap中查找这个对象的存放属性的Map，找不到则直接返回，如果找到这个对象的Map，再去Map中找这个属性的监听事件集合Set，如果找到，则会循环执行该属性的监听事件集合Set里的每一个事件监听函数activeEffect，执行更新。如果找不到Set则会直接返回。