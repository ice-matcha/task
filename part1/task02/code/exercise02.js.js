const fp = require("lodash/fp");
const {Maybe, Container} = require("./support");

/**
 * 代码2
 */

//练习1
let maybe = Maybe.of([5,6,1]);
let ex1 = (functor, num) => {
    return functor.map(fp.map(fp.add(num)));
}
console.log(ex1(maybe, 1));


//练习2
let xs = Container.of(["do", "ray", "me", "fa", "so", "la", "ti", "do"]);
let ex2 = functor => functor.map(fp.first)._value;
console.log(ex2(xs));


//练习3
let safeProp = fp.curry(function (x, o) {
  return Maybe.of(o[x])
});

let user = {id:2, name:'Albert'};
let ex3 = (data, title) => safeProp(title,data).map(fp.first)._value;
console.log(ex3(user,"name"));


//练习3
let ex4 = n => Maybe.of(n || undefined).map(n => parseInt(n))._value;