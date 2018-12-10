<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">

    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>

    <title>后台管理-主界面</title>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body class="easyui-layout">
    <div data-options="region:'north',border:false" style="height:60px;background:#2596ea;padding:10px;">
        <div style="text-align: center;font-style: oblique; font-size: 28px;font-family: 宋体;color: white;">V课堂管理员后台管理</div>
        <div style="text-align: right;font-size: small;color:#fff;">
            欢迎 <%=session.getAttribute("managerName")%> 管理员 || <a style="text-decoration: none" onclick="toEditPassWord()">修改密码</a>
        </div>
    </div>
    <div data-options="region:'west',split:true,title:'导航菜单'" style="width:250px;padding:10px;">
        <div class="easyui-accordion" data-options="fit:false,border:false,height:200">
            <div title="机构信息" style="padding: 10px;">
                <ul class="easyui-tree" id="tree1" data-options="lines: true">
                    <li><span><a href="../pages/agency.jsp" id="link1" style="text-decoration:none" target="contentFrame">机构信息更新</a></span></li>
                </ul>
            </div>
            <div title="课程管理" style="padding: 10px;">
                <ul class="easyui-tree" id="tree2" data-options="lines: true">
                    <li><span><a href="../pages/courseList.jsp" id="link2" style="text-decoration:none" target="contentFrame">课程信息列表</a></span></li>
                </ul>
            </div>
            <div title="教师管理" style="padding: 10px ">
                <ul class="easyui-tree" id="tree3" data-options="lines: true">
                    <li><span><a href="../pages/teacherList.jsp" id="link3" style="text-decoration:none" target="contentFrame">教师信息列表</a></span></li>
                </ul>
            </div>
            <div title="学员考核管理" style="padding: 10px ">
                <ul class="easyui-tree" id="tree4" data-options="lines: true">
                    <li><span><a href="../pages/userList.jsp" id="link4" style="text-decoration:none" target="contentFrame">学员选课列表</a></span></li>
                    <li><span><a href="../pages/checkCourseList.jsp" id="link5" style="text-decoration:none" target="contentFrame">待考核列表</a></span></li>
                </ul>
            </div>

            <div title="问题管理" style="padding: 10px ">
                <ul class="easyui-tree" id="tree5" data-options="lines: true">
                    <li><span><a href="../pages/questionList.jsp" id="link6" style="text-decoration:none" target="contentFrame">问题列表</a></span></li>
                </ul>
            </div>
        </div>
    </div>
    <%--<div data-options="region:'south',border:false" style="height:50px;background:#2596ea;padding:10px;text-align: center">V Class Information Manage System</div>--%>
    <div data-options="region:'center',title:'' ">
        <iframe id="contentFrame" name="contentFrame" scrolling="auto" frameborder="0" style="width: 100%; height: 100%"></iframe>
    </div>

    <%-- 修改密码对话框 --%>
    <div id="dlg" class="easyui-dialog" style="width:450px; height:auto; padding:20px 30px" closed="true" buttons="#dlg-buttons">
        <form id="fm" method="post">
            <div class="fitem" style="margin-top: 5px;">
                <input name="password" class="easyui-textbox"  type="password" style="width: 80%;" data-options="label:'旧密码:',required:true,missingMessage:'旧密码不能为空'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="newPassword" class="easyui-textbox"  type="password" style="width: 80%;" data-options="label:'新密码:',required:true,missingMessage:'新密码不能为空'">
            </div>
        </form>
        <div id="dlg-buttons">
            <a class="easyui-linkbutton" iconCls="icon-ok" onclick="savePassWord()">保存</a>
            <a class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
        </div>
    </div>
</body>
<script type="text/javascript">

    $('body').addClass('active');

    function toEditPassWord() {
        $('#dlg').dialog('open').dialog('setTitle','正在修改管理员密码');
        $('#fm').form('clear');
    }

    function savePassWord() {
        console.log("进入savePassWord方法");
        $('#fm').form('submit',{
            url: "<%=request.getContextPath()%>/manager/savepassword",
            onSubmit: function(){
                return $(this).form('validate');
            },
            success: function(res){
                var res = JSON.parse(res);
                console.log(res);
                if (res.errorMsg!=null && res.errorMsg!=""){
                    $.messager.show({
                        title: '提示',
                        msg: res.errorMsg +'请重新输入'
                    });
                    $('#fm').form('clear');
                } else {
                    $.messager.show({
                        title: '提示',
                        msg: '密码修改成功！即将跳转到登录界面...'
                    });
                    $('#dlg').dialog('close');

                    // 延时3秒跳转到登陆界面
                    window.setTimeout(function(){
                        window.self.location = "<%=request.getContextPath()%>/manager/login";
                    },3000);
                }
            }
        });
    }
</script>
</html>