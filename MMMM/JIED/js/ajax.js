function ajax({
	type,//请求类型:get/post
	url,//请求地址,不要带"?"
	data,//请求参数
	dataType//text/html/json
}){
	return new Promise(function(callback){
		var xhr=null;//1.创建异步对象
		if(window.XMLHttpRequest){//标准创建
			xhr=new XMLHttpRequest();
		}else{//IE8以下
			xhr=new ActiveXObject("Microsoft.XMLHttp");
		}
		//2.设置回调函数
		xhr.onreadystatechange=function(){
			if(xhr.readyState==4&&xhr.status==200){
				var res=xhr.responseText;
				if(dataType!==undefined
						&&dataType.toLowerCase()==="json")
					res=JSON.parse(res);
				//处理res的逻辑
				callback(res);
			}
		}
		//增加：更改请求消息头
		if(type.toLowerCase()==="post")
			xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		//data:"username=dingding&upwd=123456"
		if(data!==undefined&&type.toLowerCase()==="get")
			url+="?"+data;
		xhr.open(type,url,true);//3.创建请求
		//4.发送请求
		if(data!==undefined
				&&type.toLowerCase()==="post")
			xhr.send(data);
		else
			xhr.send(null);
	});
}
//ajax("get","header.html").then(function(res){
	//使用res
//})
//封装适合各种情况的简化版ajax函数
/*function ajax({//利用解构，获取将来参数对象中每个属性值
  type,//请求类型: "get"||"post"
  url,//请求的url地址: "xxx.php"
  data,//请求携带的参数: "变量1=值&..."
  dataType,//服务器端返回值类型: "json"||"text"
}){
  //服务器端返回值类型默认为text
  dataType=dataType||"text";
  //只要远程请求，必有延迟，只要延迟，比用promise等待完成后，才执行后续操作
  return new Promise(function(resolve){//.then()
    //AJAX 4步/5步:
    var xhr=new XMLHttpRequest();//1.获得xhr对象
    //如果是get请求，且传入了data参数，才需要拼接url和data为get请求的完整地址
    if(type.toLowerCase()=="get"&&data!==undefined)
      url+="?"+data;
    xhr.open(type,url,true);//2. 建立连接
    //3. 设置请求状态回调函数
    xhr.onreadystatechange=function(){
      //如果请求完成，且成功!
      if(xhr.readyState==4&&xhr.status==200){
        //如果服务器端响应类型不是json，则调用后续resolve操作，并传入原始responseText，做后续处理
        if(dataType.toLowerCase()!="json")
          resolve(xhr.responseText);
        else//如果服务器端响应类型是json，则自动调用JSON.parse转为js对象，再交给resolve函数做后续处理
          resolve(JSON.parse(xhr.responseText));
      }
    }
    //只有type为post，才需要设置请求头
    if(type.toLowerCase()=="post")
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    //只有type为post，才需要send时，传入参数
    xhr.send(type.toLowerCase()=="post"?data:null);
  })
}*/