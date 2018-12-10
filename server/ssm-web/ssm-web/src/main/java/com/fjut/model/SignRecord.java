package com.fjut.model;

import java.util.Date;

public class SignRecord {
    private Integer sId;
    private String courseNo;
    private Date signDate;

    public Integer getsId() {
        return sId;
    }

    public void setsId(Integer sId) {
        this.sId = sId;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public Date getSignDate() {
        return signDate;
    }

    public void setSignDate(Date signDate) {
        this.signDate = signDate;
    }

    @Override
    public String toString() {
        return "SignRecord{" +
                "sId=" + sId +
                ", courseNo='" + courseNo + '\'' +
                ", signDate=" + signDate +
                '}';
    }
}
