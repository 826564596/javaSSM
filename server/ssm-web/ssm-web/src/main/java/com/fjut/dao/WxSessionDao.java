package com.fjut.dao;

import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.Date;


@Repository
public interface WxSessionDao {

    // 插入一条session记录(3rd_session表)
    void insertWxSession(@Param("sessionId") String sessionId, @Param("openId") String openId,
                         @Param("sessionKey") String sessionKey, @Param("date") Date date);

    // 更新openid对应记录的session_key、sessionId、update_time(3rd_session表)
    void updateWxSession(@Param("sessionId") String sessionId, @Param("openId") String openId,
                         @Param("sessionKey") String sessionKey, @Param("date") Date date);

    // 根据sessionId查询对应用户标识openid(3rd_session表)
    String getOpenidBySessionId(@Param("sessionId") String sessionId);

    // 查询该openid对应的记录条数(3rd_session表)
    Integer checkSessionByopenId(@Param("openId") String openId);

    // 查询sessionId对应的session记录条数(3rd_session表)
    Integer checkSession(@Param("sessionId") String sessionId);

    // 根据sessionId查询对应数据加密密钥sessionKey(3rd_session表)
    String getSessionKeyBySessionId(@Param("sessionId") String sessionId);

}
