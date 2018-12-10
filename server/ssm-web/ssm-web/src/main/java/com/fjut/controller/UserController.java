package com.fjut.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fjut.model.*;
import com.fjut.service.CourseService;
import com.fjut.service.TeacherService;
import com.fjut.service.UserService;
import com.fjut.service.WxService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController {

    private Logger log = Logger.getLogger(UserController.class);

    @Resource
    private UserService userService;

    @Resource
    private WxService wxService;

    @Resource
    private CourseService courseService;

    @Resource
    private TeacherService teacherService;

//    @RequestMapping("/showUser")
//    @ResponseBody
//    public String showUser(HttpServletRequest request, Model model){
//        log.info("查询所有用户信息");
//
//        List<Manager> userList = userService.getAllUser();
//        log.info(userList);
////        model.addAttribute("userList",userList);
////        String jsonString = JSON.toJSONString(userList); //对象转Json字符串
////        return "showUser";
//        return JSON.toJSONString(userList);
////        return "";
//    }

    @RequestMapping("/login")
    @ResponseBody
    public Map<String, Object> login(HttpServletRequest request){
        log.info("准备获取sessionkey和openid");
        String wxCode = request.getParameter("code");
//        String encryptedData = request.getParameter("encryptedData");
//        String iv = request.getParameter("iv");

        Map<String, Object> result = new HashMap<>();

        if(null!=wxCode && ""!=wxCode){
            log.info("收到code: "+ wxCode);
            String sessionId = wxService.login(wxCode);
            result.put("sid",sessionId);
        }
        else {
            log.warn("未收到code，没有数据返回");
        }
        return result;
    }

    @RequestMapping("/login2")
    @ResponseBody
    public Map<String, Object> login2(HttpServletRequest request){

        log.info("收到login2登录请求");
        String wxCode = request.getParameter("code");
        String encryptedData = request.getParameter("encryptedData");
        String iv = request.getParameter("iv");

        Map<String, Object> result = new HashMap<>();

        String sessionKey = null;

        if(null != wxCode && "" != wxCode){
            log.info("收到code: "+ wxCode);
            String sessionId = wxService.login(wxCode);
             sessionKey = wxService.getSessionKey(sessionId);
            result.put("sid",sessionId);
        }

        if(null != encryptedData && "" != encryptedData){
            log.info("收到encryptedData: "+ encryptedData);
            if(null != iv && "" != iv){
                log.info("收到iv: "+ iv);
                Boolean saveUserInfo = userService.saveUserInfo(sessionKey,encryptedData,iv);
                log.info("解析并保存用户信息结果：" + saveUserInfo);
            }
        }

        return result;
    }

    @RequestMapping("/getAgencyInfo")
    @ResponseBody
    public Map<String, Object> getAgencyInfo(HttpServletRequest request){
        log.info("收到getAgencyInfo请求");
        Agency agencyInfo = userService.getAgencyInfo();
        Map<String, Object> result = new HashMap<>();
        result.put("agencyInfo",agencyInfo);
        return result;
    }

    @RequestMapping("/getAllCourse")
    @ResponseBody
    public Map<String, Object> getAllCourse(HttpServletRequest request){
        log.info("收到getAllCourse请求");

        List<Course> allCourseList = courseService.getAllCourse();

        Map<String, Object> result = new HashMap<>();
        result.put("allCourseList",allCourseList);
        return result;
    }

    @RequestMapping("/getAllTeacher")
    @ResponseBody
    public Map<String, Object> getAllTeacher(HttpServletRequest request){
        log.info("收到getAllTeacher请求");

        List<Teacher> allTeacherList = teacherService.getAllTeacher();

        Map<String, Object> result = new HashMap<>();
        result.put("allTeacherList",allTeacherList);
        return result;
    }


    @RequestMapping("/getBookingRecord")
    @ResponseBody
    public Map<String, Object> getBookingRecord(HttpServletRequest request){
        log.info("收到getBookingRecord请求");
        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String openId = wxService.checkSession(sessionId);
        log.info("取得的用户标识：" +openId);

        List<BookingRecord> userBookingRecord = new ArrayList<>();

        if(null!=openId && ""!=openId){
            userBookingRecord = userService.getBookingRecord(openId);
        }

        log.info("查到该用户约课记录："+userBookingRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("userBookingRecord",userBookingRecord);
        return result;
    }

    @RequestMapping("/getSignRecord")
    @ResponseBody
    public Map<String, Object> getSignRecord(HttpServletRequest request){
        log.info("收到getSignRecord请求");
        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String openId = wxService.checkSession(sessionId);
        log.info("取得的用户标识：" +openId);

        List<SignRecord> userSignRecord = new ArrayList<>();

        if(null!=openId && ""!=openId){
            userSignRecord = userService.getSignRecord(openId);
        }

        log.info("查到该用户今天的签到记录："+userSignRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("userSignRecord",userSignRecord);
        return result;
    }

    @RequestMapping("/bookingCourse")
    @ResponseBody
    public Map<String, Object> bookingCourse(HttpServletRequest request){
        log.info("收到bookingCourse请求");

        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String courseNo = request.getParameter("cid");
        log.info("收到的courseNo参数：" + courseNo);
        String openId = wxService.checkSession(sessionId);
        log.info("匹配到用户标识：" +openId);
        Boolean isBookingOk = false;

        if(null!=openId && ""!=openId){
            isBookingOk = userService.bookingCourse(openId,courseNo);
        }

        log.info("添加约课记录结果："+ isBookingOk);

        List<BookingRecord> userBookingRecord = new ArrayList<>();

        if(isBookingOk){ //约课成功,返回该用户的所有约课记录
            userBookingRecord = userService.getBookingRecord(openId);
        }

        log.info("查到该用户约课记录："+userBookingRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("isBookingOk",isBookingOk);
        result.put("userBookingRecord",userBookingRecord);
        return result;
    }

    @RequestMapping("/cancelBookingCourse")
    @ResponseBody
    public Map<String, Object> cancelBookingCourse(HttpServletRequest request){
        log.info("收到cancelBookingCourse请求");

        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String courseNo = request.getParameter("cid");
        log.info("收到的courseNo参数：" + courseNo);
        String openId = wxService.checkSession(sessionId);
        log.info("匹配到用户标识：" +openId);
        Boolean isCancelOk = false;

        if(null!=openId && ""!=openId){
            isCancelOk = userService.cancelBookingCourse(openId,courseNo);
        }

        log.info("删除约课记录结果："+ isCancelOk);

        List<BookingRecord> userBookingRecord = new ArrayList<>();

        if(isCancelOk){ //删除约课记录成功,返回该用户的新的约课记录
            userBookingRecord = userService.getBookingRecord(openId);
        }

        log.info("查到该用户约课记录："+userBookingRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("isCancelOk",isCancelOk);
        result.put("userBookingRecord",userBookingRecord);
        return result;
    }

    @RequestMapping("/signCourse")
    @ResponseBody
    public Map<String, Object> signCourse(HttpServletRequest request){
        log.info("收到signCourse请求");

        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String courseNo = request.getParameter("cid");
        log.info("收到的courseNo参数：" + courseNo);
        String openId = wxService.checkSession(sessionId);
        log.info("匹配到用户标识：" +openId);
        Boolean isSignOk = false;

        if(null!=openId && ""!=openId){
            isSignOk = userService.signCourse(openId,courseNo);
        }

        log.info("添加用户课程签到记录结果："+ isSignOk);

        List<SignRecord> userSignRecord = new ArrayList<>();
        List<BookingRecord> userBookingRecord = new ArrayList<>();

        if(isSignOk){ //课程签到成功,返回该用户的今天的签到记录
            userSignRecord = userService.getSignRecord(openId);
            userBookingRecord = userService.getBookingRecord(openId);
        }

        log.info("准备返回用户今天的签到记录："+ userSignRecord);
        log.info("准备返回用户约课记录："+ userBookingRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("isSignOk",isSignOk);
        result.put("userSignRecord",userSignRecord);
        result.put("userBookingRecord",userBookingRecord);
        return result;
    }

    @RequestMapping("/applyCheckCourse")
    @ResponseBody
    public Map<String, Object> applyCheckCourse(HttpServletRequest request){
        log.info("收到applyCheckCourse请求");

        String sessionId = request.getParameter("sid");
        log.info("收到的sessionId参数：" + sessionId);
        String courseNo = request.getParameter("cid");
        log.info("收到的courseNo参数：" + courseNo);
        String openId = wxService.checkSession(sessionId);
        log.info("匹配到用户标识：" +openId);
        Boolean isApplyCheckOk = false;

        if(null!=openId && ""!=openId){
            isApplyCheckOk = userService.applyCheckCourse(openId, courseNo);
        }

        log.info("用户申请考核结果："+ isApplyCheckOk);

        List<SignRecord> userSignRecord = new ArrayList<>();
        List<BookingRecord> userBookingRecord = new ArrayList<>();

        if(isApplyCheckOk){ //课程签到成功,返回该用户的今天的签到记录
            userSignRecord = userService.getSignRecord(openId);
            userBookingRecord = userService.getBookingRecord(openId);
        }

        log.info("准备返回用户今天的签到记录："+ userSignRecord);
        log.info("准备返回用户约课记录："+ userBookingRecord);

        Map<String, Object> result = new HashMap<>();
        result.put("isApplyCheckOk",isApplyCheckOk);
        result.put("userSignRecord",userSignRecord);
        result.put("userBookingRecord",userBookingRecord);
        return result;
    }


//////////////////////////////////////////////
    @RequestMapping("/askQuestion")
    @ResponseBody
    public Map<String, Object> askQuestion(HttpServletRequest request){
        log.info("收到askQuestion请求");
        String c = request.getParameter("a");
        String question = request.getParameter("ceshis");
        String username = request.getParameter("name");
        log.info("收到问题参数"+c);
        log.info("收到问题参数问题"+question);
        log.info("收到问题参数问题用户"+username);
        courseService.addAskQuestion(question,c,username);
        Map<String, Object> result = new HashMap<>();
        return result;
    }


    @RequestMapping("/getQuestion")
    @ResponseBody
    public Map<String, Object> getQuestion(HttpServletRequest request){
        log.info("getQuestion");
        String c = request.getParameter("a");
        log.info("收到问题参数"+c);
        List<Question> questionInfo = new ArrayList<>();
         questionInfo = userService.getUserQuestion(c);
        Map<String, Object> result = new HashMap<>();
        result.put("questionInfo",questionInfo);
        return result;
    }


//////////////////////////////////////////////
}
