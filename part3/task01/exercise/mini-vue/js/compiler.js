class Compiler{
    constructor(vm){
        this.el = vm.$el;
        this.vm = vm;
        this.compile(this.el);
    }

    //编译模板，处理文本节点和元素节点
    compile (el) {
        let childNodes = el.childNodes;
        Array.from(childNodes).forEach(node => {
            //处理文本节点
            if(this.isTextNode(node)){
                this.compileText(node)
            }

            //处理元素节点
            if(this.isElementNode(node)){
                this.compileElement(node);
            }

            //判断node节点是否有子节点，有则递归调用complie
            if(node.childNodes && node.childNodes.length) this.compile(node);
        })
    }

    //编译元素节点，处理指令
    compileElement(node){
        Array.from(node.attributes).forEach(attr => {
            //判断是否是指令
            let attrName = attr.name;
            if(this.isDirective(attrName)) {
                attrName = attrName.substr(2);
                let key = attr.value;
                
                //判断是否是事件指令
                if(this.isEventDirective(attrName)){
                    //事件指令
                    this.eventHandler(node, this.vm, key, attrName);
                }else{
                    //普通指令
                    this.update(node, key, attrName)
                }
            }
        })
    }

    //编译文本节点，处理差值表达式
    compileText(node){
        let reg = /\{\{(.+?)\}\}/;
        let value = node.textContent
        if (reg.test(value)) {
            let key = RegExp.$1.trim();
            node.textContent = value.replace(reg, this.vm[key]);

            // 创建watcher对象，当数据改变更新视图
            new Watcher(this.vm, key, (newValue) => {
                node.textContent = newValue;
            })
        }
    }

    update (node, key, attrName) {
        let updateFn = this[attrName + 'Updater'];
        updateFn && updateFn.call(this, node, this.vm[key], key);
    }

    // 处理 v-text 指令
    textUpdater (node, value, key) {
        node.textContent = value;

        //创建watcher对象
        new Watcher(this.vm, key, (newValue) => {
            node.textContent = newValue;
        });
    }

    // 处理 v-model 指令
    modelUpdater (node, value, key) {
        node.value = value;
        //创建watcher
        new Watcher(this.vm, key, (newValue) => {
            node.value = newValue;
        });
        // 双向绑定
        node.addEventListener('input', () => {
            this.vm[key] = node.value;
        })
    }

    // 处理 v-html 指令
    htmlUpdater (node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    }

    // 处理 v-on 指令
    eventHandler (node, vm, key, dir) {
        let eventType = dir.split(':')[1];
        let fn = vm.$options.methods && vm.$options.methods[key];

        if (eventType && fn) {
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    }

    //判断元素是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-');
    }

    //判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3;
    }

    //判断是否是元素节点
    isElementNode(node){
        return node.nodeType === 1;
    }

    //判断是否是事件节点
    isEventDirective(dir){
        return dir.indexOf('on') === 0;
    }
}