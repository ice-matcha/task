//第1题
/*
var a = [];
for(var i = 0; i < 10; i++){
	a[i] = function(){
		console.log(i);
	}
}
a[6](); // 10
*/

//第2题
/*
var temp = 123;
if(true){
	console.log(temp);
	let temp;
}
*/

//第3题
/*
let arr = [12, 34, 32, 89, 4];
let min = arr.reduce((a, b) =>{
	return b < a ? b : a;
});
console.log(min); // 4
*/

//第5题
/*
var a = 10;
var obj = {
	a: 20,
	fn () {
		setTimeout(() => {
			console.log(this.a);
		},1000);
	}
}
obj.fn();	//20
*/

//第9题