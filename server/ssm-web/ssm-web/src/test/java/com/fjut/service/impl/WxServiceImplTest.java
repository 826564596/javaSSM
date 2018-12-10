package com.fjut.service.impl;


import com.fjut.model.BookingRecord;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.util.List;

public class WxServiceImplTest {
    @Before
    public void setUp() throws Exception {
        System.out.println("准备测试");
    }

    @After
    public void tearDown() throws Exception {
        System.out.println("测试完成");
    }

    @Test
    public void testPostCode() throws Exception {
        System.out.println("测试中...");
//        WxServiceImpl wxServiceImpl = new WxServiceImpl();
        UserServiceImpl userServiceImpl = new UserServiceImpl();
        List<BookingRecord> bList = userServiceImpl.getBookingRecord("ocqjS5KuhBNgzDRroriu2VLPSHGc");
        System.out.println(bList);
    }
}
