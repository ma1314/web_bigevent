$(function(){
    // 点击按钮，切换登录和注册部分页面
    $("#link_reg").on("click",function(){  // 注册
   
        $(".login-box").hide()     // 注册 
        $(".reg-box").show()  //登录
    })
    $("#link_login").on("click",function(){  //登录
   
        $(".login-box").show()      // 注册
        $(".reg-box").hide()  //登录
    })

    // 从layui中获取form对象
    var form=layui.form
    //通过form.verify()函数子当以效验规则
    form.verify({
        //属性的值可以是数组，也可以是函数
        pwd:[/^[\S]{6,12}$/,"密码为6-12位,不能包含空格!"],
        //效验两次密码是否一致的规则
        repwd:function(value){
          //通过形参拿到的
        //   var pwd=$('.reg-box [name=password]').val()
        //   if(pwd!==value){
        //       return '两次密码不一致'
        //   }
            if($("#reg-pwd").val()!==value){
                return '两次密码不一致'
            }
        }
    })
    var layer=layui.layer
  //监听注册表单的提交事件
  $("#form_reg").on('submit',function(e){
    console.log(1111);
        e.preventDefault()
     
        $.ajax({
            type:'post',
            url:'/api/reguser',
           data:{
               username:$("#form_reg [name=username]").val(),
               password:$("#form_reg [name=password]").val()
            //    $("#form_reg").serialize()
           },
           
            success:function(res){
                // 注册失败效验
                if(res.status!=0){
                    // return alert(res.message)
                   return layer.msg(res.message)
                   
                }
                // 注册成功提示
               layer.msg(res.message)
               $("#link_login").click();
               $("#form_reg")[0].reset();
            }
        })

  })


  //监听登录表单的提交事件
  $("#form_login").on("submit",function(e){
      e.preventDefault()
      $.ajax({
          type:'post',
          url:'/api/login',
        //   data:$("#link_login").serialize(),
          data:$(this).serialize(),
          success:function(res){
              if(res.status!=0){
                //   登录失败提示
                  return layer.msg(res.message);
              }
            //   登录成功提示
              layer.msg(res.message)
              //保存token
              localStorage.setItem('token',res.token)
              location.href="/index.html"
          }
      })
  })


})