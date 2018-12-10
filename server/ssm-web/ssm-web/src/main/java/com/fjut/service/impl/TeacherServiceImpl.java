package com.fjut.service.impl;

import com.fjut.dao.TeacherDao;
import com.fjut.dao.UserDao;
import com.fjut.model.Agency;
import com.fjut.model.Manager;
import com.fjut.model.Teacher;
import com.fjut.service.TeacherService;
import com.fjut.service.UserService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.List;
import java.util.Map;


@Service
@Transactional(rollbackFor = Exception.class)
public class TeacherServiceImpl implements TeacherService {

    private Logger log = Logger.getLogger(TeacherServiceImpl.class);

    @Resource
    private TeacherDao teacherDao;

    @Override
    public List<Teacher> getAllTeacher() {
        return teacherDao.getAllTeacher();
    }

    @Override
    public Boolean updateTeacher(Teacher teacher) {
        try{
            teacherDao.updateTeacher(teacher);
            return true;
        }catch (Exception e){
            log.info("TeacherService服务层》更新教师信息发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteTeacher(String teacherId) {
        try{
            teacherDao.deleteTeacherById(teacherId);
            return true;
        }catch (Exception e){
            log.info("TeacherService服务层》删除教师信息发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean addTeacher(Teacher teacher) {
        try{
            teacherDao.addTeacher(teacher);
            return true;
        }catch (Exception e){
            log.info("TeacherService服务层》新增教师信息发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }
}
