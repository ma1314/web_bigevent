$(function(){
    // 获取layui提供得到成员
    var form=layui.form
    // 自定义form效验的
    form.verify({
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        samePwd: function(value) {
          if (value === $('[name=oldPwd]').val()) {
            return '新旧密码不能相同！'
          }
        },
        rePwd: function(value) {
          if (value !== $('[name=newPwd]').val()) {
            return '两次密码不一致！'
          }
        }
      })

    $('.layui-form').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type:'post',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){
                    return layui.layer.msg(res.message)
                }else{
                    layui.layer.msg("恭喜密码修改成功");
                    //重置表单，不能用$(this)
                    $(".layui-form")[0].reset();
                }
            }
        })
    })
})

