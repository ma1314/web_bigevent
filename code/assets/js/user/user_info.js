$(function(){
    // 1.定义效验规则
    var form=layui.form;
    var layer=layui.layer
    form.verify({
        nickname:function(value){
            if(value.trim()>6){
            return "昵称应该输入2~6位"
            }
        }
    })
    // 初始化用户信息
    initUserInfo();

    function initUserInfo(){
        $.ajax({
            type:'get',
            url:'/my/userinfo',
            success:function(res){
                if(res.status!==0){
                    return layer.msg(res.message)
                }
                //展示用户信息
                // console.log(res)
                form.val("formUserInfo",res.data)
            }
           
        })
    }
//    重置(只接受click事件绑定)表单数据
    $("#btnRest").on("click",function(e){
        //取消浏览器的默认重置
        e.preventDefault();
        //初始化用户信息
        initUserInfo()
    })

    //监听表单的提交事件(提高用户修改)
    $(".layui-form").on("submit",function(e){
        console.log(444);
        e.preventDefault();
        $.ajax({
            type:'post',
            url:'/my/userinfo',
            data:$(this).serialize(),
            success:function(res){
             if(res.status!==0){
                 return layer.msg("用户修改失败")
             } else{
                 layer.msg("用户修改成功")
                 //刷新夫框架里面的用户信息
                 window.parent.getUserInfo()
             }  
            }
        })
    })
})