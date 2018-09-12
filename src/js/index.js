 //轮播图部分
 var swiper = new Swiper('.swiper-container', {
		      spaceBetween: 30,
		      centeredSlides: true,
		      autoplay: {
		        delay: 2500,
		        disableOnInteraction: false,
		      },
		      pagination: {
		        el: '.swiper-pagination',
		        clickable: true,
		      },
		      navigation: {
		        nextEl: '.swiper-button-next',
		        prevEl: '.swiper-button-prev',
		      },
		    });
//热门手机回收
$.getJSON("http://localhost:8080/data/shoujihuishou.json",function(res){
	console.log(res.result);//arr
	var obj={
		arr:res.result
	}
	$("#hot .bottom .phone").html(baidu.template("temp1",obj))
})
//优品精选
$.getJSON("http://localhost:8080/data/youpinjingxuan.json",function(res){
	console.log(res.result);//arr
	var obj={
		arr:res.result
	}
	$("#you .bottom .phone").html(baidu.template("temp2",obj))
})
//------------切换城市-------------0
var citylist;
var hotcity;
$.getJSON("http://localhost:8080/data/city.json",function(res){
	 console.log(res)
	  citylist=res.result.citylist;//obj
	  hotcity=res.result.hotcity;//arr
	 $("#city .hotcity").html(baidu.template("temp3",{hotcity:hotcity}))
	 $("#city .list").html(baidu.template("tempList",{obj:citylist}))
	 changeCity("A")
})
function changeCity(key){
	var city=citylist[key];
	$("#city .city").html(baidu.template("tempCity",{city:city}))
}
function changeHotcity(hotcity){
	$("#header1 span").html(hotcity);
//	console.log(hotcity)
}
//点击显示
$("#toggle").click(function(){
	$("#city").show();
})
//点击关闭隐藏
$("#city .close").click(function(){
	$("#city").hide();
})
//------------修手机
//xiu1
$.getJSON("http://localhost:8080/data/xiu1.json",function(res){
	console.log(res)
	var xiu1Obj=res.result;//arr
	$("#xiu_tel").html(baidu.template("tempxiu1",{arr:xiu1Obj}))
})
$(".xiu_tel").mousemove(function(){
	$("#xiu_tel").show();
})
$("#xiu_tel").mousemove(function(){
	$("#xiu_tel").show();
})
$("#swiper").mouseout(function(){
	$("#xiu_tel").hide();
})


//xiu2
$.getJSON("http://localhost:8080/data/xiu2.json",function(res){
	console.log(res)
	var xiu2Hot=res.result.hot;//arr
	var xiu2Other=res.result.other;//arr
	$("#xiu_note .hotTrouble").html(baidu.template("tempxiu2H",{arr:xiu2Hot}))
	$("#xiu_note .otherTrouble").html(baidu.template("tempxiu2O",{arr:xiu2Other}))
})
$(".xiu_note").mousemove(function(){
	$("#xiu_note").show();
})
$("#xiu_note").mousemove(function(){
	$("#xiu_note").show();
})
$("#swiper").mouseout(function(){
	$("#xiu_note").hide();
})
//xiu3
$.getJSON("http://localhost:8080/data/xiu3.json",function(res){
	console.log(res)
	var xiu3Obj=res.result;//arr
	$("#sell_tel").html(baidu.template("tempxiu3",{arr:xiu3Obj}))
})
$(".sell_tel").mousemove(function(){
	$("#sell_tel").show();
})
$("#sell_tel").mousemove(function(){
	$("#sell_tel").show();
})
$("#swiper").mouseout(function(){
	$("#sell_tel").hide();
})
//xiu4
$.getJSON("http://localhost:8080/data/xiu4.json",function(res){
	console.log(res)
	var xiu4Obj=res.result;//obj
	$("#sell_note").html(baidu.template("tempxiu4",{obj:xiu4Obj}))
})
$(".sell_note").mousemove(function(){
	$("#sell_note").show();
})
$("#sell_note").mousemove(function(){
	$("#sell_note").show();
})
$("#swiper").mouseout(function(){
	$("#sell_note").hide();
})
//封装获取店铺数据的函数

	    //	百度模板
			var plugin=new PagePlugin({
				container: document.querySelector("#page"),//容器盒子
				showContentCount:5,//每页显示的条目数
				contentCount:25,//总数据量
				showPageCount:9,//显示的页码数
				activeStyle:"#FC6621",//显示的形态
				backFn:function(count){//成功回调
					console.log(count)
					$.getJSON("http://localhost:8080/data/shop1.json",function(res){
						var arr = res.slice((count-1)*5,count*5);//截取5条数据
					    console.log(arr);
					    $("#shop_list").html(baidu.template("tempshop",{arr:arr}));
						hover()
						 //	点击排序
						$("#count").click(function(){
							$("#nav_shop li").css("background","#FAFAFA")
							$(this).css("background","white")
							arr.sort(function(a,b){
								return a.count*1-b.count*1
							})
							$("#shop_list").html(baidu.template("tempshop",{arr:arr}));
							hover()
						})
						$("#visit").click(function(){
							$("#nav_shop li").css("background","#FAFAFA")
							$(this).css({"background":"white"});
							arr.sort(function(a,b){
								return b.shop_visit*1-a.shop_visit*1;
							})
							$("#shop_list").html(baidu.template("tempshop",{arr:arr}));
							hover()
							
						})
						$("#defult").click(function(){
							$("#nav_shop li").css("background","#FAFAFA")
							$(this).css("background","white")
							arr.sort(function(a,b){
								return b.shop_id*1-a.shop_id*1;
							})
							$("#shop_list").html(baidu.template("tempshop",{arr:arr}));
							hover()
							
						})
						//商家好评
						$("#commentList").html(baidu.template("tempComment",{arr:res.sort(function(a,b){return b.comments*1-a.comments*1})}))
					})
					
				}
			});


 //	鼠标滑过
	    function hover(){
		    	$("#shop_list>li").hover(function(){
				$(this).css("background","#FAFAFA")
		        $(this).find(".btnIn").show();
			},function(){
				$(this).css("background","white")
				$(this).find(".btnIn").hide();
			})
	    }
//封装登录店铺函数
function loginShop(id){
	console.log(id)
	localStorage.id=id;
	window.open("html/shopdetail.html")
}
//点击关闭登陆
$("#login").click(function(){
	console.log("ok")
	$("#cover").show()
})
$("#closeLogin").click(function(){
	$("#cover").hide();
}
)
//点击登录 登录接口
$("#lo").click(function(){
	$.get("http://localhost:8080/login",{
	tel:$("#user").val(),
	pass:$("#pass").val()
},function(res){
	console.log(res)
	if(res=="ok"){
		$("#cover").hide();
	}else{
		$(".dl").html(res)
		$("#user").val("")
	    $("#pass").val("")
	}
	
})
})
//点击注册接口
$("#register").click(function(res){
	$("#cover").show();
	$("#log").hide();
	$("#zhuce").show();
	$.get("http://localhost:8080/ejs",{
		path:"zhuce"
	},function(res){
       $("#zhuce").html(res);		
	})
})

