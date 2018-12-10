
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <title>课程列表页面</title>
    <%--body加入淡入淡出动画,解决iframe切换闪烁--%>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body>
<table id="dg" title="所有学员选课信息" class="easyui-datagrid" style="width:auto;height:auto"
       url=""
       toolbar="#toolbar"
       rownumbers="true" fitColumns="true" singleSelect="true"
       pagination="true" pageSize="10" pageList="[10,15,20,25]"
>
    <thead>
    <tr>
        <th field="openId" align="center">用户标识</th>
        <th field="course.courseName" formatter="formatCourseName" align="center">课程名称</th>
        <th field="course.hours" formatter="formatCourseHours" align="center">课时数</th>
        <th field="bookingDate" align="center">预约日期</th>
        <th field="signNum" align="center">签到次数</th>
        <th field="progress" formatter="formatProgress" align="center">当前进度</th>
    </tr>
    </thead>
</table>
<div id="toolbar">
    <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="showUserInfo()">查看用户信息</a>
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="showCourseInfo()">查看课程信息</a>
</div>

<%-- 用户信息框 --%>
<div id="dlg" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg2-buttons">
    <form id="fm">
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 10px;">用户唯一标识:</label>
            <input name="openId" class="easyui-textbox" style="width: 60%; color: red;" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 10px">用户昵称:</label>
            <input name="nickName" class="easyui-textbox" style="width: 50%; color: red;" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 10px">用户头像:</label>
            <input name="avatarUrl" class="easyui-textbox" style="width: 80%; color: red;" editable="false">
        </div>
    </form>
</div>

<%-- 课程信息框 --%>
<div id="dlg2" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg2-buttons">
    <form id="fm2">
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 8px;">课程编号:</label>
            <input name="courseNo" class="easyui-textbox" style="width: 60%;" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 8px;">课程名称:</label>
            <input name="courseName" class="easyui-textbox"  style="width: 80%" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 8px;">课程介绍:</label>
            <input name="blurb" class="easyui-textbox" style="width: 80%; height:80px" data-options="multiline:true" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 21px">课时数:</label>
            <input name="hours" class="easyui-textbox" style="width: 60%;" editable="false">
        </div>
    </form>
</div>


</body>

<script type="text/javascript" src="../js/utils/paging.foreasyui.js"></script>
<script type="text/javascript" src="userList.js"></script>

<script type="text/javascript">

    $('body').addClass('active');
    console.log("userList页面加载完成");

    showUserCourseForm();

</script>
</html>
