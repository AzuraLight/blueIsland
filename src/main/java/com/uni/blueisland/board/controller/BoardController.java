package com.uni.blueisland.board.controller;

import com.uni.blueisland.board.model.dto.BoardDto;
import com.uni.blueisland.board.service.BoardService;
import com.uni.blueisland.common.ResponseDto;
import com.uni.blueisland.common.paging.Pagenation;
import com.uni.blueisland.common.paging.ResponseDtoWithPaging;
import com.uni.blueisland.common.paging.SelectCriteria;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/api/boards")
public class BoardController {
    private final BoardService boardService;
    public BoardController(BoardService boardService) {
        this.boardService = boardService;
    }

    // 게시판 전체 조회 - 권한 All
//    @GetMapping("/read-only")
//    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@ModelAttribute("boardDto") BoardDto boardDto) {
//        List<BoardDto> boardList = boardService.getBoardListWithPaging(boardDto);
//        return  ResponseEntity.ok()
//                .body(new ResponseDto(HttpStatus.OK, "정상 확인", boardList));
//    }

    @GetMapping("/read-only")
    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@RequestParam(name="offset", defaultValue="1") String offset) {

        int totalCount = boardService.selectBoardTotal();
        int limit = 10;
        int buttonAmount = 5;
        SelectCriteria selectCriteria = Pagenation.getSelectCriteria(Integer.parseInt(offset), totalCount, limit, buttonAmount);

        ResponseDtoWithPaging responseDtoWithPaging = new ResponseDtoWithPaging();
        responseDtoWithPaging.setPageInfo(selectCriteria);
        responseDtoWithPaging.setData(boardService.selectBoardListWithPaging(selectCriteria));
        System.out.println("responseDtoWithPaging = " + responseDtoWithPaging);
        return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회 성공", responseDtoWithPaging));
    }


    // 게시판 상세 조회
    @GetMapping("/read-only/{boardNo}")
    public ResponseEntity<ResponseDto> selectBoard(@PathVariable("boardNo") Long boardNo,
                                                   HttpServletRequest request,
                                                   HttpServletResponse response) {

        System.out.println("boardService.selectBoard(boardNo) = " + boardService.selectBoard(boardNo));

        /* 조회수 로직 */
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                log.info("cookie.getName " + cookie.getName());
                log.info("cookie.getValue " + cookie.getValue());

                if (!cookie.getValue().contains(request.getParameter("boardNo"))) {
                    cookie.setValue(cookie.getValue() + "_" + request.getParameter("boardNo"));
                    cookie.setMaxAge(60 * 60 * 2);  /* 쿠키 시간 */
                    response.addCookie(cookie);
                    boardService.updateCount(boardNo);
                }
            }
        } else {
            Cookie newCookie = new Cookie("visit_cookie", request.getParameter("boardNo"));
            newCookie.setMaxAge(60 * 60 * 2);
            response.addCookie(newCookie);
            boardService.updateCount(boardNo);
        }

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
