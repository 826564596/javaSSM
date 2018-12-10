package com.fjut.model;


public class Agency {

    // 机构名
    private String aName;
    // 图片1
    private String firstImg;
    // 图片2
    private String secondImg;
    // 图片3
    private String thirdImg;
    // 简介
    private String aInfo;
    // 地址
    private String address;
    // 联系方式
    private String phoneNum;

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPhoneNum() {
        return phoneNum;
    }

    public void setPhoneNum(String phoneNum) {
        this.phoneNum = phoneNum;
    }

    public String getaName() {
        return aName;
    }

    public void setaName(String aName) {
        this.aName = aName;
    }

    public String getFirstImg() {
        return firstImg;
    }

    public String getaInfo() {
        return aInfo;
    }

    public void setaInfo(String aInfo) {
        this.aInfo = aInfo;
    }

    public String getThirdImg() {

        return thirdImg;
    }

    public void setThirdImg(String thirdImg) {
        this.thirdImg = thirdImg;
    }

    public String getSecondImg() {

        return secondImg;
    }

    public void setSecondImg(String secondImg) {
        this.secondImg = secondImg;
    }

    public void setFirstImg(String firstImg) {
        this.firstImg = firstImg;
    }

    @Override
    public String toString() {
        return "Agency{" +
                "aName='" + aName + '\'' +
                ", firstImg='" + firstImg + '\'' +
                ", secondImg='" + secondImg + '\'' +
                ", thirdImg='" + thirdImg + '\'' +
                ", aInfo='" + aInfo + '\'' +
                '}';
    }
}
