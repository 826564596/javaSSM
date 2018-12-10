package com.fjut.model;


import java.sql.Date;

public class BookingRecord {

    private Integer bId;
    private String openId;
    private Course course;
    private Date bookingDate;
    private Double progress;
    private Integer signNum;
    private Integer checkState;


    public Integer getbId() {
        return bId;
    }

    public void setbId(Integer bId) {
        this.bId = bId;
    }

    public String getOpenId() {
        return openId;
    }

    public void setOpenId(String openId) {
        this.openId = openId;
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Date getBookingDate() {
        return bookingDate;
    }

    public void setBookingDate(Date bookingDate) {
        this.bookingDate = bookingDate;
    }

    public Double getProgress() {
        return progress;
    }

    public void setProgress(Double progress) {
        this.progress = progress;
    }

    public Integer getSignNum() {
        return signNum;
    }

    public void setSignNum(Integer signNum) {
        this.signNum = signNum;
    }

    public Integer getCheckState() {
        return checkState;
    }

    public void setCheckState(Integer checkState) {
        this.checkState = checkState;
    }

    @Override
public String toString() {
    return "BookingRecord{" +
            "bId=" + bId +
            ", openId" + openId +
            ", course=" + course +
            ", bookingDate=" + bookingDate +
            ", progress=" + progress +
            ", signNum=" + signNum +
            ", checkState=" + checkState +
            '}';
}
}
