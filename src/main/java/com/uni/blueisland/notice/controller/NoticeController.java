package com.uni.blueisland.notice.controller;

import com.uni.blueisland.common.ResponseDto;
import com.uni.blueisland.common.paging.Pagenation;
import com.uni.blueisland.common.paging.ResponseDtoWithPaging;
import com.uni.blueisland.common.paging.SelectCriteria;
import com.uni.blueisland.notice.model.dto.NoticeDto;
import com.uni.blueisland.notice.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Slf4j
@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    public final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // 공지사항 게시판 전체 조회 - 권한 All
//    @GetMapping("/read-only")
//    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@ModelAttribute("noticeDto") NoticeDto noticeDto) {
//        List<NoticeDto> noticeList = noticeService.getNoticeListWithPaging(noticeDto);
//        return  ResponseEntity.ok()
//                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeList));
//    }

    @GetMapping("/read-only")
    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@RequestParam(name="offset", defaultValue="1") String offset) {

        int totalCount = noticeService.selectNoticeTotal();
        int limit = 10;
        int buttonAmount = 5;
        SelectCriteria selectCriteria = Pagenation.getSelectCriteria(Integer.parseInt(offset), totalCount, limit, buttonAmount);

        ResponseDtoWithPaging responseDtoWithPaging = new ResponseDtoWithPaging();
        responseDtoWithPaging.setPageInfo(selectCriteria);
        responseDtoWithPaging.setData(noticeService.selectNoticeListWithPaging(selectCriteria));
        System.out.println("responseDtoWithPaging = " + responseDtoWithPaging);
        return ResponseEntity.ok().body(new ResponseDto(HttpStatus.OK, "조회 성공", responseDtoWithPaging));
    }


    // 공지 게시판 상세 조회 - 권한 All
    @GetMapping("/read-only/{noticeNo}")
    public ResponseEntity<ResponseDto> selectNotice(@PathVariable("noticeNo") Long noticeNo,
                                                    HttpServletRequest request,
                                                    HttpServletResponse response) {

        /* 조회수 로직 */
        Cookie[] cookies = request.getCookies();

        if (cookies != null) {
            for (Cookie cookie : cookies) {
                log.info("cookie.getName " + cookie.getName());
                log.info("cookie.getValue " + cookie.getValue());

                if (!cookie.getValue().contains(request.getParameter("noticeNo"))) {
                    cookie.setValue(cookie.getValue() + "_" + request.getParameter("noticeNo"));
                    cookie.setMaxAge(60 * 60 * 2);  /* 쿠키 시간 */
                    response.addCookie(cookie);
                    noticeService.updateCount(noticeNo);
                }
            }
        } else {
            Cookie newCookie = new Cookie("visit_cookie", request.getParameter("noticeNo"));
            newCookie.setMaxAge(60 * 60 * 2);
            response.addCookie(newCookie);
            noticeService.updateCount(noticeNo);
        }

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인",  noticeService.selectNotice(noticeNo)));
    }

    // 공지사항 게시판 공지 글 작성 - ADMIN만 가능
    @PostMapping("/admin-only")
    public ResponseEntity<ResponseDto> insertNotice(@RequestBody NoticeDto noticeDto){
        log.info("[NoticeController] PostMapping noticeDto : " + noticeDto);
        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeService.insertNotice(noticeDto)));
    }

    // 공지사항 게시판 공지 글 수정 - ADMIN만 가능
    @PutMapping(value = "/admin-only/{noticeNo}")
    public ResponseEntity<ResponseDto> modifyNotice(@RequestBody NoticeDto noticeDto
            , @PathVariable Long noticeNo) {
        log.info("[NoticeController] PostMapping noticeDto : " + noticeDto);

        noticeDto.setNoticeNo(noticeNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeService.modifyNotice(noticeDto)));
    }

    // 공지사항 게시판 공지 글 삭제 - ADMIN만 가능
//    @DeleteMapping(value = "/admin-only/{noticeNo}")
//    public ResponseEntity<ResponseDto> deleteNotice(@RequestBody NoticeDto noticeDto
//            , @PathVariable("noticeNo") Long noticeNo) {
//        log.info("[NoticeController] PostMapping noticeDto : " + noticeDto);
//
//        noticeDto.setNoticeNo(noticeNo);
//
//        return ResponseEntity.ok()
//                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeService.deleteNotice(noticeDto)));
//
//    }
//    @ResponseBody
    @DeleteMapping(value = "/admin-only/{noticeNo}")
    public ResponseEntity<ResponseDto> deleteNotice(@PathVariable("noticeNo") Long noticeNo) {

        NoticeDto noticeDto = new NoticeDto();

        noticeDto.setNoticeNo(noticeNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeService.deleteNotice(noticeDto)));
    }
}
