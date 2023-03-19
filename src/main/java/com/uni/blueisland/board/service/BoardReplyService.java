package com.uni.blueisland.board.service;

import com.uni.blueisland.board.model.dao.BoardReplyMapper;
import com.uni.blueisland.board.model.dto.BoardDto;
import com.uni.blueisland.board.model.dto.BoardReplyDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class BoardReplyService {

    private BoardReplyMapper boardReplyMapper;

    public BoardReplyService(BoardReplyMapper boardReplyMapper) {
        this.boardReplyMapper = boardReplyMapper;
    }

    // 댓글 등록
    public String insertReply(BoardReplyDto boardReplyDto) {

        System.out.println("boardReplyDto = " + boardReplyDto);
        
        int result = 0;

        result = boardReplyMapper.insertReply(boardReplyDto);

        return (result > 0) ? "댓글 등록 성공" :  "댓글 등록 실패";
    }

    // 댓글 조회
    public List<BoardReplyDto> getReplyList(Long boardNo) {

        List<BoardReplyDto> boardList = boardReplyMapper.selectReplyList(boardNo);

        return boardList;
    }

    // 댓글 수정
    public String modifyBoardReply(BoardReplyDto boardReplyDto) {
        int result = 0;
        result = boardReplyMapper.modifyBoardReply(boardReplyDto);

        return (result > 0) ? "댓글 수정 성공" :  "댓글 수정 실패";
    }

    public String deleteBoardReply(BoardReplyDto boardReplyDto) {
        int result = 0;
        result = boardReplyMapper.deleteBoardReply(boardReplyDto);

        return (result > 0) ? "댓글 삭제 성공" :  "댓글 삭제 실패";
    }
}


