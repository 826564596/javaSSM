package com.fjut.service;


import com.fjut.model.Agency;
import com.fjut.model.Manager;
import com.fjut.model.Teacher;

import java.util.List;
import java.util.Map;

public interface TeacherService {

    // 获取全部教师信息列表
    List<Teacher> getAllTeacher();

    // 新增一位培训教师
    Boolean addTeacher(Teacher teacher);

    // 更新一位培训教师信息
    Boolean updateTeacher(Teacher teacher);

    // 根据Id删除一位培训教师信息
    Boolean deleteTeacher(String teacherId);

}
