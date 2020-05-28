function once(fn){
    let done = false;
    return function(){
        if(done) return ;
        done = true;
        return fn.apply(this, arguments);
    }
}

let pay = once((money) => {
    console.log(money);
});

pay(18);
pay(18);
pay(18);


const some = (arr, fn) => {
    let result = false;
    for(let item of arr){
        result = fn(item);
        if(result) break;
    }
    return result;
}
let arr = [1,3,4,9];
let r = some(arr, v => v % 2 === 0);
console.log(r);