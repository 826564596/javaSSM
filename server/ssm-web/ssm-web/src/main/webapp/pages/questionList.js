function showQuestionForm() {
    //

    $.ajax({
        url:"http://localhost:5757/ssm-web/manager/getallquestion",
        success: function (res) {
            console.log("ajax获取全部问题信息成功 :");
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




function editAnswer() {
    var row = $('#dg').datagrid('getSelected');
    if (row){
        $('#dlg3').dialog('open').dialog('setTitle','正在修改问题信息');
        $('#fm3').form('clear');
        $('#fm3').form('load',row);
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
function saveAnswer() {
    // $("#answer").val();
    // $("#q_no").val();
    // var con={};
    // con['q_no']=$("#answer").val();
    // con["answer"]=$("#q_no").val();
    // var json = JSON.stringify(con);
    // console.log(json);
    //
    // $.ajax({
    //     data:json,
    //     url:"http://localhost:5757/ssm-web/manager/updateanswer",
    //     success: function (res) {
    //         console.log("ajax更新问题信息成功 :");
    //         console.log(res);
    //         $('#dg').datagrid({loadFilter: pagerFilter }).datagrid('loadData',res.data);
    //         // 设置分页样式
    //         setPager();
    //     },
    //     error:function () {
    //
    //     }
    // });



    $('#fm3').form('submit',{
        url: "http://localhost:5757/ssm-web/manager/updateanswer",
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
                $('#dlg3').dialog('close');		// close the dialog
                showQuestionForm();	// reload the user data
            }
        }
    });
}