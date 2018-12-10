

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

// 请求全部待考核数据
function showCheckCourseList() {
    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallbookings",
        success: function (res) {
            console.log("ajax获取全部待考核数据成功 :");
            console.log(res);
            if(res.data.length > 0){
                $('#dg').datagrid({loadFilter: pagerFilter }).datagrid('loadData',res.data);
                // 设置分页样式
                setPager();
            }

        },
        error:function () {
            console.log("ajax访问失败");
        }
    });
}


// <<点击考核>>按钮绑定方法
function showCheckWindow() {
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg').dialog('open').dialog('setTitle','正在记录考核结果');
        $('#fm').form('clear');
        $('#fm').form('load',row);
        console.log(row);
    } else{
        $.messager.alert({
            title: '提示',
            msg: '请先选择一行待考核记录!!!',
            icon: 'warning'
        });
    }
}
// 提交更新课程信息请求
function saveCheckState() {
    $('#fm').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/updateCheckState",
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
                $('#dlg').dialog('close');		// close the dialog
                showCheckCourseList();	// reload the user data
            }
        }
    });
}

