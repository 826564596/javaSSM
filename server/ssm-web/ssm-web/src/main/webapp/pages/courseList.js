

// 格式化授课教师列
function formatTeacher(val,row,index){
    return row.teacher.name;
}

// 格式化课程类别列
function formatClass(val,row,index) {
    // console.log(row.courseClass);
    return row.courseClass == "e" ? "体验课" : "精品课";
}

// 格式化开设状态列
function formatExist(val,row,index) {
    return row.isExist ? "开设中" : "已下架";
}

// 请求全部课程信息数据
function showCourseForm() {
    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallcourse",
        success: function (res) {
            console.log("ajax获取全部课程信息成功 :");
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

// <<添加课程>>按钮绑定方法
function newCourse() {
    $('#dlg').dialog('open').dialog('setTitle','正在添加课程信息');
    $('#fm').form('reset');
    // loadStaff();
}

// ajax请求教师信息，两处教师信息下拉框选项初始化
function loadStaff() {
    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallteacher",
        success: function (res) {
            console.log("ajax获取全部教师信息成功 :");
            console.log(res.data);
            // var options = opt.combobox('options');
            var options=$("#staff").combobox('options');
            options.textField="name";
            options.valueField="id";
            options.panelHeight="auto";
            $("#staff").combobox("loadData",res.data);

            // var options2=$("#staff2").combobox('options');
            // options2.textField="name";
            // options2.valueField="id";
            // options2.panelHeight="auto";
            // $("#staff2").combobox("loadData",res.data);
        },
        error:function () {
            console.log("ajax访问失败");
        }
    });
}

// 提交表单，添加课程信息
function addCourse() {
    $('#fm').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/addcourse",
        onSubmit: function(){
            return $(this).form('validate');
        },
        success: function(res){
            var res = JSON.parse(res);
            console.log(res);
            if (res.errorMsg!=null && res.errorMsg!=""){
                $.messager.show({
                    title: '错误提示',
                    msg: res.errorMsg+'，课程基本信息可能重复！！'
                });
            } else {
                $('#dlg').dialog('close');		// close the dialog
                   showCourseForm();	// reload the user data
            }
        }
    });
}

// <<修改课程>>按钮绑定方法
function editCourse() {
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg2').dialog('open').dialog('setTitle','正在修改课程信息');
        $('#fm2').form('clear');
        $('#fm2').form('load',row);
        // $('#label').append("<b style='margin-left: 24px'>"+row.courseNo+"</b>");
        console.log(row);
    } else{
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行课程信息!!!',
            icon: 'warning'
        });
    }
}
// 提交更新课程信息请求
function saveCourse() {
    $('#fm2').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/updatecourse",
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
                $('#dlg2').dialog('close');		// close the dialog
                showCourseForm();	// reload the user data
            }
        }
    });
}

// <<下架课程>>按钮绑定方法
function destroyCourse() {
    var row = $('#dg').datagrid('getSelected');
    if (row){
        console.log(row);
        $.messager.defaults = { ok: "确定", cancel: "取消",width:'300px',height:'170px' };
        $.messager.confirm('提示','确定下架该课程吗？',function(r){
            if (r){
                $.ajax({
                    url:"http://localhost:5757/ssm-web/manager/deletecourse",
                    contentType: "application/json;charset=utf-8",
                    type: "POST",
                    data: JSON.stringify({courseNo:row.courseNo}),
                    // data: {courseNo:row.courseNo},
                    success: function (res) {
                        if (res.success){
                            showCourseForm();
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
            msg: '请先选择一行课程信息!',
            icon: 'warning'
        });
    }
}