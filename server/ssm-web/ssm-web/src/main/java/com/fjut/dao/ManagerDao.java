package com.fjut.dao;

import com.fjut.model.Manager;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ManagerDao {
    Manager findManagerByNameAndPwd(@Param("accountNum") String accountNum, @Param("password") String password);
    void editPassWord(@Param("manager") Manager manager, @Param("newPassWord") String newPassWord);
    void selectType(@Param("manager") Manager manager,@Param("type") String type);
}
