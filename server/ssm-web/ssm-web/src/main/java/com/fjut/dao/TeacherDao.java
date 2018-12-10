package com.fjut.dao;

import com.fjut.model.Teacher;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TeacherDao {
    List<Teacher> getAllTeacher();
    Teacher getTeacherById(@Param("id") String id);
    void addTeacher(@Param("teacher") Teacher teacher);
    void updateTeacher(@Param("teacher") Teacher teacher);
    void deleteTeacherById(@Param("teacherId") String teacherId);
}
