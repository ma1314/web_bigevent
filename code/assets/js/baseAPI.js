// 注意：每次调用$.get()或$.post或则$.ajax的时候，会先调用这个函数，这个函数中，可以拿到我们给Ajax提供的配置对象
// 拦截/过滤每一次ajax请求，配置每次请求需要的参数
// 设置路径（测试）
var baseURL="http://ajax.frontend.itheima.net";
$.ajaxPrefilter(function(options){
    //在发起真正的ajax请求之前，统一拼接请求的根路径
    options.url=baseURL+options.url;
    // console.log(option.url);
    console.log(options);
})