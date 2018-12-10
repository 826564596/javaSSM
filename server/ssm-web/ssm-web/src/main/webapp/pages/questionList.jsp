<%--
  Created by IntelliJ IDEA.
  User: hasee
  Date: 2018/9/11
  Time: 21:58
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>问题列表</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/default/easyui.css">
    <link rel="stylesheet" type="text/css" href="../js/easyui/themes/icon.css">

    <script type="text/javascript" src="../js/jquery/jquery-1.11.3.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.min.js"></script>
    <script type="text/javascript" src="../js/easyui/jquery.easyui.min.js"></script>
    <%--<script type="text/javascript" src="../js/easyui/locale/easyui-lang-zh_CN.js"></script>--%>
    <title>问题列表页面</title>

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
        <th field="q_no" width="10" align="center">问题编号</th>
        <th field="question" width="40" align="center">问题</th>
        <th field="c_id" width="20" align="center">课程编号</th>
        <th field="name" width="20" align="center">用户</th>
        <th field="answer" width="20" align="center">答案</th>

        <%--<th field="isExist" width="40" align="center">是否在职(1:在职/0:离职)</th>--%>
    </tr>
    </thead>
</table>
<div id="toolbar">
    <a href="#" class="easyui-linkbutton" iconCls="icon-edit" plain="true" onclick="editAnswer()">添加问题答案</a>
</div>


<div id="dlg3" class="easyui-dialog" style="width:500px; height:auto; padding:20px 30px" closed="true" buttons="#dlg2-buttons">
    <form id="fm3" method="post">
        <div class="fitem" style="margin-top: 5px;">
            <label style="margin-right: 22px;"><b style="color: red;">问题编号:</b></label>
            <input id="q_no" name="q_no" class="easyui-textbox" style="width: 60%; color: red;" editable="false">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <input name="question" class="easyui-textbox"  style="width: 80%" data-options="label:'问题:',required:true">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <input name="c_id" class="easyui-textbox" style="width: 80%; height:60px" data-options="label:'课程编号:', required:true">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <input name="name" class="easyui-textbox" style="width: 80%; height:60px" data-options="label:'用户:', required:true">
        </div>
        <div class="fitem" style="margin-top: 5px;">
            <input  id="answer" name="answer" class="easyui-textbox" style="width: 80%; height:60px" data-options="label:'答案:', required:true">
        </div>
    </form>

    <div id="dlg2-buttons">
        <a href="#" class="easyui-linkbutton" iconCls="icon-ok" onclick="saveAnswer()">保存</a>
        <a href="#" class="easyui-linkbutton" iconCls="icon-cancel" onclick="javascript:$('#dlg2').dialog('close')">取消</a>
    </div>
</div>






</body>
<script type="text/javascript" src="../js/utils/paging.foreasyui.js"></script>
<script type="text/javascript" src="questionList.js"></script>
<script type="text/javascript">

    $('body').addClass('active'); //防止body闪烁
    console.log("questionList页面加载完成");
    showQuestionForm();

    // function editAnswer() {
    //     var row = $('#dg').datagrid('getSelected');
    //     if (row) {
    //         $('#dlg2').dialog('open').dialog('setTitle', '正在修改问题信息');
    //         $('#fm3').form('clear');
    //         $('#fm3').form('load', row);
    //         // $('#label').append("<b style='margin-left: 24px'>"+row.courseNo+"</b>");
    //         console.log(row);
    //     } else {
    //         $.messager.alert({
    //             title: '提示',
    //             msg: '请先选择一行课程信息!!!',
    //             icon: 'warning'
    //         });
    //     }
    //
    // }
    //
    //
    //
    // function saveAnswer() {
    //     // var answer= getParameter("answer");
    //    console.log("updateAnswer");
    //     $('#fm3').form('submit', {
    //         url: "http://localhost:5757/ssm-web/manager/updateAnswer",
    //         // contentType :'application/json;charset=utf-8',
    //         // dataType : "json",
    //         // data: $('#fm2').serialize(),
    //         onSubmit: function () {
    //             return $(this).form('validate');
    //         },
    //
    //         success: function (res) {
    //             var res = JSON.parse(res);
    //             console.log(res);
    //             console.log('asd');
    //             if (res.errorMsg != null && res.errorMsg != "") {
    //                 $.messager.show({
    //                     title: '提示',
    //                     msg: res.errorMsg
    //                 });
    //             } else {
    //                 $('#dlg2').dialog('close');		// close the dialog
    //                 showQuestionForm();	// reload the user data
    //             }
    //         }
    //     });
    //
    //     $("#fm2").submit(function(e){
    //         alert("Submitted");
    //     });
    //
    // }





</script>

</html>
