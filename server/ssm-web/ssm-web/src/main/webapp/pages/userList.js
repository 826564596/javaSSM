

// 格式化课程名称列
function formatCourseName(val,row,index){
    return row.course.courseName;
}

// 格式化学习进度列
function formatProgress(val,row,index) {
    return row.progress*100 + "%";
}

function formatCourseHours(val,row,index) {
    return row.course.hours;
}

// 请求全部用户约课信息数据
function showUserCourseForm() {
    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallbookings",
        success: function (res) {
            console.log("ajax获取全部用户约课信息成功 :");
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

// <<查看用户信息>>按钮绑定方法
function showUserInfo() {
    var row = $('#dg').datagrid('getSelected');
    if(row){
        var openId = row.openId;
        $.ajax({
            url:"http://localhost:5757/ssm-web/manager/getUserInfo",
            contentType: "application/json;charset=utf-8",
            type: "POST",
            data: JSON.stringify({openId:openId}),
            success: function (res) {
                if (res.data){
                    $('#dlg').dialog('open').dialog('setTitle','用户信息');
                    $('#fm').form('reset');
                    $('#fm').form('load',res.data);
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

    }else {
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行信息!!!',
            icon: 'warning'
        });
    }

}


// <<查看课程信息>>按钮绑定方法
function showCourseInfo() {
    var row = $('#dg').datagrid('getSelected');
    console.log(row);
    if(row){
        $('#dlg2').dialog('open').dialog('setTitle','课程信息');
        $('#fm2').form('reset');
        $('#fm2').form('load',row.course);

    }else {
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行信息!!!',
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