<!--
$theme: gaia
template: gaia
-->


Node.js进阶
异步IO的代码同步化<p style="text-align:right;font-size:28px;margin-right:50px;color:#cFc;">:star: by calidion</p>
===
---
回调函数
===
1. 是一种高效的函数调用方式
```
function(req, res, next) {
// next 回调函数
}
```
2. 回调函数适合用事件驱动的场景
```
obj.on("event1", function() {
});
```

---

3. 回调可以降低代码的耦合性
回调函数回调时，不需要知道之前的函数的内容 

4. 回调函数在异步调用时容易让执行顺变的不可区分
会形成回调地狱或者回调金字塔等问题

---
回调地狱
===
1. 对于为了防止阻塞而采用异步的IO模型来讲，
回调并不是个理想的形式
因为通常调用后，后继的代码需要等IO完成才能继续
2. 也就是回调地狱形成的原因：
异步代码依赖另一个异步代码
```
function abc(q, b, function() {
      fs.readdir(file, function (dir) {
         ....
      }
  }
}
```
---
防止回调地狱的方案-Promise
===
Promise表示一个异步操作事件的完成(或者失败)状态以及相关的值信息。


Promise是一个有三个状态的对象，分别是：
1. pending (相当于异步调用过程）
2. fulfilled  （成功状态）
3. rejected  （失败状态）

---

1. 方法考虑将代码线性化
即将回调函数通过某种方案写成是线性的
这种方案后来叫成是Promise
2. 提供线性化方法then
通过Promise.then方法实现了线性化
3. 链式调用
Promise.then(f1).then(f2).then(..)...then(fn)
4. 从而获得比较清楚的调用逻辑

---
如何使用Promise
===
1. 创建一个Promise

```
const p = new Promise(function(resolve, reject) {
  return resolve(1);
}）
```
resolve，表示问题解决，返回值。
reject，表示出错，返回错误。

2. 执行链式调用.then

```
p.then(function() {
 return new Promise();
}).then(f1).then(f2)...
```
---
3. 捕获错误.catch
===
```
p.then(function() {
 return new Promise();
}).catch(f1).then(f2)...
```

4. 无论是不是出错都都执行

其中f2最后面的函数是错误后仍会执行的函数

---

5. 让所有promise都执行.all

```
var p1 = Promise.resolve(3);
var p2 = 1337;
var p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo');
}); 

Promise.all([p1, p2, p3]).then(values => { 
  console.log(values); // [3, 1337, "foo"] 
});
```

---
async/await
===
终极解决方案

```
function timing(ms) {
	ms = ms || 1000;
  return new Promise(function(resolve, reject) {
	  setTimeout(() => {
		  resolve(ms);
	  }, ms);
  });
}
async function timed() {
   const ms = await timing();
	console.log(ms + " ms passed!");
}

timed()
```
---
比较
===
1. 回调
适合事件等不需要等待返回的工作
2. Promise
适合必须返回后才能继续的工作
3. async/await
让异步的代码看起来与同步的代码是一样的。需要与Promise配合使用













