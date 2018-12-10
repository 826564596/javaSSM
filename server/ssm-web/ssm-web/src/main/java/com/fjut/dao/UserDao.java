package com.fjut.dao;

import com.fjut.model.Manager;
import com.fjut.model.UserInfo;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UserDao {

//    Manager selectUserById(@Param("userId") Long userId);
//
//    Manager selectUserByPhoneOrEmail(@Param("emailOrPhone") String emailOrPhone, @Param("state") Short state);
//
//    List<Manager> selectAllUser();
    UserInfo selectUserByOpenId(@Param("userInfo") UserInfo userInfo);

    // 新增一条微信用户信息记录(t_user表)
    void insertWxUserInfo(@Param("openId") String openId, @Param("nickName") String nickName, @Param("avatarUrl") String avatarUrl);

}
