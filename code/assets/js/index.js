$(function(){
    //获取用户信息
    getUserInfo()
   
    // 退出登录
    // 引入layer
    var layer=layui.layer
    $("#btnLogout").on("click",function(){
        // 提示提示框
        layer.confirm('是否确认退出', {icon: 3, title:'提示'}, function(index){
            layer.close(index)
            // 删除本地token
            localStorage.removeItem("token");
            // 页面跳转
            location.href="/login.html"
          });     
    });
  
});

// 获取用户信息封装
function  getUserInfo(){
    $.ajax({
        type:'get',
        url:'/my/userinfo',
        //headers就是请求配置头像
        // 注意：headers属性区分大小写
        // headers:{
        //     Authorization:localStorage.getItem('token') ||''
        // },
        success:function(res){
            //token可能24小时就失效了，所以需要重新登录
            console.log(res);
            if(res.status!=0){
                //判断用户是否查询成功
                return layui.layer.msg(res.message)
                
            
            }
             //调用用户渲染函数 
            renderAvatar(res.data);
        },
        // 不论请求成功还是失败，最终都会调用complate
       


    })  

}


//封装用户渲染函数
function renderAvatar(user){
    var uname=user.nickname|| user.username;
    $('#welcome').html("欢迎&nbsp;"+uname);
    if(user.user_pic!==null){
        // 渲染用户头像
        //判断用户头像信息，如果有就渲染图片，如果没有就渲染文字
        $(".layui-nav-img").show().attr("src",user.user_pic);
        $(".text-avatar").hide();
    }else{
        $(".layui-nav-img").hide()
        $(".text-avatar").show().html(uname[0].toUpperCase());
    }
}
