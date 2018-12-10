package com.fjut.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fjut.dao.WxSessionDao;
import com.fjut.service.WxService;
import com.fjut.utils.HttpRequestUtil;
import org.apache.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.Arrays;
import org.bouncycastle.util.encoders.Base64;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidParameterSpecException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

@Service
public class WxServiceImpl implements WxService {

    private Logger log = Logger.getLogger(WxServiceImpl.class);

    @Resource
    private WxSessionDao wxSessionDao;

    @Override
    public String login(String wxCode){
        String objString = this.postCode(wxCode);
        log.info("获得json字符串 "+objString);
        JSONObject obj = JSON.parseObject(objString);
        String openId = obj.getString("openid");
//        String openId=wxCode;
        String sessionKey = obj.getString("session_key");
        Date date = new Date();


        String uuid = UUID.randomUUID().toString().replaceAll("-", "");

        try {
            int count = wxSessionDao.checkSessionByopenId(openId);
            //判断openId对应的记录是否存在
            if(count==1){
                log.info("已存在，直接更新");
                // 记录已存在，直接更新
                wxSessionDao.updateWxSession(uuid,openId,sessionKey,date);
            }else{
                log.info("不存在，新增一条session记录");
                // 记录不存在，即第一次登陆，新增一条session记录
                wxSessionDao.insertWxSession(uuid,openId,sessionKey,date);
            }
            log.info("返回自定义登陆态uuid: " + uuid);
            // 成功则返回新的自定义登陆态key
            return uuid;
        }catch (Exception ex){
            log.error("更新一条3rd_session信息出错");
            ex.printStackTrace();
            return "";
        }
    }

    @Override
    public String checkSession(String sessionId) {
        int count = wxSessionDao.checkSession(sessionId);
        log.info("查到session条数："+count);
        String openId = null;
        if(count==1){
            openId = wxSessionDao.getOpenidBySessionId(sessionId);
        }
        return openId;
    }


    @Override
    public String getSessionKey(String sessionId) {
        return wxSessionDao.getSessionKeyBySessionId(sessionId);
    }


    //访问腾讯接口，用临时登录凭证换取{openid,sessionkey}
    private String postCode(String wxCode){
        String appId = "wx6c8305cda951f17a";
        String appSecret = "570a62dd7848629d2c6e49bacea97682";
        String requestUrl = "https://api.weixin.qq.com/sns/jscode2session";  //请求地址 https://api.weixin.qq.com/sns/jscode2session
        String grantType = "authorization_code";

        Map<String, String> requestUrlParam = new HashMap<>();
        requestUrlParam.put("appid", appId);  //开发者设置中的appId
        requestUrlParam.put("secret", appSecret); //开发者设置中的appSecret
        requestUrlParam.put("js_code", wxCode); //小程序调用wx.login返回的code
        requestUrlParam.put("grant_type", grantType);    //默认参数 authorization_code

        //发送post请求读取调用微信 https://api.weixin.qq.com/sns/jscode2session 接口获取openid用户唯一标识
        String objString = HttpRequestUtil.sendPost(requestUrl, requestUrlParam); //util返回格式："{'key':'value','key':'value'}"
        log.info("："+objString);
        return objString;
    }

}
