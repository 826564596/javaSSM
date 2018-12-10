package com.fjut.dao;


import com.fjut.model.Manager;
import org.apache.ibatis.session.SqlSessionFactory;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.IOException;
import java.io.InputStream;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.apache.ibatis.session.SqlSession;

public class ManagerDaoTest {
    @Before
    public void setUp() throws Exception {
        System.out.println("准备测试");
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("测试完成");
    }

    public SqlSessionFactory sqlSessionFactory() throws IOException {
        // mybatis的配置文件
        String resource = "spring-mybatis.xml";
        // 使用类加载器加载mybatis的配置文件（它也加载关联的映射文件）TestHotel.class.getClassLoader()
        InputStream is = Resources.getResourceAsStream(resource);
        // 构建sqlSession的工厂
        SqlSessionFactory sessionFactory = new SqlSessionFactoryBuilder().build(is);
        return sessionFactory;
    }

    @Test
    public void testPostCode() throws Exception {
        System.out.println("测试中...");
        SqlSessionFactory sessionFactory = sqlSessionFactory();
        SqlSession session = sessionFactory.openSession();
        ManagerDao managerDao = session.getMapper(ManagerDao.class);
        Manager manager = managerDao.findManagerByNameAndPwd("001","123");
        System.out.println(manager);
        session.close();
    }
}
