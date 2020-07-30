### 1、请简述 `Vue` 首次渲染的过程。

先初始化`Vue`的实例成员以及静态成员（`Vue`初始化）。

接着在构造函数中调用`this._init()`方法，`this._init()`主要做了以下操作：

- 合并options，先判断当前`Vue`实例是否是组件，如果是组件则执行`initInternalComponent()`方法，如果不是则调用`mergeOptions()`方法合并options。
- 执行`vm`的生命周期相关变量、事件的监听和编译render的初始化，初始化  _data、 _props、watch、computed、methods等操作。
- 检测是否有el属性，如果有，调用`this.$mount()`方法。

在`_init()`中调用了`this.$mount()`,此时的`$mount()`方法是`src/platforms/web/entry-runtime-with-compiler.js`文件中的`$mount()`，该方法的核心是将模板编译成render函数，它会先判断是否传入`render`，如果没有的话就去获取`template`选项，如果`template`选项也不存在，它会将el中的内容作为模板，然后由`compileToFunctions()`方法将模板转换为render函数后存储在`options.render`中。

接着调用`src/platforms/web/runtime/index.js`中的`$mount()`方法，它会检查运行环境，如果是运行时版本，则会重新获取 el 。

接着调用`src/core/instance/lifecycle.js`文件中的 `mountComponent()`方法，该方法主要有一下几步：

- 将el存至`vm.el`属性中(`vm.el = el`)
- 判断是否有render选项，如果没有但传入了模板，并且是开发环境的情况下会发出警告
- 触发生命周期中的钩子函数`beforeMount`
- 定义了`updateComponent()`方法，在该方法中定义了`_render` 和 `_update`，其中 `_render `的作用是生成虚拟DOM，`_update`的作用是将虚拟DOM转换为真实DOM，并挂载到页面上。
- 实例化`Watcher`对象，实例化过程中传入`updateComponent`函数并且在`Watcher`内部中调用，

在实例化watcher时，会调用`updateComponent`方法执行一次渲染。

然后触发了生命周期的钩子函数`mounted`,挂载结束，最终返回`Vue`实例。



### 2、请简述 `Vue` 响应式原理。

Vue的响应式是从`init()`方法中开始的，`init()`方法中先调用`initState()`初始化Vue实例的状态，在`initState`方法中调用了`initData()`， `initData()`是把`data`属性注入到Vue实例上，并且调用`observe(data)`将`data`对象转化成响应式的对象。

在`observe(value)`中，先判断传入的参数`value`是否是对象，如果不是对象直接返回。再判断`value`对象是否有`__ob__`这个属性，如果有说明做过了响应式处理，则直接返回，如果没有，创建`observer`对象，并且返回`observer`对象。

在创建observer对象时，给value对象定义不可枚举的`__ob__`属性，记录当前的`observer`对象，然后再进行数组的响应式处理和对象的响应式处理，数组的响应式处理就是拦截数组的几个特殊的方法，`push`、`pop`、`shift`等，然后找到数组对象中的`__ob__`对象中的`dep`,调用`dep`的`notify()`方法，再遍历数组中每一个成员，对每个成员调用`observer()`，如果这个成员是对象的话，也会转换成响应式对象。对象的响应式处理，就是调用`walk`方法，`walk`方法就是遍历对象的每一个属性，对每个属性调用`defineReactive`方法

defineReactive`会为每一个属性创建`dep`对象，让`dep`去收集依赖，如果当前属性的值是对象，会调用`observe`。`defineReactive`中最核心的方法是`getter`和`setter`。`getter`的作用是收集依赖，为每一个属性收集依赖，如果这个属性的值是对象，那也要为子对象收集依赖，最后返回属性的值。在`setter`中，先保存新值，如果新值是对象，调用`observe`，然后派发更新（发送通知），调用`dep.notify()

收集依赖时，在`watcher`对象的`get`方法中调用`pushTarget`记录`Dep.target`属性，访问`data`中的成员的时候收集依赖，`defineReactive`的`getter`中收集依赖，把属性对应的`watcher`对象添加到`dep`的`subs`数组中，给`childOb`收集依赖，目的是子对象添加和删除成员时发送通知。

在数据发生变化的时候，会调用`dep.notify()`发送通知，`dep.notify()`会调用`watcher`对象的`update()`方法，`update()`中的调用的`queueWatcher()`会去判断`watcher`是否被处理，如果这个`watcher`对象没有的话添加到`queue`队列中，并调用`flushScheduleQueue()`，`flushScheduleQueue()`触发`beforeUpdate`钩子函数调用`watcher.run()： run() --> get() --> getter() --> updateComponent()`

然后清空上一次的依赖

触发`actived`的钩子函数

触发`updated`钩子函数



### 3、请简述虚拟 DOM 中 Key 的作用和好处。

在 `v-for` 中如果给每个节点都设置`key`唯一标识，可以维持组件的状态，保证组件的复用，并且能提升查找的性能；在设置`key`与不设置`key`的比较中，设置`key`比不设置`key`的DOM操作少，从而优化DOM操作。

### 4、请简述 `Vue` 中模板编译的过程。

编译过程的入口函数`compileToFunctions`是先从缓存中加载编译好的`render`函数，如果缓存中没有的话，就去调用`compile`函数，在`compile`函数中，首先去合并选项，然后调用`baseCompile`函数编译模板。

把模板合并好的选项传递给`baseCompile`，`baseCompile`里面完成了模板编译核心的三件事，首先调用`parse`函数把模板转换成`AST`抽象语法树，然后调用`optimize`函数对抽象语法树进行优化，标记静态语法树中的静态根节点（只包含纯文本的静态节点不是静态根节点，因为此时的优化成本大于收益），patch过程中会跳过静态根节点，最后调用`generate`函数，将`AST`对象转化为`js`形式的代码。

当`compile`执行完毕后，会回到编译的入口函数`compileToFunctions`，通过调用`createFunction`函数，继续把上一步中生成的字符串形式`JS`代码转化为函数形式。当`render`和`staticRenderFns`初始化完毕，挂载到Vue实例的`options`对应的属性上。