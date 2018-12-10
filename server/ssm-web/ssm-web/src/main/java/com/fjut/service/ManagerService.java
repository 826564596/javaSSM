package com.fjut.service;


import com.fjut.model.Agency;
import com.fjut.model.Manager;

import java.util.List;
import java.util.Map;

public interface ManagerService {

    // 管理员登录
    Manager login(String name, String password);
    //教师登录
    // 修改密码
    Map<String, Object> editPassWord(Manager managerInfo);
    //获取管理员类型
    Map<String, Object> selectType(Manager managerInfo);
    // 获取机构信息
    Agency getAgency();

    List<Agency> getAllAgency();

    // 更新机构信息
    Boolean updateAgency(Agency agency);

}
