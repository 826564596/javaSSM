
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">

    <%--<script type="text/javascript" src="../js/jquery/jquery-1.11.3.min.js"></script>--%>
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
    <table id="dg" title="所有课程信息" class="easyui-datagrid" style="width:auto;height:auto"
           url=""
           toolbar="#toolbar"
           rownumbers="true" fitColumns="true" singleSelect="true"
           pagination="true" pageSize="5" pageList="[5,10,15,20,25]"
    >
        <thead>
        <tr>
            <th field="courseNo" align="center">课程编号</th>
            <th field="courseName" align="center">课程名称</th>
            <th field="blurb" align="center">课程介绍</th>
            <th field="videoUrl" align="center">视频实录</th>
            <th field="imgUrl" align="center">课程图片</th>
            <th field="courseClass" formatter="formatClass" align="center">类别</th>
            <th field="beginDate" align="center">开设日期</th>
            <th field="bookingNum" align="center">预约人数</th>
            <th field="limitBookingNum" align="center">限制预约人数</th>
            <th field="teacher.id" formatter="formatTeacher" align="center">授课老师</th>
            <th field="hours" align="center">课时数</th>
            <%--<th field="isExist" formatter="formatExist" align="center">开设状态</th>--%>
            <th field="teachTime" align="center">上课时间安排</th>
            <th field="price" align="center">预设价格(元)</th>
        </tr>
        </thead>
    </table>
    <div id="toolbar">
        <a href="#" class="easyui-linkbutton" iconCls="icon-add" plain="true" onclick="newCourse()">添加课程</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editCourse()">修改课程</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-remove" plain="true" onclick="destroyCourse()">下架课程</a>
    </div>

    <%-- 新增课程表单对话框 --%>
    <div id="dlg" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg-buttons">
        <form id="fm" method="post">
            <div class="fitem" style="margin-top: 5px;">
                <input name="courseNo" class="easyui-textbox" style="width: 80%" data-options="label:'课程编号:',required:true">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="courseName" class="easyui-textbox"  style="width: 80%" data-options="label:'课程名称:',required:true">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="blurb" class="easyui-textbox" style="width: 80%; height:60px" data-options="label:'课程介绍:', multiline:true">
            </div>
            <div class="fitem" style="margin-top: 10px;">
                <input name="videoUrl" class="easyui-textbox" style="width: 80%" data-options="label:'课程视频:', validType:'url'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="imgUrl" class="easyui-textbox" style="width: 80%" data-options="label:'课程图片:', validType:'url'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 50px">类别:</label>
                <select name="courseClass" class="easyui-combobox" style="width: 50%;" panelHeight="auto">
                    <option value="t" selected>精品课</option>
                    <option value="e">体验课</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input id="staff" name="teacher.id" class="easyui-combobox" style="width: 70%;"
                       data-options="label:'授课老师:', required:true, panelHeight:'auto' ">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="price" class="easyui-textbox" style="width: 80%" data-options="label:'预设价(元):', validType:'currency'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 35px">限制预约人数:</label>
                <select name="limitBookingNum" class="easyui-combobox" style="width: 50%;" panelHeight="auto" >
                    <option value=20 selected>20人次</option>
                    <option value=25>25人次</option>
                    <option value=30>30人次</option>
                    <option value=35>35人次</option>
                    <option value=40>40人次</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 35px">课时数:</label>
                <select name="hours" class="easyui-combobox" style="width: 50%;" panelHeight="auto" >
                    <option value="20" selected>20课时</option>
                    <option value="28">28课时</option>
                    <option value="36">36课时</option>
                    <option value="48">48课时</option>
                    <option value="64">64课时</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 21px">上课时间安排:</label>
                <select name="teachTime" class="easyui-combobox" style="width: 50%;" multiple=false panelHeight="auto" >
                    <option value="11" selected>周一上午</option>
                    <option value="12">周一下午</option>
                    <option value="21">周二上午</option>
                    <option value="22">周二下午</option>
                    <option value="31">周三上午</option>
                    <option value="32">周三下午</option>
                    <option value="41">周四上午</option>
                    <option value="42">周四下午</option>
                    <option value="51">周五上午</option>
                    <option value="52">周五下午</option>
                </select>
            </div>
        </form>
        <div id="dlg-buttons">
            <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="addCourse()">提交</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg').dialog('close')">取消</a>
        </div>
    </div>

    <%-- 修改课程表单对话框 --%>
    <div id="dlg2" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg2-buttons">
        <form id="fm2" method="post">
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 22px;"><b style="color: red;">课程编号:</b></label>
                <input name="courseNo" class="easyui-textbox" style="width: 60%; color: red;" editable="false">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="courseName" class="easyui-textbox"  style="width: 80%" data-options="label:'课程名称:',required:true">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="blurb" class="easyui-textbox" style="width: 80%; height:60px" data-options="label:'课程介绍:', multiline:true">
            </div>
            <div class="fitem" style="margin-top: 10px;">
                <input name="videoUrl" class="easyui-textbox" style="width: 80%" data-options="label:'课程视频:', validType:'url'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="imgUrl" class="easyui-textbox" style="width: 80%" data-options="label:'课程图片:', validType:'url'">
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 50px">类别:</label>
                <select name="courseClass" class="easyui-combobox" style="width: 50%;" panelHeight="auto">
                    <option value="t">精品课</option>
                    <option value="e">体验课</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <input name="price" class="easyui-textbox" style="width: 70%" data-options="label:'预设价(元):', validType:'currency'">
            </div>
            <%--<div class="fitem" style="margin-top: 5px;">--%>
                <%--<input id="staff2" name="teacher.id" class="easyui-combobox" style="width: 70%;"--%>
                       <%--data-options="label:'授课老师:', required:true, panelHeight:'auto'">--%>
            <%--</div>--%>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 35px">限制预约人数:</label>
                <select name="limitBookingNum" class="easyui-ck;l'?ombobox" style="width: 50%;" panelHeight="auto" >
                    <option value=20>20人次</option>
                    <option value=25>25人次</option>
                    <option value=30>30人次</option>
                    <option value=35>35人次</option>
                    <option value=40>40人次</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 35px">课时数:</label>
                <select name="hours" class="easyui-combobox" style="width: 50%;" panelHeight="auto">
                    <option value="20" selected>20课时</option>
                    <option value="28">28课时</option>
                    <option value="36">36课时</option>
                    <option value="48">48课时</option>
                    <option value="64">64课时</option>
                </select>
            </div>
            <div class="fitem" style="margin-top: 5px;">
                <label style="margin-right: 21px">上课时间安排:</label>
                <select name="teachTime" class="easyui-combobox" style="width: 50%;" multiple=false panelHeight="auto" >
                    <option value="11">周一上午</option>
                    <option value="12">周一下午</option>
                    <option value="21">周二上午</option>
                    <option value="22">周二下午</option>
                    <option value="31">周三上午</option>
                    <option value="32">周三下午</option>
                    <option value="41">周四上午</option>
                    <option value="42">周四下午</option>
                    <option value="51">周五上午</option>
                    <option value="52">周五下午</option>
                </select>
            </div>
        </form>
        <div id="dlg2-buttons">
            <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveCourse()">保存</a>
            <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg2').dialog('close')">取消</a>
        </div>
    </div>

</body>

<script type="text/javascript" src="../js/utils/paging.foreasyui.js"></script>
<script type="text/javascript" src="courseList.js"></script>

<script type="text/javascript">

    $('body').addClass('active');
    console.log("courseList页面加载完成");

    showCourseForm();
    loadStaff();

    $.extend($.fn.validatebox.defaults.rules, {
        currency : {// 验证货币
            validator : function(value) {
                return /^\d+(\.\d+)?$/i.test(value);
            },
            message : '货币格式不正确'
        }
    })
</script>
</html>
