package com.fjut.model;

import java.sql.Date;

public class Course {

    // 课程编号
    private String courseNo;
    // 课程名称
    private String courseName;
    // 课程介绍
    private String blurb;
    // 课程视频
    private String videoUrl;
    // 课程图片
    private String imgUrl;
    // 类别(e:精品课/t:体验课)
    private String courseClass;
    // 开设日期(年-月-日)
    private Date beginDate;
    // 预约人数
    private Integer bookingNum;
    // 授课老师
    private Teacher teacher;
    // 课时数量
    private Integer hours;
    // 是否开设中(0:未开设/1:已开设)
    private Integer isExist;
    // 上课时间安排
    private String teachTime;
    // 价格
    private Double price;
    // 限制预约人数
    private Integer limitBookingNum;

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getTeachTime() {
        return teachTime;
    }

    public void setTeachTime(String teachTime) {
        this.teachTime = teachTime;
    }

    public String getCourseNo() {
        return courseNo;
    }

    public void setCourseNo(String courseNo) {
        this.courseNo = courseNo;
    }

    public String getBlurb() {
        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public String getCourseName() {

        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getImgUrl() {
        return imgUrl;
    }

    public void setImgUrl(String imgUrl) {
        this.imgUrl = imgUrl;
    }

    public String getCourseClass() {
        return courseClass;
    }

    public void setCourseClass(String courseClass) {
        this.courseClass = courseClass;
    }

    public Date getBeginDate() {
        return beginDate;
    }

    public void setBeginDate(Date beginDate) {
        this.beginDate = beginDate;
    }

    public Integer getBookingNum() {
        return bookingNum;
    }

    public void setBookingNum(Integer bookingNum) {
        this.bookingNum = bookingNum;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Integer getHours() {
        return hours;
    }

    public void setHours(Integer hours) {
        this.hours = hours;
    }

    public Integer getIsExist() {
        return isExist;
    }

    public void setIsExist(Integer isExist) {
        this.isExist = isExist;
    }

    public Integer getLimitBookingNum() {
        return limitBookingNum;
    }

    public void setLimitBookingNum(Integer limitBookingNum) {
        this.limitBookingNum = limitBookingNum;
    }

    @Override
    public String toString() {
        return "Course{" +
                "courseNo='" + courseNo + '\'' +
                ", courseName='" + courseName + '\'' +
                ", blurb='" + blurb + '\'' +
                ", videoUrl='" + videoUrl + '\'' +
                ", imgUrl='" + imgUrl + '\'' +
                ", courseClass='" + courseClass + '\'' +
                ", beginDate=" + beginDate +
                ", bookingNum=" + bookingNum +
                ", teacher=" + teacher +
                ", hours=" + hours +
                ", isExist=" + isExist +
                ", teachTime='" + teachTime + '\'' +
                ", price=" + price +
                ", limitBookingNum=" + limitBookingNum +
                '}';
    }

}
