package com.fjut.service;

import com.fjut.model.Course;
import com.fjut.model.Question;

import java.util.List;

public interface CourseService {

    // 获取全部课程信息列表
    List<Course> getAllCourse();

    // 添加一门课程信息
    Boolean addCourse(Course course);

    // 修改课程信息
    Boolean updateCourse(Course course);

    // 下架课程信息
    Boolean deleteCourse(Course course);

    // 发生约课，增加一位预约人数
    void addBookingNum(String courseNo);
    //添加问题
    Boolean addAskQuestion(String question,String c_id,String name);
    List<Question> getAllQuestion();
    Boolean updateAnswer(String q_no,String answer);

}
