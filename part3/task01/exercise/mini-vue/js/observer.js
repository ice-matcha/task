class Observer {
    constructor(data) {
        this.walk(data);
    }

    walk (data) {
        //判断data是否是对象
        if(!data || typeof data !== 'object') return;

        //遍历data对象的所有属性
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        })
    }

    defineReactive (obj, key, val) {
        let that = this;
        //创建dep对象
        let dep = new Dep();
        this.walk(val);

        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get () {
                //收集dep依赖
                Dep.target && dep.addSub(Dep.target);
                return val;
            },
            set (newValue) {
                if(newValue === val) return;
                val =newValue;
                that.walk(newValue);

                //发送通知
                dep.notify();
            }
        })
    }
}