package com.fjut.service.impl;

import com.fjut.dao.CourseDao;
import com.fjut.model.Course;
import com.fjut.service.CourseService;
import com.fjut.dao.AskQuestionDao;//
import com.fjut.model.Question;
import org.apache.commons.codec.binary.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
@Transactional(rollbackFor = Exception.class)
public class CourseServiceImpl implements CourseService{

    private Logger log = Logger.getLogger(CourseServiceImpl.class);

    @Resource
    private CourseDao courseDao;
    @Resource
    private AskQuestionDao askQuestionDao;

    @Override
    public Boolean addAskQuestion(String question,String c_id,String name){
        try{
            askQuestionDao.addAskQuestion(question,c_id,name);
            return true;
        }catch (Exception e){
            log.info("CourseService服务层》添加问题发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }

    }


    @Override
    public Boolean updateAnswer(String q_no,String answer) {
        try{
            askQuestionDao.updateAnswer(q_no,answer);
            return true;
        }catch (Exception e){
            log.info("CourseService服务层》更新问题答案发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }




    @Override
    public Boolean updateCourse(Course course) {
        try{
            courseDao.updateCourse(course);
            return true;
        }catch (Exception e){
            log.info("CourseService服务层》更新课程信息发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean deleteCourse(Course course) {
        try{
            courseDao.deleteCourse(course);
            return true;
        }catch (Exception e){
            log.info("CourseService服务层》下架课程发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public void addBookingNum(String courseNo) {
        try {
            courseDao.addBookingNum(courseNo);
        }catch (Exception e){
            log.info("CourseService服务层》添加课程预约人数发生异常，打印如下：");
            e.printStackTrace();
        }
    }

    @Override
    public Boolean addCourse(Course course) {

        try {
            course.setBeginDate(new java.sql.Date(new Date().getTime()));
            courseDao.addCourse(course);

            return true;
        }catch (Exception e){
            log.info("CourseService服务层》添加课程发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
//        String teachTimeStr = course.getTeachTime();

//        if(teachTimeStr != null && teachTimeStr.length() != 0) {
//            if(teachTimeStr.contains(",")){
//                String[] timeStrList=teachTimeStr.split(",");
//                for(String timeStr:timeStrList){
//                    Integer weekNum = Integer.valueOf(timeStr.substring(0,1));
//                    Integer section = Integer.valueOf(timeStr.substring(1));
//
//                }
//            }else{
//                timeStrList[0]=teachTimeStr;
//            }
//        }

    }

    @Override
    public List<Course> getAllCourse() {
        return courseDao.getAllCourse();
    }

    @Override
    public List<Question> getAllQuestion() {
        return askQuestionDao.getAllQuestion();
    }
}
