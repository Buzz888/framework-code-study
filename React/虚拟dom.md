## 为什么需要虚拟dom？
1. 属性过多 所以dom操作是前端性能的杀手 尽量少操作dom console.dir(document)=>查看

>所以可以通过js对象描述dom并对 对象进行操作 以实现少操作dom 两次操作会做diff 只做到最少的修改次数

## 如何描述虚拟dom？  
```
const element ={
	 type:'div' =>元素
	 props:{
		 title:"foo", =>节点文本
		 children:"hello react" =>每个属性的子节点
	 }
 }
```
### fiber架构
  通过api requestldleCallback 可以利用浏览器空闲业余事件 来做diff操作
  比如会先执行用户点击和动画 等 空闲再把 requestldleCallback 中的任务完成
   
 >mdn window.requestIdleCallback()方法将在浏览器的空闲时段内调用的函数排队。这使开发人员能够在主事件循环上执行后台和低优先级工作，而不会影响延迟关键事件，如动画和输入响应。函数一般会按先进先调用的顺序执行，然而，如果回调函数指定了执行超时时间timeout，则有可能为了在超时前执行函数而打乱执行顺序。
```
 var handle = window.requestIdleCallback(callback[, options])


> 返回值:一个无符号长整数，可以把它传入 Window.cancelIdleCallback() 方法，来结束回调
> 参数:1. 一个在事件循环空闲时即将被调用的函数的引用。2.timeout[可选] timeout 值被指定为正数时，当做浏览器调用 callback 的最后期限
```
