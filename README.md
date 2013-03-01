myMVC
=====

整个框架的宗旨是模拟java的类写法，将所有的对象以类的方式来实现，加上module的模块化对话提供接口和调用。

由于框架暂由自己维护，对外提供widget的贡献，所以在对于core核心文件和module文件上，基本保持对外接口一致，所以总会及时更新最新版本，而不用保持每个版本的记录。

widget作为第三方贡献代码，所以需要保证每个版本独立。 



文件夹分类说明


+core --整个框架的核心部分
	
	+js 核心的js文件
	
		jdk.js 最核心的组成，包括类、接口的定义以及一些常用的基础工具
		
		jQuery.js 原生的jquery框架源码
		
		module.js 实现模块化管理
	
	+css 核心的css文件
		
		reset.css 来自YUI3的页面样式重置文件
		
		common.css 定义了基础的常用样式
	
+modules--所有框架定义的模块，只是单一功能的引用，比如只涉及js的操作运算或者只涉及css样式的定义等，无需同时引用js和css文件的最小单元或通用单元
	
	+js js模块

		jquery.js jquery对象封装成了模块
		
		class.js 将整个框架中的类对外封装成模块
		
		mvc.js 前端层面的mvc实现
		
		notify.js 消息通信模块
	
	+css 样式模块
		
		button.css 定义了通用的按钮样式 
	
+widget --工具插件,涉及到js和css的同时运用的第三方贡献代码，按照插件名/版本号进行组织文件

	+pagenation 翻页组件
	
	+dialog	对话框组件
	
	+tab tab切换组件
	
	+datepicker 日期选择组件
	
	+colorpicker 取色组件
	
	+autocomplete 自动提示组件
		
		