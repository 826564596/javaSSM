package com.fjut.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fjut.model.*;
import com.fjut.service.CourseService;
import com.fjut.service.ManagerService;
import com.fjut.service.TeacherService;
import com.fjut.service.UserService;
import org.apache.log4j.Logger;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/manager")
public class ManagerController {

    private Logger log = Logger.getLogger(ManagerController.class);

    @Resource
    @Autowired
    private ManagerService managerService;

    @Resource
    @Autowired
    private TeacherService teacherService;

    @Resource
    @Autowired
    private CourseService courseService;

    @Resource
    private UserService userService;

    @RequestMapping("/login")
    public String toLogin(){
        log.info("准备跳转登陆界面");
        return "myLogin";
    }

    @RequestMapping("/main")
    public ModelAndView toMain(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        Object managerName = session.getAttribute("managerName");
        ModelAndView modelAndView = new ModelAndView();
        if(managerName==null){
            // 无账号登陆，错误信息放入session
            session.setAttribute("error","yes");
            modelAndView.setViewName("redirect:/manager/login");
        }else{
            log.info("准备跳转主界面");
            modelAndView.setViewName("myMain");
        }
        return modelAndView;
    }


    @RequestMapping("/teacher")
    public ModelAndView toTeacher(HttpServletRequest httpServletRequest){
        HttpSession session = httpServletRequest.getSession();
        Object managerName = session.getAttribute("managerName");
        ModelAndView modelAndView = new ModelAndView();
        if(managerName==null){
            // 无账号登陆，错误信息放入session
            session.setAttribute("error","yes");
            modelAndView.setViewName("redirect:/manager/login");
        }else{
            log.info("准备跳转主界面");
            modelAndView.setViewName("myTeacher");
        }
        return modelAndView;
    }





//    @RequestMapping("/logining")
//    public ModelAndView login(String accountNum, String password, HttpServletRequest httpServletRequest){
//
//        log.info("管理员登陆 "+ accountNum +" "+ password);
//        Manager manager = managerService.login(accountNum,password);
//        log.info("登陆结果："+manager);
//        ModelAndView modelAndView = new ModelAndView();
//        HttpSession httpSession = httpServletRequest.getSession();
//        if(manager!=null){
//            // 匹配到管理员账户信息，放入session
//            httpSession.setAttribute("managerName",manager.getAccountNum());
//            modelAndView.setViewName("main");
//        }else{
////            modelAndView.setViewName("forward:/manager/tologin");  //内部转向,可传递request
//            modelAndView.setViewName("redirect:/manager/tologin");  //重定向到任意url,重新创建request
//            httpSession.setAttribute("error","yes");

////            modelAndView.addObject("error","yes");  // 底层实现: httpServletRequest.setAttribute("error","yes");
//        }
//        return modelAndView;
//    }


    @RequestMapping("/logining")
    public ModelAndView logining(String accountNum, String password, HttpServletRequest httpServletRequest){

        log.info("管理员登陆 "+ accountNum +" "+ password);
        Manager manager = managerService.login(accountNum,password);
        log.info("登陆结果："+manager);
        String type=manager.getType();
        ModelAndView modelAndView = new ModelAndView();
        HttpSession httpSession = httpServletRequest.getSession();
            String c=manager.getType();


        if(manager!=null){

//            modelAndView.setViewName("forward:/manager/tologin");  //内部转向,可传递request
//            modelAndView.setViewName("redirect:/manager/tologin");  //重定向到任意url,重新创建request

            // 匹配到管理员账户信息，放入session,转向到main
            if (c.equals("m")){
            httpSession.setAttribute("managerName",manager.getAccountNum());
            modelAndView.setViewName("redirect:/manager/main");}
            if (c.equals("t")){
                httpSession.setAttribute("managerName",manager.getAccountNum());
                modelAndView.setViewName("redirect:/manager/teacher");}


        }else{

            // 错误信息放入session
            httpSession.setAttribute("error","yes");
            modelAndView.setViewName("redirect:/manager/login");
        }

        return modelAndView;
    }


    @RequestMapping(value = "/savepassword",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> savePassWord(Manager managerInfo, HttpServletRequest httpServletRequest){
        log.info("收到savepassword请求，其参数对象：");
        log.info(managerInfo);
        // managerInfo中有旧密码和新密码字段
        String accountNum = httpServletRequest.getSession().getAttribute("managerName").toString();
        // 往managerInfo中加入accountNum字段，组成一个完整的Manager实体
        managerInfo.setAccountNum(accountNum);

        Map<String, Object> result = managerService.editPassWord(managerInfo);
        log.info("修改密码结果："+result);
        return result;
    }



    /*****************机构信息有关请求开始********************/

    @RequestMapping("/showagency")
    @ResponseBody
    public Map<String, Object> showAgency(){
        log.info("收到showagency请求");
//        return JSON.parseObject("{'w':'wls'}");  //该方法只适用于转化json格式字符串

//        Map<String, Object> result = new HashMap<>();
//        List<Agency> data = managerService.getAllAgency();
//        result.put("data",data);  // 返回对象数组数据

//        Map<String,Object> result = new HashMap<String, Object>(); //可放入任意对象作为json数据
//        result.put("name",name);

        Agency agency = managerService.getAgency();
        Map<String, Object> result = new HashMap<>();
        result.put("data",agency);

        log.info("打印返回结果："+result);
        return result; //ResponseBody注解后 该结果自动以json格式返回浏览器
    }

    @RequestMapping(value = "/saveagency",method = RequestMethod.POST)
    @ResponseBody
    public Map<String,Object> saveAgency(Agency agency){
        log.info("收到saveagency请求");
        log.info(agency);
        Boolean isSuccess = managerService.updateAgency(agency);
        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台修改信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("更新机构信息结果："+result);
        return result;
    }





    /*****************培训教师信息有关请求开始********************/

    @RequestMapping("/getallteacher")
    @ResponseBody
    public Map<String, Object> getAllTeacher(){
        log.info("收到getallteachers请求");

        List<Teacher> data = teacherService.getAllTeacher();
        Map<String, Object> result = new HashMap<>();
        result.put("data",data);

        log.info("全部教师信息结果："+data);
        return result;
    }

    @RequestMapping(value = "/addteacher", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addTeacher(Teacher teacher){
        log.info("收到addTeacher请求");
        log.info("新教师信息："+teacher);

        Boolean isSuccess = teacherService.addTeacher(teacher);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台添加失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("准备返回新增教师信息的结果："+result);
        return result;
    }

    @RequestMapping(value = "/updateteacher", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateTeacher(Teacher teacher){
        log.info("收到updateTeacher请求");
        log.info("教师信息："+teacher);
        Boolean isSuccess = teacherService.updateTeacher(teacher);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台修改信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("准备返回更新教师信息的结果："+result);
        return result;
    }

    @RequestMapping(value = "/deleteteacher",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteTeacher(@RequestBody Map<String, Object> teacherId){
        log.info("收到deleteteacher请求，其参数对象：");
        log.info(teacherId);
        Boolean isSuccess = teacherService.deleteTeacher(teacherId.get("id").toString());

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台删除信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success",isSuccess);
        result.put("errorMsg",errorMsg);
        log.info("删除教师信息结果："+result);
        return result;
    }




    /*****************课程有关请求开始********************/

    @RequestMapping(value = "/addcourse", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> addCourse(Course course){
        log.info("收到addCourse请求");
        log.info("新课程信息："+course.toString());

        Boolean isSuccess = courseService.addCourse(course);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台添加课程失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("准备返回新增课程信息的结果："+result);
        return result;
    }

    @RequestMapping("/getallcourse")
    @ResponseBody
    public Map<String, Object> getAllCourse(){
        log.info("收到getallcourse请求");

        List<Course> data = courseService.getAllCourse();
        Map<String, Object> result = new HashMap<>();
        result.put("data",data);

        log.info("全部课程信息结果："+data);
        return result;
    }

    @RequestMapping(value = "/updatecourse", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateCourse(Course course){
        log.info("收到updateCourse请求");
        log.info("课程信息："+course);
        Boolean isSuccess = courseService.updateCourse(course);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台修改信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("准备返回更新课程信息的结果："+result);
        return result;
    }

    @RequestMapping(value="/deletecourse",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> deleteCourse(@RequestBody Course course){
        log.info("收到deletecourse请求，其参数对象：");
        log.info(course);
        Boolean isSuccess = courseService.deleteCourse(course);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台删除信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("success",isSuccess);
        result.put("errorMsg",errorMsg);
        log.info("更新机构信息结果："+result);
        return result;
    }



    /*****************学员课程有关请求开始********************/

    @RequestMapping("/getallbookings")
    @ResponseBody
    public Map<String, Object> getAllBookings(){
        log.info("收到getallbookings请求");

        List<BookingRecord> bookingList = userService.getAllBookings();

        List<BookingRecord> data = new ArrayList<>();
        for(int i=0;i<bookingList.size();i++){
            if(bookingList.get(i).getCourse().getIsExist()==1){
                data.add(bookingList.get(i));
            }
        }

        Map<String, Object> result = new HashMap<>();
        result.put("data",data);

        log.info("全部约课信息结果："+data);
        return result;
    }

    @RequestMapping("/getallcheckingrecord")
    @ResponseBody
    public Map<String, Object> getAllCheckingRecord(){
        log.info("收到getallcheckingrecord(全部待考核信息)请求");

        List<BookingRecord> data = userService.getAllCheckingRecord();
        Map<String, Object> result = new HashMap<>();
        result.put("data",data);

        log.info("全部约课信息结果："+data);
        return result;
    }

    @RequestMapping(value = "/updateCheckState", method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> updateCheckState(BookingRecord bookingRecord){
        log.info("收到updateCheckState请求");
        log.info("约课记录信息："+bookingRecord);
        Boolean isSuccess = userService.updateCheckState(bookingRecord);

        String errorMsg = "";
        if(!isSuccess){
            errorMsg += "后台修改信息失败！";
        }
        Map<String, Object> result = new HashMap<>();
        result.put("errorMsg",errorMsg);
        log.info("准备返回更新课程信息的结果："+result);
        return result;
    }


    @RequestMapping(value="/getUserInfo",method = RequestMethod.POST)
    @ResponseBody
    public Map<String, Object> getUserInfo(@RequestBody UserInfo userInfo){
        log.info("收到getUserInfo请求，其参数对象：");
        log.info(userInfo);

        UserInfo newUserInfo = userService.getUserInfo(userInfo);
        Map<String, Object> result = new HashMap<>();
        result.put("data",newUserInfo);

        log.info("查到用户完整信息："+newUserInfo);
        return result;
    }
    /*****************查询问题列表开始********************/
    @RequestMapping("getallquestion")
    @ResponseBody
    public Map<String, Object> getallquestion(){
        log.info("收到getallquestion请求");
        List<Question> data = courseService.getAllQuestion();
        Map<String, Object> result = new HashMap<>();
        result.put("data",data);
        log.info("全部问题信息结果："+data);
        return result;
    }

    /*****************更新问题列表开始********************/
    @RequestMapping("/updateanswer")
    @ResponseBody
    public Map<String, Object> updateAnswer(HttpServletRequest request){
        log.info("收到updateanswer请求，其参数对象：");
        String c = request.getParameter("q_no");
        String answer = request.getParameter("answer");
        log.info("收到问题参数"+c);
        log.info("收到问题参数"+answer);
        courseService.updateAnswer(c,answer);
//        Boolean isSuccess = courseService.updateAnswer(Question);
//
//        String errorMsg = "";
//        if(!isSuccess){
//            errorMsg += "后台更新问题失败！";
//    }
        Map<String, Object> result = new HashMap<>();
//        result.put("success",isSuccess);
//        result.put("errorMsg",errorMsg);
        log.info("更新问题答案结果："+result);
        return result;
    }





}
