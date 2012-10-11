myMVC
=====

try to imitate the mvc design pattern of java 

文件夹分类说明

+commonJS --实现commonjs相关的规范
	module.js 实现模块化管理
+core --整个框架的核心部分
	jdk.js 最核心的组成，包括类、接口的定义以及一些常用的基础工具
	jQuery.js 原生的jquery框架源码
+modules--所有框架定义的模块
	jquery.js jquery模块
	mvc.js 前端层面的mvc实现
	notify.js 消息通信模块
+widget --工具插件
	+ui --基于jquery的一些与dom操作相关的插件
		+js js文件夹
		+css 样式文件夹
	+util 一些常用的工具扩展
		money.js 与金额相关的处理模块
		string.js 文本字符串的处理扩展