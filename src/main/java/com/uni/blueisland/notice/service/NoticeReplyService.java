package com.uni.blueisland.notice.service;

import com.uni.blueisland.notice.model.dao.NoticeReplyMapper;
import com.uni.blueisland.notice.model.dto.NoticeReplyDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class NoticeReplyService {

    private final NoticeReplyMapper noticeReplyMapper;

    public NoticeReplyService(NoticeReplyMapper noticeReplyMapper) {
        this.noticeReplyMapper = noticeReplyMapper;
    }

    public String insertReply(NoticeReplyDto noticeReplyDto) {

        System.out.println("noticeReplyDto = " + noticeReplyDto);
        
        int result = 0;

        result = noticeReplyMapper.insertReply(noticeReplyDto);

        return (result > 0) ? "댓글 등록 성공" :  "댓글 등록 실패";
    }

    public List<NoticeReplyDto> getReplyList(Long noticeNo) {

        return noticeReplyMapper.selectReplyList(noticeNo);
    }
}


