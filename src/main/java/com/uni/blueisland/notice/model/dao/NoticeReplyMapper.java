package com.uni.blueisland.notice.model.dao;

import com.uni.blueisland.notice.model.dto.NoticeReplyDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface NoticeReplyMapper {

    int insertReply(NoticeReplyDto noticeReplyDto);

    List<NoticeReplyDto> selectReplyList(Long noticeNo);
}
