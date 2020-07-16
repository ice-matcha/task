## 一、简答题

### 1、当我们点击按钮的时候动态给 data 增加的成员是否是响应式数据，如果不是的话，如果把新增成员设置成响应式数据，它的内部原理是什么。

```javascript
let vm = new Vue({
 el: '#el'
 data: {
  o: 'object',
  dog: {}
 },
 method: {
  clickHandler () {
   // 该 name 属性是否是响应式的
   this.dog.name = 'Trump'
  }
 }
})
```

 答：不是，在创建Vue实例时会将data属性转化为响应式数据，在Vue实例化后再给data添加新的成员仅仅是普通成员。

在Vue2.x中，调用了defineReactive()方法将新增的成员属性转换为响应式，并且通过dev.notify()方法通知页面修改。

### 2、请简述 Diff 算法的执行过程

 Diff算法是用来查找同级下子节点差异的算法，主要执行过程如下：

- 头头对比：判断oldStartVnode与newStartVnode是否是同一个vnode
- 尾尾对比：判断oldEndVnode与newEndVnode是否是同一个vnode
- 旧尾与新头对比：判断oldStartVnode与newEndVnode比较vnode是否相同
- 旧头与新尾对比：将旧的结束节点oldEndVnode与新的开始节点newStartVnode 比较vnode是否相同
- 利用key对比：oldChildren中key及相对应的索引的map

## 二、编程题

### 1、模拟 VueRouter 的 hash 模式的实现，实现思路和 History 模式类似，把 URL 中的 # 后面的内容作为路由的地址，可以通过 hashchange 事件监听路由地址的变化。

```javascript
let _Vue = null;

class VueRouter
{
    static install (Vue) 
    {
        //1.判断当前插件是否已经被安装
        if(VueRouter.install.installed) return;
        VueRouter.install.installed = true;
        //2.把Vue构造函数记录到全局变量中
        _Vue = Vue;
        //3.把创建的Vue实例时传入的router对象注入到Vue实例上
        _Vue.mixin({
            beforeCreate () {
                if(this.$options.router) {
                    _Vue.prototype.$router = this.$options.router;
                    this.$options.router.init();
                }
            }
        });
    }

    constructor (options) 
    {
        this.options = options;
        this.routeMap = {};
        this.data = _Vue.observable({
            current: '/'
        });
    }

    init () {
        this.createRouteMap();
        this.initComponents(_Vue);
        this.initEvent();
    }

    /**
     * 解析路由配置
     */
    createRouteMap () 
    {
        //遍历所有的路由规则，把路由规则解析成键值对的形式，并存储到routeMap中
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component;
        })
    }

    initComponents (Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            render (h) {
                return h('a', {
                    attrs: {
                        href: '#' + this.to
                    }
                },[this.$slots.default]);
            }
        });

        const self = this;
        Vue.component('router-view', {
            render (h) {
                const component = self.routeMap[self.data.current];
                return h(component);
            }
        });
    }

    initEvent () {
        //hash改变时调用
        window.addEventListener("hashchange", () => {
            this.data.current = window.location.hash.slice(1) || "/";
        });

        //页面刷新时调用
        window.addEventListener("load", () => {
            this.data.current = window.location.hash.slice(1) || "/";
        });
    }
}

export default VueRouter;
```

### 2、在模拟 Vue.js 响应式源码的基础上实现 v-html 指令，以及 v-on 指令。

 完整项目链接：[https://github.com/ice-matcha/task/tree/master/part3/task01/code/mini-vue](https://github.com/ice-matcha/task/tree/master/part3/task01/code/mini-vue) 

### 3、参考 Snabbdom 提供的电影列表的示例，利用Snabbdom 实现类似的效果，如图：

完整项目链接：[https://github.com/ice-matcha/task/tree/master/part3/task01/code/snabbdom-demo](https://github.com/ice-matcha/task/tree/master/part3/task01/code/snabbdom-demo) 

