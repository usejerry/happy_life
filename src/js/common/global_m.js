var isAppInside=/micromessenger/i.test(navigator.userAgent.toLowerCase())||/yixin/i.test(navigator.userAgent.toLowerCase());
var isIos= /iphone os/i.test(navigator.userAgent.toLowerCase())||/ipad/i.test(navigator.userAgent.toLowerCase());
var isAndroid = /android/i.test(navigator.userAgent.toLowerCase());

//初始化html  font-size
var initScreen=function(callback){

	//单屏全屏布局时使用,短屏下自动缩放
	$("html").css("font-size",document.documentElement.clientHeight/document.documentElement.clientWidth<1.5 ? (document.documentElement.clientHeight/603*312.5+"%") : (document.documentElement.clientWidth/390*312.5+"%"));
	
	
	// if(document.documentElement.clientHeight>document.documentElement.clientWidth/(750/1460)){
	// 	$('.wrap').css(' backgroundSize','100% 100%')
	// }
	//长页面时使用,不缩放
	// $("html").css("font-size",document.documentElement.clientWidth/375*312.5+"%");
	
	if(callback)callback();

	// setTimeout(function(){
	// 	$("html").css("font-size",document.documentElement.clientWidth/375*312.5+"%");
	// },600);

	/*横屏内嵌*/
	// var h = document.documentElement.clientHeight;
 //    var w =document.documentElement.clientWidth;
 //    document.documentElement.style.fontSize=(h>w?h:w)/667*312.5+"%";
 //    if(callback)callback();
	
}


//初始化关注公众号弹层
var _initAttention = function(){
	$("#btn_attention").bind("click",function(e){
   		$("#md_attention").show();
   		var st=setTimeout(function(){
   			$("#md_attention").addClass("show");
   		},50)
   	});
   	$("#md_attention").bind("click",function(e){
   		$("#md_attention").removeClass("show");
   		var st=setTimeout(function(){
   			$("#md_attention").hide();
   		},300);
   	})
   	if($("#md_attention").length > 0){
   		$("#md_attention")[0].addEventListener("touchmove", function(e){
			e.preventDefault();
			//e.stopPropagation()
		}, false);
   	}
	
}

//监听横竖屏
var _addEvent=function(){
	window.addEventListener("onorientationchange" in window ? "orientationchange" : "resize", 			function(e){_onorientationchange(e);}, false);
	
	$(".btn_toTop").click(function(e){
		window.scrollTo(0,0);
	});
}
var _onorientationchange=function(e){
	if(window.orientation==90||window.orientation==-90){
		$("#forhorview").css("display", "-webkit-box");  //显示竖屏浏览提示框
    }else{//竖屏下恢复默认显示效果
        var st=setTimeout(initScreen,300);
         $("#forhorview").css("display", "none");  
    }
}

var initPage=function(){//官网通用页面初始化处理
    initScreen(function(){
    	// _initShare();
    	_initAttention();
    	_addEvent();

    });
}


export default {
	globalInit : initPage
}