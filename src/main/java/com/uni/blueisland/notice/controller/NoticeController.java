package com.uni.blueisland.notice.controller;

import com.uni.blueisland.common.ResponseDto;
import com.uni.blueisland.notice.model.dto.NoticeDto;
import com.uni.blueisland.notice.service.NoticeService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api/notices")
public class NoticeController {

    public final NoticeService noticeService;

    public NoticeController(NoticeService noticeService) {
        this.noticeService = noticeService;
    }

    // 공지사항 게시판 전체 조회 - 권한 All
    @GetMapping("/read-only")
    public ResponseEntity<ResponseDto> selectNoticeListWithPaging(@ModelAttribute("noticeDto") NoticeDto noticeDto) {
        List<NoticeDto> noticeList = noticeService.getNoticeListWithPaging(noticeDto);
        return  ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeList));
    }


    // 공지 게시판 상세 조회 - 권한 All
    @GetMapping("/read-only/{noticeNo}")
    public ResponseEntity<ResponseDto> selectNotice(@PathVariable("noticeNo") Long noticeNo) {

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
            , @PathVariable("noticeNo") Long noticeNo) {
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
    @ResponseBody
    @DeleteMapping(value = "/admin-only/{noticeNo}")
    public ResponseEntity<ResponseDto> deleteNotice(/*@RequestBody NoticeDto noticeDto*/
            @PathVariable("noticeNo") Long noticeNo) {

        NoticeDto noticeDto = new NoticeDto();

        noticeDto.setNoticeNo(noticeNo);

        return ResponseEntity.ok()
                .body(new ResponseDto(HttpStatus.OK, "정상 확인", noticeService.deleteNotice(noticeDto)));
    }
}
