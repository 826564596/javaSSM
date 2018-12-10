package com.fjut.model;


public class Question {

    private String q_no;
    private String question;
    private String c_id;
    private String name;
    private String answer;

    public String getQ_no() {
        return q_no;
    }

    public void setQ_no(String q_no) {
        this.q_no = q_no;
    }
    public String getQuestion() {
        return question;
    }

    public void setQuestion(String question) {
        this.question = question;
    }
    public String getC_id() {
        return c_id;
    }

    public void setC_id(String c_id) {
        this.c_id = c_id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getAnswer() {
        return answer;
    }

    public void setAnswer(String answer) {
        this.answer = answer;
    }
    @Override
    public String toString() {
        return "Question{" +
                "q_no='" + q_no + '\'' +
                ", question='" + question + '\'' +
                ", c_id='" + c_id + '\'' +
                ", name='" + name + '\'' +
                ", name='" + answer + '\'' +
                '}';
    }
}

