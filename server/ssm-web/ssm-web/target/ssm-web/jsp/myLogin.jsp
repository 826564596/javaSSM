
<%@ page contentType="text/html;charset=UTF-8" language="java" pageEncoding="utf-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link href="${pageContext.request.contextPath}/css/login.css" rel="stylesheet" type="text/css" />
    <title>后台管理-登录</title>
    <style type="text/css">
        body{opacity: 0; transition: opacity 0.2s}
        body.active{opacity: 1}
    </style>
</head>
<body>
    <div class="second_body">
        <form action="${pageContext.request.contextPath }/manager/logining" onsubmit="return checkFrm()" method="post">
            <div class="logo"></div>
            <div class="title-zh">V课堂后台管理</div>
            <div class="title-en" style="margin-top: 5px;">V Class Information Manage System</div>
            <table border="0" style="width:300px;">
                <tr>
                    <td class="lable" style="white-space:nowrap; letter-spacing: 0.5em; vertical-align: middle">账号：</td>
                    <td colspan="2"><input type="text" id="userCode" class="login" name="accountNum"/></td>
                </tr>
                <tr>
                    <td class="lable" style="white-space:nowrap; letter-spacing: 0.5em; vertical-align: middle">密码：</td>
                    <td colspan="2"><input type="password" id="password" class="login" name="password"/></td>
                </tr>
                <tr>
                    <td></td>
                    <td colspan="2"><input type="checkbox" /><span>系统记住我</span></td>
                </tr>
                <tr>
                    <td colspan="3" style="text-align:center">
                        <input type="submit" value="登录" class="login_button" />
                        <input type="button" value="重置" class="reset_botton" onclick="reset()"/>
                    </td>
                </tr>
            </table>
        </form>
        <%--<form id="fm" method="post" onsubmit="return false">--%>
            <%--<div class="logo"></div>--%>
            <%--<div class="title-zh">V课堂后台管理</div>--%>
            <%--<div class="title-en" style="margin-top: 5px;">V Class Information Manage System</div>--%>
            <%--<table border="0" style="width:300px;">--%>
                <%--<tr>--%>
                    <%--<td class="lable" style="white-space:nowrap; letter-spacing: 0.5em; vertical-align: middle">账号：</td>--%>
                    <%--<td colspan="2"><input type="text" id="userCode" class="login" name="accountNum"/></td>--%>
                <%--</tr>--%>
                <%--<tr>--%>
                    <%--<td class="lable" style="white-space:nowrap; letter-spacing: 0.5em; vertical-align: middle">密码：</td>--%>
                    <%--<td colspan="2"><input type="password" id="password" class="login" name="password"/></td>--%>
                <%--</tr>--%>
                <%--<tr>--%>
                    <%--<td></td>--%>
                    <%--<td colspan="2"><input type="checkbox"/><span>系统记住我</span></td>--%>
                <%--</tr>--%>
                <%--<tr>--%>
                    <%--<td colspan="3" style="text-align:center">--%>
                        <%--<input type="submit" value="登录" class="login_button" onclick="login()"/>--%>
                        <%--<input type="button" value="重置" class="reset_botton" onclick="reset()"/>--%>
                    <%--</td>--%>
                <%--</tr>--%>
            <%--</table>--%>
        <%--</form>--%>
    </div>
</body>
<script type="text/javascript" src="${pageContext.request.contextPath }/js/jquery/jquery-1.11.3.min.js"></script>
<script type="text/javascript">
    $('body').addClass('active');

    <%-- 获取session中的error信息,浏览器提示重新登陆 --%>
    var errori ='<%=session.getAttribute("error")%>';
    if(errori=='yes'){
        <%
            session.removeAttribute("error");
        %>
        confirm("账号密码错误! 请重新登录");
    }

    $("#userCode").focus();

    function checkFrm () {
        if($("#userCode").val() == ""){
            confirm("账号未输入");
            $("#userCode").focus();
            return false;
        }
        if($("#password").val() == ""){
            confirm("密码未输入");
            $("#password").focus();
            return false;
        }
        return true;
    }

    function reset() {
        $("#userCode").val("");
        $("#password").val("");
        $("#userCode").focus();
    }

    <%--function login() {--%>
        <%--console.log("进入login方法");--%>
        <%--var r = checkFrm();--%>
        <%--console.log(r);--%>
        <%--if(r){--%>
            <%--console.log($('#fm').serialize());--%>
            <%--$.ajax({--%>
                <%--type: "POST",--%>
                <%--url: "${pageContext.request.contextPath}/manager/login",--%>
                <%--data: $('#fm').serialize(), //序列化表单值--%>
                <%--success: function (res) {--%>
                    <%--console.log(res);--%>
                <%--},--%>
                <%--error: function () {--%>
                    <%--console.log("异常");--%>
                <%--}--%>
            <%--})--%>
        <%--}--%>
    <%--}--%>

</script>
</html>
