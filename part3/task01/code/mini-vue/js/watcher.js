class Watcher{
    constructor(vm, key, cb){
        this.vm = vm;
        //data中的属性名
        this.key = key;
        //回调函数
        this.cb = cb;

        //把watcher对象记录到Dev的静态属性target中
        Dep.target = this;

        this.oldValue = vm[key];

        //防止重复触发
        Dep.target = null;
    }

    //当数据发生变化时更新
    update(){
        let newValue = this.vm[this.key];
        //如果新旧数据相同，不做操作
        if(newValue === this.oldValue) return;

        this.cb(newValue);
    }
}