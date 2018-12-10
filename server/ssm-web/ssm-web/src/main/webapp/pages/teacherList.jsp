
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">

    <script type="text/javascript" src="../js/jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <%--<script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>--%>
    <title>培训老师列表页面</title>

    <%--body加入淡入淡出动画,解决iframe切换闪烁--%>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body>
    <table id="dg" class="easyui-datagrid" style="width:auto;height:auto"
           toolbar="#toolbar"
           rownumbers="true" fitColumns="true" singleSelect="true" loadMsg="Processing, please wait …"
           pagination="true" pageSize="5" pageList="[5,10,15,20,25]"
    >
        <thead>
        <tr>
            <th field="id" width="30" align="center">教师编号</th>
            <th field="name" width="30" align="center">姓名</th>
            <th field="age" width="20" align="center">年龄</th>
            <th field="avatarImg" width="50" align="center">头像URL</th>
            <th field="blurb" width="50" align="center">简介</th>
            <th field="workTime" width="20" align="center">从业时间(年)</th>
            <%--<th field="isExist" width="40" align="center">是否在职(1:在职/0:离职)</th>--%>
        </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newTeacher()">新增教师</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editTeacher()">更新教师信息</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyTeacher()">删除教师信息</a>
    </div>

    <%-- 新增教师表单对话框 --%>
    <div id="dlg" class="easyui-dialog" style="width:400px;height:350px;padding:20px 30px"
         closed="true" buttons="#dlg-buttons">
        <%--<div class="ftitle" style="font-size: medium">培训教师信息</div>--%>
        <form id="fm" method="post">
            <div class="fitem" style="margin-top: 5px;">
                <label>教师编号:</label>
                <input name="id" class="easyui-validatebox" required="true" style="margin-left: 20px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>姓名:</label>
                <input name="name" class="easyui-validatebox" required="true" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>年龄:</label>
                <input name="age" class="easyui-validatebox" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>头像:</label>
                <input name="avatarImg" class="easyui-validatebox" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>简介:</label>
                <%--<input name="blurb" class="easyui-validatebox" type="text" style="margin-left: 45px">--%>
                <textarea name="blurb" class="easyui-validatebox" style="width:60%;height: 60px;margin-left: 48px"></textarea>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>从业时间(年):</label>
                <input name="workTime" class="easyui-validatebox" required="true" style="margin-left: 20px">
            </div>
        </form>
    </div>
    <div id="dlg-buttons">
        <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="addTeacher()">提交</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
    </div>

    <%-- 更新教师表单对话框 --%>
    <div id="dlg2" class="easyui-dialog" style="width:400px;height:350px;padding:20px 30px"
         closed="true" buttons="#dlg2-buttons">
        <form id="fm2" method="post">
            <div class="fitem">
                <label id="label"><b style="color: red;">教师编号:</b></label>
                <input name="id" class="easyui-validatebox" editable="false" style="margin-left: 20px;color: red">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>姓名:</label>
                <input name="name" class="easyui-validatebox" required="true" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>年龄:</label>
                <input name="age" class="easyui-validatebox" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>头像:</label>
                <input name="avatarImg" class="easyui-validatebox" style="margin-left: 48px">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>简介:</label>
                <textarea name="blurb" class="easyui-validatebox" style="width:60%;height: 60px;margin-left: 48px"></textarea>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label>从业时间(年):</label>
                <input name="workTime" class="easyui-validatebox" required="true" style="margin-left: 20px">
            </div>
        </form>
    </div>
    <div id="dlg2-buttons">
        <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="updateTeacher()">提交</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg2').dialog('close')">取消</a>
    </div>

</body>

<script type="text/javascript" src="../js/utils/paging.foreasyui.js"></script>
<script type="text/javascript" src="teacherList.js"></script>
<script type="text/javascript">

    $('body').addClass('active'); //防止body闪烁
    console.log("teacherList页面加载完成");
    showTeacherForm();

</script>
</html>
