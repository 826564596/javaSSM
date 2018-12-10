package com.fjut.service;

public interface WxService {

    //小程序用户登陆
    String login(String wxCode);

    //检查自定义登陆状态,返回用户openid
    String checkSession(String sessionId);

    //查询sessionId对应的sessionKey
    String getSessionKey(String sessionId);

}
