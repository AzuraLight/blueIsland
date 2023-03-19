package com.uni.blueisland.notice.controller;


import com.uni.blueisland.board.model.dto.BoardReplyDto;
import com.uni.blueisland.common.ResponseDto;
import com.uni.blueisland.notice.model.dto.NoticeReplyDto;
import com.uni.blueisland.notice.service.NoticeReplyService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/notices/replies")
public class NoticeReplyController {

    private final NoticeReplyService noticeReplyService;

    public NoticeReplyController(NoticeReplyService noticeReplyService) {
        this.noticeReplyService = noticeReplyService;
    }

    @PostMapping("/user-only")
    public ResponseEntity<ResponseDto> insertReply(@RequestBody NoticeReplyDto noticeReplyDto){

        log.info("[ReplyController] PostMapping NoticeReplyDto : " + noticeReplyDto);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeReplyService.insertReply(noticeReplyDto)));
    }

    // 댓글 조회
    @GetMapping("/read-only/{noticeNo}")
    public ResponseEntity<ResponseDto> selectReplyList(@ModelAttribute("NoticeReplyDto") NoticeReplyDto noticeReplyDto,
                                                       @PathVariable(name = "noticeNo", required = false) Long noticeNo) {

       List<NoticeReplyDto> replyList = noticeReplyService.getReplyList(noticeNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", replyList));
    }


}
