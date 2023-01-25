package com.uni.blueisland.board.controller;

import com.uni.blueisland.board.model.dto.BoardDto;
import com.uni.blueisland.board.service.BoardService;
import com.uni.blueisland.common.ResponseDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/boards")
public class BoardController {

    private final BoardService boardService;

    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시판 전체 조회 - 권한 All
    @GetMapping("/read-only")
    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@ModelAttribute("boardDto") BoardDto boardDto) {
        List<BoardDto> boardList = boardService.getBoardListWithPaging(boardDto);
        return  ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", boardList));
    }


    // 게시판 상세 조회
    @GetMapping("/read-only/{boardNo}")
    public ResponseEntity<ResponseDto> selectBoard(@PathVariable("boardNo") Long boardNo) {

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인",  boardService.selectBoard(boardNo)));
    }

    // 게시판 글 작성
    @PostMapping("/user-only")
    public ResponseEntity<ResponseDto> insertBoard(@RequestBody BoardDto boardDto) {

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", boardService.insertBoard(boardDto)));
    }

    // 게시판 글 수정
    @PutMapping(value = "/user-only/{boardNo}")
    public ResponseEntity<ResponseDto> modifyBoard(@RequestBody BoardDto boardDto
            , @PathVariable("boardNo") Long boardNo) {

        boardDto.setBoardNo(boardNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", boardService.modifyBoard(boardDto)));
    }

    // 게시판 글 삭제
    @DeleteMapping(value = "/user-only/{boardNo}")
    public ResponseEntity<ResponseDto> deleteBoard(@PathVariable("boardNo") Long boardNo) {

        BoardDto boardDto = new BoardDto();

        boardDto.setBoardNo(boardNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "게시글 삭제 성공", boardService.deleteBoard(boardDto)));
    }
}
