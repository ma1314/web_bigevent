$(function(){

var layer=layui.layer

// 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

//   位上传按钮绑定点击事件(修改上传图片)
$("#btnChooseImage").on("click",function(){
    $("#file").click();
})

// 为文件选择绑定chage事件(input改变，渲染裁剪区域)
$("#file").on("change",function(e){
    console.log(e.target.files);
    console.log($("#file")[0].files);
    console.log(document.querySelector("#file").files);
    // 只获取唯一的文件
    var file=e.target.files[0];
    // 原生js的方法，在内存中生成一个图片的路径
    var newImgURL=URL.createObjectURL(file);
    //  渲染到裁剪区
    $image
    .cropper('destroy')  //销毁旧的裁剪区域
    .attr('src',newImgURL) //重新设置图片路径
    .cropper(options)           //重新初始化裁剪区域
     })


    //  头像上传
    $("#btnUpload").on("click",function(){
      var dataURL = $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png') // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
           //ajax
      $.ajax({
        type:'post',
        url:'/my/update/avatar',
        data:{
          avatar:dataURL
        },
        success:function(res){
          //返回效验
          if(res.status!==0){
            return layui.layer.msg(res.message)
          }
          layui.layer.msg("头像上传成功");
          //刷新夫框架中的硌人资料
          window.parent.getUserInfo()
        }
      })
    })





})