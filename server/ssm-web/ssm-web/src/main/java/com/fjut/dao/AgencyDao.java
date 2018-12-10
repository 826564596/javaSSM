package com.fjut.dao;

import com.fjut.model.Agency;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public interface AgencyDao {
    Agency getAgency();
    List<Agency> getAllAgency();
    void updateAgency(@Param("agency") Agency agency);
}
