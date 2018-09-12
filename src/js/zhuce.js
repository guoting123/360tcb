//			 alert("nihao")
			//点击关闭
		$("#closeZc").click(function(){
			$("#zc").hide();
			console.log("你好")
		})
//		手机号失焦验证
		$("#tel").on("blur",function(){
			var value=$(this).val();
			telblur(value);
		})
		
        getYzm()
        $(".change").on("click",function(){
			getYzm()
		})
        $("#getXym").on("click",function(){
        	if($("#yzm").val()==$(".yzm").html()){
        		getXym()
        		$(".tishi").html("验证码正确")
        	}else{
        		getYzm()
        		$("#yzm").val("")
        		$(".tishi").html("验证码错误")
        	}
			
		})
        
//		手机号失焦验证        
		function telblur(tel){
			$.get("http://localhost:8080/repeateTel",{
				tel:tel
			},function(res){
				$("#tel").next().html(res);
			})
		}        
//		获取验证码
        function getYzm(){
        	$.get("http://localhost:8080/yzm",function(res){
        		$("#yzm").next().html(res);
        	})
        }
// 获取校验码
     function getXym(){
     	$.get("http://localhost:8080/xym",{tel:$("#tel").val()},function(res){
        		$("#getXym").next().html(res);
        	})
     }
 //验证校验码
 $("#zhuc").click(function(){
 	$.get("http://localhost:8080/yzxym",{
 		tel:$("#tel").val(),
 		pass:$("#pas").val(),
 		xym:$("#xym").val()
 	},function(res){
     	console.log(res)
     })
 	$("#tel").val("")
 	$("#pas").val("")
 	$("#xym").val("")
 	$("#yzm").val("")
 })
