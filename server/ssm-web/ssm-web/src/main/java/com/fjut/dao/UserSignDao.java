package com.fjut.dao;

import com.fjut.model.SignRecord;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserSignDao {

    List<SignRecord> getSignRecordByOpenId(@Param("openId") String openId);

    void addSignRecord(@Param("signRecord") SignRecord signRecord, @Param("openId") String openId);
}
