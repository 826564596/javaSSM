

// 请求全部教师信息数据
function showTeacherForm() {
    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallteacher",
        success: function (res) {
            console.log("ajax获取全部教师信息成功 :");
            console.log(res);
            $('#dg').datagrid({loadFilter: pagerFilter }).datagrid('loadData',res.data);
            // 设置分页样式
            setPager();
        },
        error:function () {
            console.log("ajax访问失败");
        }
    });
}

// <<新增教师>>按钮绑定方法
function newTeacher(){
    $('#dlg').dialog('open').dialog('setTitle','正在新增培训教师信息');
    $('#fm').form('reset');
}

// 提交新增教师请求
function addTeacher(){
    $('#fm').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/addteacher",
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(res){
            var res = JSON.parse(res);
            console.log(res);
            if (res.errorMsg!=null && res.errorMsg!=""){
                $.messager.show({
                    title: '错误提示',
                    msg: res.errorMsg+'，教师编号可能重复！！'
                });
            } else {
                $('#dlg').dialog('close');		// close the dialog
                showTeacherForm();	// reload the user data
            }
        }
    });
}

// <<更新教师信息>>按钮绑定方法
function editTeacher() {
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg2').dialog('open').dialog('setTitle','正在更新教师信息');
        $('#fm2').form('load',row);
        // $('#label').append("<b style='margin-left: 23px'>"+row.id+"</b>");
        console.log(row);
    } else{
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行教师信息!!!',
            icon: 'warning'
        });
    }
}

// 提交更新教师请求
function updateTeacher() {
    $('#fm2').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/updateteacher",
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(res){
            var res = JSON.parse(res);
            console.log(res);
            if (res.errorMsg!=null && res.errorMsg!=""){
                $.messager.show({
                    title: '错误提示',
                    msg: res.errorMsg
                });
            } else {
                $('#dlg2').dialog('close');		// close the dialog
                showTeacherForm();	// reload the user data
            }
        }
    });
}

// 提交删除教师请求
function destroyTeacher(){
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $.messager.defaults = { ok: "确定", cancel: "取消",width:'300px',height:'170px' };
        $.messager.confirm('提示','确定删除该教师吗？',function(r){
            if (r){
                $.ajax({
                    url:"http://localhost:5757/ssm-web/manager/deleteteacher",
                    contentType: "application/json;charset=utf-8",
                    type: "POST",
                    data: JSON.stringify({id:row.id}),
                    success: function (res) {
                        if (res.success){
                            showTeacherForm();
                        } else{
                            $.messager.show({
                                title: '提示',
                                msg: res.errorMsg
                            });
                        }
                    },
                    error:function () {
                        console.log("ajax请求结果失败");
                    }
                })
            }
        });
    } else{
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行教师信息!',
            icon: 'warning'
        });
    }
}
