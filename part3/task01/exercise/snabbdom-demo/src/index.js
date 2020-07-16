import { h, init } from 'snabbdom';
import style from 'snabbdom/modules/style';
import sn_class from 'snabbdom/modules/class';
import props from 'snabbdom/modules/props';
import eventListeners from 'snabbdom/modules/eventlisteners';

let patch = init([
    style,
    sn_class,
    props,
    eventListeners
]);

/*
let vnode = h('div',{
    style: {
        backgroundColor: 'red'
    },
    on: {
        click: eventHandle
    }
},[
    h('h1',"Hello Doubi"),
    h('p', "test success")
]);

function eventHandle(){
    console.log("别点，会痛");
}

let app = document.querySelector('#app');

patch(app, vnode);
*/

let data = [
    {rank: 1, title: 'The Shawshank Redemption', desc: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.'},
    {rank: 2, title: 'The Godfather', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.'},
    {rank: 3, title: 'The Godfather: Part II', desc: 'The early life and career of Vito Corleone in 1920s New York is portrayed while his son, Michael, expands and tightens his grip on his crime syndicate stretching from Lake Tahoe, Nevada to pre-revolution 1958 Cuba.'},
    {rank: 4, title: 'The Dark Knight', desc: 'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, the caped crusader must come to terms with one of the greatest psychological tests of his ability to fight injustice.'},
    {rank: 5, title: 'Pulp Fiction', desc: 'The lives of two mob hit men, a boxer, a gangster\'s wife, and a pair of diner bandits intertwine in four tales of violence and redemption.'},
    {rank: 6, title: 'Schindler\'s List', desc: 'In Poland during World War II, Oskar Schindler gradually becomes concerned for his Jewish workforce after witnessing their persecution by the Nazis.'},
    {rank: 7, title: '12 Angry Men', desc: 'A dissenting juror in a murder trial slowly manages to convince the others that the case is not as obviously clear as it seemed in court.'},
    {rank: 8, title: 'The Good, the Bad and the Ugly', desc: 'A bounty hunting scam joins two men in an uneasy alliance against a third in a race to find a fortune in gold buried in a remote cemetery.'},
    {rank: 9, title: 'The Lord of the Rings: The Return of the King', desc: 'Gandalf and Aragorn lead the World of Men against Sauron\'s army to draw his gaze from Frodo and Sam as they approach Mount Doom with the One Ring.'},
    {rank: 10, title: 'Fight Club', desc: 'An insomniac office worker looking for a way to change his life crosses paths with a devil-may-care soap maker and they form an underground fight club that evolves into something much, much more...'}
];
let nextRank = data.length;
let vnode;

/**
 * 渲染
 * @param  data 渲染的列表数据
 */
function showView(data) {
    return h('div#app',[
        h("h1", 'Test list rank'),
        h("a.btn.add", {on: {click: doAdd}}, "Add"),
        'Sort by:',
        h('span.btn-group', [
            h("a.btn", {on: {click: [doSort, 'rank']}}, 'Rank'),
            h("a.btn", {on: {click: [doSort, 'title']}}, 'Title'),
            h("a.btn", {on: {click: [doSort, 'desc']}}, 'Desc'),
        ]),
        h('div.content', data.map(item => {
            return h('div.row',{
                key: item.rank
            },[
                h("div", item.rank),
                h("div", item.title),
                h("div", item.desc),
                h("div.btn.rm-btn", {on: {click: [doRemove, item]}}, 'X'),
            ]);
        }))
    ]);
}

/**
 * 添加
 */
function doAdd() {
    let tmp = data[Math.floor(Math.random() * 10)];
    data.push({
        rank: nextRank+1,
        title: tmp.title,
        desc: tmp.desc
    });
    nextRank += 1;
    tmp = null;
    render();
    //console.log(data);
}

/**
 * 排序
 * @param  flag 排序参数
 */
function doSort(flag="rank") {
    data.sort((a, b) => {
        if(a[flag] > b[flag]) return 1;
        if(a[flag] < b[flag]) return -1;
        return 0;
    });
    render();
    //console.log(data);
}

/**
 * 移除
 * @param item 要移除的元素
 */
function doRemove(item) {
    data.forEach((val,index) => {
        if(val.rank === item.rank){
            data.splice(index, 1);
        }
    })
    render();
    //console.log("我要被移除了");
}

function render(){
    vnode = patch(vnode, showView(data));
}

window.addEventListener('DOMContentLoaded', () => {
    let app = document.querySelector('#app');
    vnode = patch(app, showView(data));
});
