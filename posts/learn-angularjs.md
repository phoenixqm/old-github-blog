
本文`AngularJS`指的是`AngularJS 1.x`。Angular2的git repo为`angular.io`.

AngularJS项目编译需要注意：
 - 只能用`node v4`，可以考虑使用`nvm`管理node版本。
 - 因为源码组织很清楚，学习AngularJS实际上不用编译项目

AngularJS项目的结构组织很清楚，不需要多说。

学习AngularJS除了官方文档，还有的主要参考书：
 - AngularJS权威指南，即ng-book，入门书
 - AngularJS深度剖析与最佳实践，深入和实践


### 学习AngularJS源码的非常好的博文
 - [AngularJS源码阅读1：启动过程](http://liuwanlin.info/angularjsyuan-ma-yue-du-1qi-dong-guo-cheng/)
 - [AngularJS源码阅读2：编译链接过程](http://liuwanlin.info/angularjsyuan-ma-yue-du-2bian-yi-lian-jie-guo-cheng/)
 - [Angular执行流程（一）](http://www.aliued.com/?p=3176)
 - [从Angular源码看scope（二）](http://www.aliued.com/?p=3180)
 - [Angular指令编译原理（三）](http://www.aliued.com/?p=3190)
 - [Angular服务深度剖析（四）](http://www.aliued.com/?p=3195)
 - [Angular路由深入浅出（五）](http://www.aliued.com/?p=99)

### AngularJS官方和非官方社区
 - [AngularJS Developer Guide](https://docs.angularjs.org/guide)
 - [Angular中文社区](http://angularjs.cn/)

### 理解AnguarJS中的模板编译

必须读的官方文档 [AngularJS HTML Compiler](https://docs.angularjs.org/guide/compiler) 原文：

> It's important to note that Angular operates on DOM nodes rather than strings. Usually, you don't notice this  restriction because when a page loads, the web browser parses HTML into the DOM automatically. HTML compilation happens in three phases:
> 1. `$compile` traverses the DOM and matches directives. If the compiler finds that an element matches a directive, then the directive is added to the list of directives that match the DOM element. A single element may match multiple directives.
> 2. Once all directives matching a DOM element have been identified, the compiler sorts the directives by their priority. Each directive's `compile` functions are executed. Each `compile` function has a chance to modify the DOM. Each compile function returns a `link` function. These functions are composed into a "combined" link function, which invokes each directive's returned `link` function.
> 3. `$compile` links the template with the scope by calling the combined linking function from the previous step. This in turn will call the linking function of the individual directives, registering listeners on the elements and setting up `$watchs` with the `scope` as each directive is configured to do.

实际上，Angular的`$compile`函数DOMElement作为输入,遍历整个DOM。如果需要用字符串作为传入的模板，
则先要用`$angular.element`函数将字符串转为DOMElement。这个函数实际上就是jQuery中的`$()`函数。

`$compile`遍历DOM，并查找`directive`，将找到的每个`directive`添加到一个列表中。
整个DOM遍历完成后，再将列表中的`directive`按照优先级排序。之后，执行每个`directive`自己的`compile`函数，
让`directive`有机会去修改DOM。每个指令的compile函数会返回一个`link`函数，
该函数会被拼接成一个完整的链接函数，并被返回。

接下来，AngularJS会执行返回的`link`函数，对应的scope会被传入到这个执行过程中。这一步中，
所有的子`link`函数函数都会被执行，并绑定在同一个scope上，或依照`directive`的设定创建一个新的scope。
所有的`link`函数执行完毕后，每个`link`函数都会返回一组DOMElement， 这些DOMElement已经完成数据绑定和事件监听，AngularJS会将它们添加到父节点。

### 理解AnguarJS中的Provider

TODO


### 前人的经验总结
 - Angularjs开发一些经验总结 by 破狼(http://jingpin.jikexueyuan.com/article/3884.html)

### 参考博文：
  - [理解AnguarJS中的模板编译](http://log4think.com/understanding_angularjs_template_compiling/)