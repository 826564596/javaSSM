package com.fjut.dao;

import com.fjut.model.BookingRecord;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.ArrayList;

@Repository
public interface BookingDao {

    // 查询某用户的全部约课记录
    List<BookingRecord> getBookingsByOpenId(@Param("openId") String openId);

    // 查询所有用户的全部约课记录
    List<BookingRecord> getAllBookings();

    // 查询全部待考核约课记录
    List<BookingRecord> getAllCheckingRecord();

    // 添加一条约课记录
    void addBookingRecord(@Param("bookingRecord") BookingRecord bookingRecord, @Param("openId") String openId);

    // 查询用户某门课程的一条约课记录
    BookingRecord getOneBookingRecord(@Param("openId") String openId, @Param("courseId") String courseId);

    // 更新一条约课记录的学习进度和签到次数
    void updateBookingRecord(@Param("bookingRecord") BookingRecord bookingRecord);

    // 更新一条约课记录的考核状态
    void updateCheckState(@Param("bookingRecord") BookingRecord bookingRecord);

    // 删除用户某门课程的一条约课记录
    void deleteOneBookingRecord(@Param("openId") String openId, @Param("courseId") String courseId);

}
