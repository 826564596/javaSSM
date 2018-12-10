package com.fjut.dao;

import com.fjut.model.Question;
import org.apache.ibatis.annotations.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AskQuestionDao {
    List<Question> getAllQuestion();
    List<Question> getUserQuestion(@Param("name") String name);
//    Question getUserQuestion(@Param("question") String name);
    void addAskQuestion(@Param("question") String question,@Param("c_id")String c_id,@Param("name")String name);
    void updateAnswer(@Param("q_no")String q_no,@Param("answer")String answer);
}
