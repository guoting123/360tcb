var express=require("express");
var http=express();
var fs=require("fs");
var ejs=require("ejs");
http.listen(8080,function(){
	console.log("ok");
})
//中间件跨域
http.use(function(req,res,next){
	res.header("Access-Control-Allow-Origin","*");
	next()
})
//登录接口
http.get("/login",function(req,res){
	var userObj=req.query;
	console.log(userObj)
	var tel=userObj.tel;
	var pass=userObj.pass;
	fs.readFile("./data/userlist.json",function(err,data){
		if(err){
			res.send(err)
		}else{
			var arr=JSON.parse(data)
			console.log(arr)
			var bol=false;//没注册过
			for(var i=0;i<arr.length;i++){
				if(arr[i].tel==tel&&arr[i].pass==pass){
					delete arr[i].pass;
					res.send("ok")
					bol=true;
				}
			}
			if(!bol){
				res.send("未注册，请先注册")
			}
		}
		
	})
})
//手机号验证接口
http.get("/repeateTel",function(req,res){
	var tel=req.query.tel;
	fs.readFile("./data/userlist.json",function(err,data){
		if(err){
			res.send(err)
		}else{
			var bol=false;//未注册
			var arr=JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				if(arr[i].tel==tel){
				res.send("该手机号已被注册")
				bol=true;
			    }
			}
			if(!bol){
				res.send("可以注册")
			}
		}
	})
})
//返回验证码接口
/*
 * 返回一个随机数4位数或者5位数
 */
var ff=require("./src/js/rand.js");//导入自定义的随机数模块

http.get("/yzm",function(req,res){
	var str="";
	var count=Math.random()>0.5?4:5;//定义一个变量，表示几位数
	for(var i=0;i<count;i++){
		str+=ff.rand(0,9)
	}

	res.send(str)
})
//获取校验码接口
/*
 * 前台需要发送手机号
 */
http.get("/xym",function(req,res){
	var tel=req.query.tel;
	var str="";
	for(var i=0;i<6;i++){
		str+=ff.rand(0,9)
	}
	var time=(new Date()).getTime();//获取当前的毫秒数
	fs.readFile("./data/xiaoyan.json",function(err,data){
		if(err){
			res.send(err)
		}else{
			var bol=false;//手机号没存在
			var arr=JSON.parse(data);//获取到校验码数组
			/*
			 * {
			 * 	tel：tel，
			 * xym:str,
			 * time:time
			 * }
			 */
			for(var i=0;i<arr.length;i++){
				if(arr[i].tel==tel){
					bol=true;
					arr[i].xym=str;
					arr[i].time=time;
				}
			}
			if(!bol){
				arr.push({
					tel:tel,
					time:time,
					xym:str
				})
			}
			fs.writeFile("./data/xiaoyan.json",JSON.stringify(arr),function(err){
				res.send(str)
			})
		}
		
	})
})
//验证校验码接口
http.get("/yzxym",function(req,res){
//	console.log(req.query)
	var tel =req.query.tel;
	var time=(new Date()).getTime();
	var xym=req.query.xym;
	var pass=req.query.pass;
	fs.readFile("./data/xiaoyan.json",function(err,data){
		
		if(err){
			res.send(err)
		}else{
			var arr=JSON.parse(data);
			for(var i=0;i<arr.length;i++){
				if(tel==arr[i].tel){
					console.log(arr)
					if(time-arr[i].time>=120000){
						res.send("校验码逾期失效")
					}else{
						if(xym==arr[i].xym){//把用户信息添加到userlist.json
//							res.send("验证码匹配成功")
							fs.readFile("./data/userlist.json",function(err,data){
								if(err){
									res.send(err)
								}else{
									var user=JSON.parse(data);
									user.push({
					 			 		id:(new Date()).getTime(),
					 			 		tel:tel,
					 			 		pass:pass
					 			 	})
									fs.writeFile("./data/userlist.json",JSON.stringify(user),function(err){
										res.send("注册成功")
									})

								}
							})
						}else{
							res.send("校验码不匹配")
						}
					}
				}
			}
		}
	})
})
//注册接口
http.get("/ejs",function(req,res){
    var path=req.query.path;
    console.log(path)
    fs.readFile("./src/html/"+path+".ejs",function(err,data){
    	if(err){
    		console.log(err)
    	}else{
    		var str=data.toString();
    		res.send(ejs.render(str));
    	}
    })
})
//文件托管
http.all("*",function(req,res){
	res.sendFile(__dirname+req.url);
})
