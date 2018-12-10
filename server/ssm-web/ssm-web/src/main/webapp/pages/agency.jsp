
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">

    <%--<script type="text/javascript" src="../js/jquery/jquery-1.11.3.min.js"></script>--%>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <title>机构信息页面</title>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body>
    <div class="easyui-panel" title="机构信息" style="width:auto;padding:30px 60px">
        <form id="ff" class="easyui-form" method="post">
            <div class="fitem" style="margin-top:20px;color: red;font-size: medium;">
                <label style="margin-right: 23px;"><b>机构名称:</b></label><b>v课堂</b>
                <input class="easyui-textbox" name="aName" editable="false" type="hidden">
            </div>
            <div class="fitem" style="margin-top:20px;">
                <label style="margin-right: 40px;">第一张图片资源:</label>
                <input class="easyui-textbox" name="firstImg"  data-options="required:true,validType:'url'" style="width:50%;">
            </div>
            <div class="fitem" style="margin-top:20px">
                <label style="margin-right: 40px;">第二张图片资源:</label>
                <input class="easyui-textbox" name="secondImg" data-options="required:true,validType:'url'" style="width:50%;">
            </div>
            <div class="fitem" style="margin-top:20px">
                <label style="margin-right: 40px;">第三张图片资源:</label>
                <input class="easyui-textbox" name="thirdImg"  data-options="required:true,validType:'url'" style="width:50%;">
            </div>
            <div class="fitem" style="margin-top:20px">
                <label style="margin-right: 70px;">机 构 地 址:</label>
                <input class="easyui-textbox" name="address"  data-options="required:true" style="width:50%;">
            </div>
            <div class="fitem" style="margin-top:20px">
                <label style="margin-right: 70px;">联 系 方 式:</label>
                <input class="easyui-textbox" name="phoneNum"  data-options="required:true" style="width:50%;">
            </div>
            <div class="fitem" style="margin-top:20px">
                <label style="margin-right: 40px;">简    介:</label>
                <input class="easyui-textbox" name="aInfo" data-options="required:true,multiline:true" style="width:57%;height: 90px" >
            </div>
            <div class="fitem" style="margin-top:30px">
                <a class="easyui-linkbutton" iconCls="icon-ok" style="width:70%;height: 35px;" onclick="toSave();">保存修改</a>
            </div>
        </form>
    </div>
</body>
<script type="text/javascript">
    $('body').addClass('active');
    console.log("机构信息页面加载完成");

    showAgencyForm();

    function showAgencyForm () {
        $.ajax({
            url:"<%=request.getContextPath()%>/manager/showagency",
            success: function (res) {
                console.log("ajax获取机构信息成功");
                console.log(res);
                $('#ff').form('load',res.data); //数据赋到表单对应name
            },
            error:function () {
                console.log("ajax访问失败");
            }
        })
    }

    function toSave() {
        console.log("进入toSave方法");
        $('#ff').form('submit',{
            url: "<%=request.getContextPath()%>/manager/saveagency",
            onSubmit: function(){
                return $(this).form('validate');
            },
            success: function(res){
                var res = JSON.parse(res);
                console.log(res);
                if (res.errorMsg!=null && res.errorMsg!=""){
                    $.messager.show({
                        title: '提示',
                        msg: res.errorMsg
                    });
                } else {
                    $.messager.show({
                        title: '提示',
                        msg: '保存成功！'
                    });
                    showAgencyForm();	// reload the user data
                }
            }
        });
    }

    function ajxData(data) {
        console.log("请求参数：");
        console.log(data);
        $.ajax({
            url:"<%=request.getContextPath()%>/manager/saveagency",
            contentType: "application/json;charset=utf-8",  //不设置datatype将参考contentType中的格式
            type: "POST",
            data: JSON.stringify(data),
            success: function (res) {
                console.log("ajax请求后台修改结果成功");
                window.location.reload();  //当前iframe页面自己重新加载
                if(res==false){  //返回结果标志：true/false(操作失败)
                    $.messager.show({
                        title: '提示',
                        msg: '后台修改出错'
                    });
//                    $("#link1",parent.document)[0].click(); //操作失败，调用iframe外层的方法重新加载该页面
                }

            },
            error:function () {
                console.log("ajax请求结果失败");
            }
        })
    }
</script>
</html>
