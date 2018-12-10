package com.fjut.service;

import com.fjut.model.*;

import java.util.List;
import java.util.Map;
import java.util.ArrayList;

public interface UserService {

    //解密并保存用户信息
    Boolean saveUserInfo(String sessionKey, String encryptedData, String iv);

    // 获取机构信息
    Agency getAgencyInfo();

    // 获取用户选课记录列表
    List<BookingRecord> getBookingRecord(String openId);
    List<Question> getUserQuestion(String name);

    // web后台获取全部约课记录
    List<BookingRecord> getAllBookings();

    // web后台获取全部待考核的约课记录
    List<BookingRecord> getAllCheckingRecord();

    // web后台修改用户约课记录的考核状态
    Boolean updateCheckState(BookingRecord bookingRecord);

    // web后台获取一条用户信息
    UserInfo getUserInfo(UserInfo userInfo);

    // 用户约课(向约课记录表增加一条记录)
    Boolean bookingCourse(String openId,String courseNo);

    // 用户取消预约课程
    Boolean cancelBookingCourse(String openId,String courseNo);

    // 获取用户今天的课程签到记录
    List<SignRecord> getSignRecord(String openId);

    // 用户课程签到(向约课记录表增加一条记录)
    Boolean signCourse(String openId,String courseNo);

    // 用户申请课程考核(修改约课记录表考核状态位)
    Boolean applyCheckCourse(String openId,String courseNo);
    //用户提出疑问
//    Boolean askQuestion(String openId,String courseNo);

}
