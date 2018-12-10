package com.fjut.dao;

import com.fjut.model.Course;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CourseDao {

    // 查询全部课程信息
    List<Course> getAllCourse();

    // 查询一门课程的信息
    Course getCourseById(@Param("courseId") String courseId);

    // 更新一门课程信息
    void updateCourse(@Param("course") Course course);

    // 删除一门课程(标志位置0)
    void deleteCourse(@Param("course") Course course);

    // 添加一门课程
    void addCourse(@Param("course") Course course);

    // (约课)某课程的预约人数+1
    void addBookingNum(@Param("courseNo") String courseNo);

//    void addTeachTime(@Param("courseId") String courseId, @Param("weekNum") Integer weekNum, @Param("section") Integer section);


}
