package com.fjut.service.impl;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.fjut.dao.*;
import com.fjut.model.*;
import com.fjut.service.UserService;
import org.apache.log4j.Logger;
import org.bouncycastle.jce.provider.BouncyCastleProvider;
import org.bouncycastle.util.Arrays;
import org.bouncycastle.util.encoders.Base64;
import org.joda.time.DateTime;
import org.joda.time.LocalDate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.Resource;
import javax.crypto.BadPaddingException;
import javax.crypto.Cipher;
import javax.crypto.IllegalBlockSizeException;
import javax.crypto.NoSuchPaddingException;
import javax.crypto.spec.IvParameterSpec;
import javax.crypto.spec.SecretKeySpec;
import java.io.UnsupportedEncodingException;
import java.security.*;
import java.security.spec.InvalidParameterSpecException;
import java.text.DecimalFormat;
import java.util.*;


@Service
@Transactional(rollbackFor = Exception.class)
public class UserServiceImpl implements UserService {

    private Logger log = Logger.getLogger(UserServiceImpl.class);

    @Resource
    private AgencyDao agencyDao;

    @Resource
    private BookingDao bookingDao;

    @Resource
    private CourseDao courseDao;

    @Resource
    private UserDao userDao;

    @Resource
    private UserSignDao userSignDao;
    @Resource
    private AskQuestionDao AskQuestionDao;

    @Override
    public Boolean saveUserInfo(String sessionKey, String encryptedData, String iv) {
        JSONObject userInfoString = this.getUserInfo(sessionKey, encryptedData, iv);
        System.out.println("解析到用户信息：");
        System.out.println(userInfoString);
        System.out.println("准备保存用户信息----");

        if(userInfoString != null){
            String openId = userInfoString.getString("openId");
            String nickName = userInfoString.getString("nickName");
            String avatarUrl = userInfoString.getString("avatarUrl");
            UserInfo userInfo = new UserInfo();
            userInfo.setOpenId(openId);
            userInfo = userDao.selectUserByOpenId(userInfo);
            if(userInfo==null){  //数据库中没有该用户，可以插入该用户
                System.out.println("新用户，可以保存该用户");
                try{
                    userDao.insertWxUserInfo(openId,nickName,avatarUrl);
                    return true;
                }catch (Exception e){
                    e.printStackTrace();
                    System.out.println("保存用户信息出错");
                    return false;
                }
            }else{
                System.out.println("该用户已存在，无需保存");
                return true;
            }

        }
        System.out.println("解析用户信息为空，保存失败");
        return false;
    }

    @Override
    public List<SignRecord> getSignRecord(String openId) {
        List<SignRecord> userAllSignRecordList = userSignDao.getSignRecordByOpenId(openId);
//        Calendar cal = Calendar.getInstance();
//        cal.setTime(new Date());
//        // cal.get得到星期数字规律 1 ：周日/2 : 周一...7 : 周六
//        Integer todayWeek = cal.get(Calendar.DAY_OF_WEEK) - 1;
//        if(todayWeek < 0) {
//            todayWeek = 0;
//        }
        List<SignRecord> userTodaySignRecordList = new ArrayList<>();
        LocalDate today = new LocalDate(new DateTime(new Date()));
        if(userAllSignRecordList.size() != 0){
            //遍历用户的签到记录列表，根据签到时间筛选出今天的签到记录
            for(SignRecord signRecord : userAllSignRecordList){
                LocalDate signDate = new LocalDate(new DateTime(signRecord.getSignDate()));
                if(signDate.equals(today)){
                    userTodaySignRecordList.add(signRecord);
                }
            }
        }
        return userTodaySignRecordList;
    }

    @Override
    public List<BookingRecord> getAllCheckingRecord() {
        return bookingDao.getAllCheckingRecord();
    }

    @Override
    public UserInfo getUserInfo(UserInfo userInfo) {
        return userDao.selectUserByOpenId(userInfo);
    }

    @Override
    public Boolean updateCheckState(BookingRecord bookingRecord) {
        try{
            bookingDao.updateCheckState(bookingRecord);
            return true;
        }catch (Exception e){
            log.info("UserService服务层》更新约课记录考核状态发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<BookingRecord> getAllBookings() {
        return bookingDao.getAllBookings();
    }


    @Override
    public Boolean signCourse(String openId, String courseNo) {
        SignRecord signRecord = new SignRecord();
        signRecord.setCourseNo(courseNo);
        signRecord.setSignDate(new Date());
        Course course = courseDao.getCourseById(courseNo); //得到用户所选课程(需要其课时数)
        BookingRecord bookingRecord = bookingDao.getOneBookingRecord(openId, courseNo);  //得到用户该门课的学习进度

        if(bookingRecord.getSignNum() == course.getHours()){  //签到次数已满，表示已完成学习，无法再签到
            return false;
        }else{
            bookingRecord.setSignNum(bookingRecord.getSignNum() + 1);

            bookingRecord.setProgress((double)bookingRecord.getSignNum()/course.getHours()); //更新该条记录的学习进度
//            System.out.println(bookingRecord.getProgress());
            try{
                userSignDao.addSignRecord(signRecord, openId); //新增一条签到记录到数据库
                bookingDao.updateBookingRecord(bookingRecord); //约课记录的学习进度和签到次数更新到数据库
                return true;
            }catch (Exception e){
                log.info("UserService服务层》用户课程签到发生异常，打印如下：");
                e.printStackTrace();
                return false;
            }
        }

    }

    @Override
    public Boolean applyCheckCourse(String openId, String courseNo) {
        try{
            BookingRecord bookingRecord = bookingDao.getOneBookingRecord(openId, courseNo);
            bookingRecord.setCheckState(1); //约课记录的考核状态置1
            bookingDao.updateCheckState(bookingRecord); //更新至数据库
            return true;
        }catch (Exception e){
            log.info("UserService服务层》用户申请考核发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean cancelBookingCourse(String openId, String courseNo) {
        try{
            bookingDao.deleteOneBookingRecord(openId,courseNo); //删除一条约课记录

            Course course = courseDao.getCourseById(courseNo); //对应课程的预约人数-1
            course.setBookingNum(course.getBookingNum()-1);
            courseDao.updateCourse(course);
            return true;
        }catch (Exception e){
            log.info("UserService服务层》用户取消约课发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public Boolean bookingCourse(String openId, String courseNo) {
        BookingRecord bookingRecord = new BookingRecord();
        Course course = new Course();
        course.setCourseNo(courseNo);
        bookingRecord.setCourse(course);
        bookingRecord.setBookingDate(new java.sql.Date(new Date().getTime()));
//        Map<String, Object> result = new HashMap<>();
        try{
            bookingDao.addBookingRecord(bookingRecord, openId); //增加用户约课记录
            courseDao.addBookingNum(courseNo);  //对应课程的预约人数+1
            return true;
        }catch (Exception e){
            log.info("UserService服务层》用户约课发生异常，打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<BookingRecord> getBookingRecord(String openId) {
        return bookingDao.getBookingsByOpenId(openId);
    }


    @Override
    public List<Question> getUserQuestion(String name) {
        return AskQuestionDao.getUserQuestion(name);
    }

    @Override
    public Agency getAgencyInfo() {
        return agencyDao.getAgency();
    }
/////////////////////////////////////////////////



//////////////////////////////////////////////////////////
    // 解密用户信息
    private JSONObject getUserInfo(String sessionKey, String encryptedData, String iv) {
        // 被加密的数据
        byte[] dataByte = Base64.decode(encryptedData);
        // 加密秘钥
        byte[] keyByte = Base64.decode(sessionKey);
        // 偏移量
        byte[] ivByte = Base64.decode(iv);
        try {
            // 如果密钥不足16位，那么就补足.  这个if 中的内容很重要
            int base = 16;
            if (keyByte.length % base != 0) {
                int groups = keyByte.length / base + (keyByte.length % base != 0 ? 1 : 0);
                byte[] temp = new byte[groups * base];
                Arrays.fill(temp, (byte) 0);
                System.arraycopy(keyByte, 0, temp, 0, keyByte.length);
                keyByte = temp;
            }
            // 初始化
            Security.addProvider(new BouncyCastleProvider());
            Cipher cipher = Cipher.getInstance("AES/CBC/PKCS7Padding","BC");
            SecretKeySpec spec = new SecretKeySpec(keyByte, "AES");
            AlgorithmParameters parameters = AlgorithmParameters.getInstance("AES");
            parameters.init(new IvParameterSpec(ivByte));
            cipher.init(Cipher.DECRYPT_MODE, spec, parameters);// 初始化
            byte[] resultByte = cipher.doFinal(dataByte);
            if (null != resultByte && resultByte.length > 0) {
                String result = new String(resultByte, "UTF-8");
                return JSON.parseObject(result);
            }
        } catch (NoSuchAlgorithmException e) {
            log.error(e.getMessage(), e);
        } catch (NoSuchPaddingException e) {
            log.error(e.getMessage(), e);
        } catch (InvalidParameterSpecException e) {
            log.error(e.getMessage(), e);
        } catch (IllegalBlockSizeException e) {
            log.error(e.getMessage(), e);
        } catch (BadPaddingException e) {
            log.error(e.getMessage(), e);
        } catch (UnsupportedEncodingException e) {
            log.error(e.getMessage(), e);
        } catch (InvalidKeyException e) {
            log.error(e.getMessage(), e);
        } catch (InvalidAlgorithmParameterException e) {
            log.error(e.getMessage(), e);
        } catch (NoSuchProviderException e) {
            log.error(e.getMessage(), e);
        }
        return null;

    }

}
