package com.fjut.controller;


import com.fjut.dao.ManagerDao;
import com.fjut.model.Manager;
import com.fjut.service.ManagerService;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import javax.annotation.Resource;
import java.io.IOException;
import java.io.InputStream;

public class ManagerControllerTest {

    @Resource
    private ManagerService managerService;

    @Before
    public void setUp() throws Exception {
        System.out.println("准备测试");
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("测试完成");
    }

    @Test
    public void testLogin() throws Exception {
        System.out.println("测试中...");
    }
}
