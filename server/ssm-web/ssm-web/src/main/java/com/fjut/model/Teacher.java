package com.fjut.model;

public class Teacher {

    private String id;
    private String name;
    private Integer age;
    private String avatarImg;  //头像
    private String blurb;  //简介
    private Integer workTime;  //从业时长
    private Integer isExist;  //是否在职

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Integer getIsExist() {
        return isExist;
    }

    public void setIsExist(Integer isExist) {
        this.isExist = isExist;
    }

    public Integer getWorkTime() {
        return workTime;
    }

    public void setWorkTime(Integer workTime) {
        this.workTime = workTime;
    }

    public String getBlurb() {

        return blurb;
    }

    public void setBlurb(String blurb) {
        this.blurb = blurb;
    }

    public String getAvatarImg() {
        return avatarImg;
    }

    public void setAvatarImg(String avatarImg) {
        this.avatarImg = avatarImg;
    }

    public Integer getAge() {

        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", age=" + age +
                ", avatarImg='" + avatarImg + '\'' +
                ", blurb='" + blurb + '\'' +
                ", workTime=" + workTime +
                ", isExist=" + isExist +
                '}';
    }
}
