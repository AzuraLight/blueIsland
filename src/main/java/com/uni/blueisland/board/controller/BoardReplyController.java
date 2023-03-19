package com.uni.blueisland.board.controller;


import com.uni.blueisland.board.model.dto.BoardDto;
import com.uni.blueisland.board.model.dto.BoardReplyDto;
import com.uni.blueisland.board.service.BoardReplyService;
import com.uni.blueisland.common.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/boards/replies")
public class BoardReplyController {

    private final BoardReplyService boardReplyService;

    public BoardReplyController(BoardReplyService boardReplyService) {
        this.boardReplyService = boardReplyService;
    }

    @PostMapping("/user-only")
    public ResponseEntity<ResponseDto> insertReply(@RequestBody BoardReplyDto boardReplyDto){

        log.info("[ReplyController] PostMapping replyDto : " + boardReplyDto);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", boardReplyService.insertReply(boardReplyDto)));
    }

    // 댓글 조회
    @GetMapping("/read-only/{boardNo}")
    public ResponseEntity<ResponseDto> selectReplyList(@ModelAttribute("BoardReplyDto") BoardReplyDto boardReplyDto,
                                                       @PathVariable(name = "boardNo", required = false) Long boardNo) {

        List<BoardReplyDto> replyList = boardReplyService.getReplyList(boardNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", replyList));
    }

    //댓글 수정
    @PutMapping(value = "/user-only/{boardNo}/{replyNo}")
    public ResponseEntity<ResponseDto> modifyBoardReply(@RequestBody BoardReplyDto boardReplyDto
            , @PathVariable("boardNo") Long boardNo
            , @PathVariable("replyNo") Long replyNo) {

        boardReplyDto.setBoardNo(boardNo);
        boardReplyDto.setReplyNo(replyNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "게시글 수정 확인", boardReplyService.modifyBoardReply(boardReplyDto)));
    }

    // 댓글 삭제
    @DeleteMapping(value = "/user-only/{boardNo}/{replyNo}")
    public ResponseEntity<ResponseDto> deleteBoardReply(@PathVariable("boardNo") Long boardNo
            , @PathVariable("replyNo") Long replyNo) {

        BoardReplyDto boardReplyDto = new BoardReplyDto();

        boardReplyDto.setReplyNo(replyNo);
        boardReplyDto.setBoardNo(boardNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "게시글 삭제 성공", boardReplyService.deleteBoardReply(boardReplyDto)));
    }

}
