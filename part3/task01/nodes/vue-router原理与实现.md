# vue-router原理实现

## Hash路由模式与History路由模式

### Hash路由模式

Hash模式是基于锚点以及`onhashchange`事件，它是以浏览器的URL中 # 后面的内容作为路径地址，当URL发生改变时会被浏览器记录，同时触发`onhashchange`事件。

使用Hash模式的优点：

- 浏览器URL中的hash值改变，不会触发请求，不会重新加载页面，对服务器没有影响
- 浏览器URL中的hash值的改变会被浏览器记录下来，此时网页的状态与浏览器的URL进行了关联，从而可以进行网页的前进和后退操作

### History路由模式

History模式时基于HTML5中的History API，它是通过history.pushState()方法改变地址栏，当调用history.pushState()或history.replaceState()方法时，不会触发popstate事；在点击浏览器中的前进和后退按钮时才会触发popstate事件。其中history.pushState()或history.replaceState()方法的特点如下：

- history.pushState()，会对服务器发生请求，该方法会有兼容性问题(IE10以后才支持)
- history.replaceState()， 不会对服务器发出请求，只会改变浏览器中地址栏的地址，并且把这个地址记录到历史记录中

History模式的使用：

- History需要服务器的支持
- 单页面应用中，服务器不存在 http://xxx.com/hello 这种地址，会返回找不到该页面
- 在服务端应该除了静态资源外都返回单页面应用的index.html

## 简单的 Vue Router 实现

History版:

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

    createRouteMap () 
    {
        //遍历所有的路由规则，把路由规则解析成键值对的形式，并存储到routeMap中
        console.log(this.options);
        this.options.routes.forEach(route => {
            this.routeMap[route.path] = route.component;
        })
    }

    initComponents (Vue) {
        Vue.component('router-link', {
            props: {
                to: String
            },
            //template: '<a :href="to"><slot></slot></a>'
            render (h) {
                return h('a', {
                    attrs: {
                        href: this.to
                    },
                    on: {
                        click: this.clickHandler
                    }
                },[this.$slots.default]);
            },
            methods: {
                clickHandler(e) {
                    history.pushState({}, '', this.to);
                    this.$router.data.current = this.to;
                    e.preventDefault();
                }
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
        window.addEventListener('popstate', () => {
            this.data.current = window.location.pathname;
        });
    }
}

export default VueRouter;
```

Hash版:

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
