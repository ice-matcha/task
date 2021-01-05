### 请简述 React 16 版本中初始渲染的流程

要将 React 元素渲染到页面中，分为两个阶段，render 阶段和 commit 阶段。 

- render 阶段负责创建 Fiber 数据结构并为 Fiber 节点打标记，标记当前 Fiber 节点要进行的 DOM 操作
-  commit 阶段负责根据 Fiber 节点标记 ( effectTag ) 进行相应的 DOM 操作。

### 为什么 React 16 版本中 render 阶段放弃了使用递归

React 16 之前的版本比对更新 VirtualDOM 的过程是采用循环加递归实现的，而JavaScript中函数递归是不可被打断的, 并且JavaScript是单线程，所以在render任务开始进行就无法中断，render就一直占用着JavaScript的主线程，直到render结束.。如果应用中组件数量庞大，主线程被长期占用，直到整棵 VirtualDOM 树比对更新完成之后，主线程才能被释放，然后再执行其他任务。这就导致一些用户交互、动画等任务无法立即得到执行，造成页面卡顿的问题，影响用户体验。

### 请简述 React 16 版本中 commit 阶段的三个子阶段分别做了什么事情

- 第一个阶段(before mutation 阶段)：执行了 getSnapshotBeforeUpdate
- 第二个阶段(mutation 阶段)：执行了渲染 Dom 相关的操作
- 第三个阶段(layout 阶段)：执行了渲染 Dom 之后的操作

### 请简述 workInProgress Fiber 树存在的意义是什么

React 使用双缓存技术完成 Fiber 树的构建与替换，实现DOM对象的快速更新。

React 会存储两个 Fiber 树，其中一个是 current Fiber 树，React 在调用生命周期钩子函数时就是通过判断是否存在 current 来区分何时执行 componentDidMount 和 componentDidUpdate；当发生更新时，React 会在内存中重新构建一颗新的 Fiber 树，这颗正在构建的 Fiber 树叫做 workInProgress Fiber 树；在双缓存技术中，如果workInProgress树还未创建，则会创建一个 current树的副本作为 workInProgress树。当 workInProgress树被提交后将会在 commit 阶段的某一子阶段被替换成为 current 树；这样操作主要为了避免更新的丢失，达到快速更新 DOM 的目的

