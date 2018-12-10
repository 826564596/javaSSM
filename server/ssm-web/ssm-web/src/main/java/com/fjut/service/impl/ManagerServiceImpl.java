package com.fjut.service.impl;

import com.fjut.dao.AgencyDao;
import com.fjut.dao.ManagerDao;
import com.fjut.model.Agency;
import com.fjut.model.Manager;
import com.fjut.service.ManagerService;
import org.apache.log4j.Logger;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ManagerServiceImpl implements ManagerService{

    private Logger log = Logger.getLogger(ManagerServiceImpl.class);

    @Resource
    private ManagerDao managerDao;

    @Resource
    private AgencyDao agencyDao;

    @Override
    public Boolean updateAgency(Agency agency) {
        try {
            agencyDao.updateAgency(agency);
            return true;
        }catch (Exception e){
            log.info("服务层->更新机构信息发生异常，详细打印如下：");
            e.printStackTrace();
            return false;
        }
    }

    @Override
    public List<Agency> getAllAgency() {
        return agencyDao.getAllAgency();
    }




    @Override
    public Map<String, Object> selectType(Manager managerInfo){
        Map<String, Object> result = new HashMap<>();
        Integer resNum = null;
        String errorMsg = null;
        try {
            // 尝试从数据库中得到真正的管理员全部信息(表中只有账号和密码两个字段)
            Manager realManager = managerDao.findManagerByNameAndPwd(managerInfo.getAccountNum(), managerInfo.getPassword());
            log.info("修改密码时查询到的Manager: "+realManager);
            if(realManager==null){
                resNum=0;
                errorMsg="密码错误";
            }else{

                managerDao.selectType(realManager,managerInfo.getType());
                resNum=1;
                errorMsg="";
            }
        }catch (Exception e){
            log.info("服务层->匹配管理员信息发生异常，详细打印如下：");
            e.printStackTrace();
            resNum=0;
            errorMsg="后台捕获到异常";
        }finally {
            result.put("resNum",resNum);
            result.put("errorMsg",errorMsg);
            return result;
        }

    }




    @Override
    public Map<String, Object> editPassWord(Manager managerInfo) {
        Map<String, Object> result = new HashMap<>();
        Integer resNum = null;
        String errorMsg = null;
        try {
            // 尝试从数据库中得到真正的管理员全部信息(表中只有账号和密码两个字段)
            Manager realManager = managerDao.findManagerByNameAndPwd(managerInfo.getAccountNum(), managerInfo.getPassword());
            log.info("修改密码时查询到的Manager: "+realManager);
            if(realManager==null){
                resNum=0;
                errorMsg="密码错误";
            }else{
                // 修改表中管理员的密码
                managerDao.editPassWord(realManager,managerInfo.getNewPassword());
                resNum=1;
                errorMsg="";
            }
        }catch (Exception e){
            log.info("服务层->匹配管理员信息发生异常，详细打印如下：");
            e.printStackTrace();
            resNum=0;
            errorMsg="后台捕获到异常";
        }finally {
            result.put("resNum",resNum);
            result.put("errorMsg",errorMsg);
            return result;
        }
    }

    @Override
    public Agency getAgency() {
        return agencyDao.getAgency();
    }

    @Override
    public Manager login(String accountNum, String password) {
        try{
            Manager ma = managerDao.findManagerByNameAndPwd(accountNum,password);
            log.info("查询到的Manager: "+ma);
            return ma;
        }catch (Exception e){
            log.info("服务层->匹配管理员信息发生异常，详细打印如下：");
            e.printStackTrace();
            return null;
        }

    }
}
