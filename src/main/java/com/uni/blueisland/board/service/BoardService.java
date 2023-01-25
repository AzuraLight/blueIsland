package com.uni.blueisland.board.service;


import com.uni.blueisland.board.model.dao.BoardMapper;
import com.uni.blueisland.board.model.dto.BoardDto;
import com.uni.blueisland.common.paging.PaginationInfo;
import com.uni.blueisland.member.model.dao.MemberMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

@Service
public class BoardService {

    private final BoardMapper boardMapper;
    private final MemberMapper memberMapper;

    public BoardService(BoardMapper boardMapper, MemberMapper memberMapper) {
        this.boardMapper = boardMapper;
        this.memberMapper = memberMapper;
    }

    // 게시판 리스트
    public List<BoardDto> getBoardListWithPaging(BoardDto boardDto) {
        List<BoardDto> boardList = Collections.emptyList();

        int boardTotalCount = boardMapper.selectBoardTotal(boardDto);

        PaginationInfo paginationInfo = new PaginationInfo(boardDto);
        paginationInfo.setTotalRecordCount(boardTotalCount);

        boardDto.setPaginationInfo(paginationInfo);

        if(boardTotalCount > 0) {
            boardList = boardMapper.selectBoardList(boardDto);
        }
        return boardList;
    }

    // 게시판 게시글 상세보기
//    public String selectBoard(Long boardNo) {
//        int result = 0;
//
//        result = boardMapper.selectBoard(boardNo);
//
//        return (result > 0) ? "게시글 조회 성공" :  "게시글 조회 실패";
//    }

    public BoardDto selectBoard(Long boardNo) {

        return boardMapper.selectBoard(boardNo);
    }


    // 게시판 게시글 등록
    public String insertBoard(BoardDto boardDto) {
        int result = 0;

        result = boardMapper.insertBoard(boardDto);

        return (result > 0) ? "게시글 등록 성공" :  "게시글 등록 실패";
    }

    // 게시판 게시글 수정
    @Transactional
    public String modifyBoard(BoardDto boardDto) {
        int result = 0;

        result = boardMapper.modifyBoard(boardDto);

        return (result > 0) ? "게시글 수정 성공" :  "게시글 수정 실패";
    }

    // 게시판 게시글 삭제
    @Transactional
    public String deleteBoard(BoardDto boardDto) {
        int result = 0;

        result = boardMapper.deleteBoard(boardDto);

        return (result > 0) ? "게시글 삭제 성공" :  "게시글 삭제 실패";
    }
}
