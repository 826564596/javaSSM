
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <title>待考核课程列表页面</title>
    <%--body加入淡入淡出动画,解决iframe切换闪烁--%>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body>
<table id="dg" title="所有待考核记录" class="easyui-datagrid" style="width:auto;height:auto"
       url=""
       toolbar="#toolbar"
       rownumbers="true" fitColumns="true" singleSelect="true"
       pagination="true" pageSize="5" pageList="[5,10,15,20,25]"
>
    <thead>
    <tr>
        <th field="bId" align="center">约课记录编号</th>
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
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="showCheckWindow()">点击考核</a>
</div>

<%-- 考核课程对话框 --%>
<div id="dlg" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg2-buttons">
    <form id="fm" method="post">
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 22px;"><b style="color: red;">约课记录编号:</b></label>
            <input name="bId" class="easyui-textbox" style="width: 50%; color: red;" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 22px">选择考核结果:</label>
            <select name="checkState" class="easyui-combobox" style="width: 50%;" panelHeight="auto">
                <option value= 1>考核中</option>
                <option value= 2>通过</option>
                <option value= 3>未通过</option>
            </select>
        </div>
    </form>
    <div id="dlg2-buttons">
        <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveCheckState()">保存</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
    </div>
</div>


</body>

<script type="text/javascript" src="../js/utils/paging.foreasyui.js"></script>
<script type="text/javascript" src="checkCourseList.js"></script>

<script type="text/javascript">

    $('body').addClass('active');
    console.log("checkCourseList页面加载完成");

    showCheckCourseList();

</script>
</html>
