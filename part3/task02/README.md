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

`Vue`响应式的入口是从`src/core/instance/init.js`文件`_init()`方法中开始，`_init()`方法中先调用`initState()`初始化`Vue`实例的状态，`initState()`方法中主要功能：

- 调用`initDate()`方法把`data`属性注入到`Vue`的实例上
- 调用`src/core/observer/index.js`的`observe()`方法将`data`对象转化为响应式对象

`observe()`方法：

- 判断传入参数`value`是否是对象
- 判断`value`对象是否存在`__ob__`属性，如果不存在，创建并且返回·observer·对象

创建`observer`对象的功能如下：

- 给`value`对象定义不可枚举`__ob__`属性，并且记录当前的`observer`对象
- 对数组以及对象的响应式处理：
  + 数组响应式处理：拦截数组中的特殊方法，接着调用数组对象中`__ob__`的`dep`对象里的`notify()`方法，然后再遍历数组并对每个数组成员调用`observer()`方法进行响应式处理
  + 对象响应式处理：调用`walk`方法遍历对象，并且对对象的每个属性调用`defineReactive`方法

`defineReactive`会为每一个属性创建`dep`对象，让`dep`去收集依赖，如果当前属性的值是对象，会调用`observe`。`defineReactive`中核心的方法的作用：

- `getter`：为每一个属性收集依赖，如果这个属性的值是对象，要为子对象收集依赖，最后返回属性的值
- `setter`：先保存新值，如果新值是对象，调用`observe`，然后调用`dep.notify()`方法发送通知

当数据发生变化时，调用`dep.notify()`发送通知，`dep.notify()`会调用`watcher`对象中的`update()`方法，`update()`中的调用的`queueWatcher()`会去判断`watcher`是否被处理，如果这个`watcher`对象不存在则将其添加到`queue`队列中，并调用`flushScheduleQueue()`方法触发`beforeUpdate`钩子函数调用`watcher.run()： run() --> get() --> getter() --> updateComponent()`，然后清空上一次的依赖，并且触发`actived`和`updated`钩子函数。



### 3、请简述虚拟 DOM 中 Key 的作用和好处。

在 `v-for` 中如果给每个节点都设置`key`唯一标识，可以维持组件的状态，保证组件的复用，并且能提升查找的性能；在设置`key`与不设置`key`的比较中，设置`key`比不设置`key`的DOM操作少，从而优化DOM操作。

### 4、请简述 `Vue` 中模板编译的过程。

编译过程的入口函数`compileToFunctions` ("`src/platforms/web/compiler/index.js`"文件中定义)先从缓存中加载编译好的`render`函数，如果缓存中没有，则调用`compile`函数合并选项，然后调用`baseCompile`函数编译模板。

`baseCompile`模板编译：

- 调用`parse`函数把模板转换成`AST`抽象语法树
- 调用`optimize`函数对抽象语法树进行优化，标记静态语法树中的静态根节点
- 调用`generate`函数，将`AST`对象转化为`js`形式的代码

`compile`执行完毕后，再回到编译的入口函数`compileToFunctions`中调用`createFunction`函数，将上一步中生成的字符串形式`JS`代码转化为函数形式。当`render`和`staticRenderFns`初始化完毕，挂载到`Vue`实例的`options`对应的属性上。