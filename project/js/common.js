$(function(){
	var quickroad=$('footer li');
	quickroad.click(function(){
		if($(this).index()==0){
			window.location="../html/index.html";
		}else if($(this).index()==3){
			window.location="../html/personal.html";
		}else if($(this).index()==1){
			window.location="../html/search.html";
		}
	});
	var usename=$('#usename');
	var userpassword=$('#userpassword');
	var loginbtn=$('#login-main');
	/*登录*/
	/*用户名验证*/
	usename.focusout(function(){
		if(!/^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i.test(usename.val())){
			alert("手机格式不正确!");
		}
	})
	/*密码验证*/
	userpassword.focusout(function(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/user/json/login.do",
			data:"loginname="+usename.val()+"&password="+userpassword.val(),
			async:true,
			success:function(data){
				if(JSON.parse(data).ecode==500){
					alert("用户名不存在或密码不正确！");
				}
			}
		});
	})
	loginbtn.click(function(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/user/json/login.do",
			data:"loginname="+usename.val()+"&password="+userpassword.val(),
			async:true,
			success:function(data){
				console.info(data);
				window.location="index.html";
				localStorage.setItem("username",JSON.parse(data).data.loginuser.loginname);
				localStorage.setItem("userpassword",JSON.parse(data).data.loginuser.nickname);
				localStorage.setItem("signnature",JSON.parse(data).data.loginuser.signnature);
				localStorage.setItem("avatarpath",JSON.parse(data).data.loginuser.avatarpath);
				localStorage.setItem("id",JSON.parse(data).data.loginuser.id);
			}
		});
	})
	var registerphone=$("#reginsterphone");
	var registerpassword=$("#reginsterpassword");
	var nickname=$("#nickname");
	var register=$(".register");
	/*注册*/
	register.click(function(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/user/json/reg.do",
			data:"loginname="+registerphone.val()+"&password="+ registerpassword.val()+"&nickname="+nickname.val(),
			async:true,
			success:function(data){
				console.info(data)
			}
		});
	})
	var retrievephone=$('#retrievephone');
	var retrievepassword=$('#retrievepassword');
	var retrieve=$('.retrieve');
	var gain=$('.gain');
	gain.click(function(){
		$.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/checkcode/json/request/sms.do",
			data:"phonenumber="+retrievephone.val(),
			async:true,
			success:function(data){
				console.info(data)
			}
		});
	})
	/*搜索*/
	var searchRoad=$("#search-road");
	var searchbtn=$("#search-btn");
	searchbtn.click(function(){
		var arr=[];
		$.ajax({
			type:"get",
			url:"http://localhost:8080/Proxy/FootBall/user/json/queryall.do",
			data:"keyword="+searchRoad.val()+"&loginsuserid="+localStorage.getItem("id")+"&page.pageNo="+1,
			async:true,
			success:function(data){
				console.info(JSON.parse(data).data.userlist[0]);
				var arry_object=JSON.parse(data).data.userlist;
				/*加载搜索发现的用户*/
				$('.userinformation').empty();
				for (var i=0;i<arry_object.length;i++) {
					var _li=$("<li><div class='head-pic'><img src='http://101.200.173.217:8080/FootBall"+arry_object[i].avatarpath+"'/></div>"
					+"<div class='details'><div class='username'>"+arry_object[i].nickname+"</div><div class='usertall'>"+arry_object[i].signnature+"</div></div><button type='button' onclick='upload("+arry_object[i].id+")'>关注</button></li>")
					$('.userinformation').append(_li);
					arr.push(arry_object[i].id)
				}
				var searchattention=$('.userinformation>li>button')
			}
		});
	})
})

function upload(d){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/attention/json/follow.do",
		data:"loginsuserid=619&tagetuserid="+d,
		async:true,
		success:function(data){
			console.info(data)
		}
	});
}







