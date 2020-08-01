// 注意：每次调用$.get()或$.post或则$.ajax的时候，会先调用这个函数，这个函数中，可以拿到我们给Ajax提供的配置对象
// 拦截/过滤每一次ajax请求，配置每次请求需要的参数
// 设置路径（测试）
var baseURL="http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function(options){
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url=baseURL+options.url;
    // console.log(option.url);
    // console.log(options);

    if(options.url.indexOf('/my/')!=-1){
       options.headers={
            Authorization:localStorage.getItem('token') ||''
       }
    }

    // 所有得请求完成之后都要进行身份认证判断
    options.complete=function(res){
    //   console.log(444);
            var data=res.responseJSON;
            console.log(data);
            if(data.status ==1 && data.message=='身份认证失败！'){
            //    删除tokan
                localStorage.removeItem("token")
            // 页面跳转
                location.href="/login.html"
                
            }
        }
  


})