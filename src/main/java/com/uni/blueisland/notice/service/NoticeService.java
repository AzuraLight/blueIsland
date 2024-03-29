package com.uni.blueisland.notice.service;

import com.uni.blueisland.common.paging.SelectCriteria;
import com.uni.blueisland.member.model.dao.MemberMapper;
import com.uni.blueisland.notice.model.dao.NoticeMapper;
import com.uni.blueisland.notice.model.dto.NoticeDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Slf4j
@Service
public class NoticeService {

    private final NoticeMapper noticeMapper;
    private final MemberMapper memberMapper;

    public NoticeService(NoticeMapper noticeMapper, MemberMapper memberMapper) {
        this.noticeMapper = noticeMapper;
        this.memberMapper = memberMapper;
    }
    
    // 공지사항 게시판 게시글 등록
    public String insertNotice(NoticeDto noticeDto) {
        int result = 0;

        result = noticeMapper.insertNotice(noticeDto);

        return (result > 0) ? "공지 등록 성공" :  "공지 등록 실패";
    }
    
    // 게시글 갯수
    public int selectNoticeTotal() {
        int result = noticeMapper.selectNoticeTotal();
        return result;
    }

    // 공지사항 게시판 리스트
    public Object selectNoticeListWithPaging(SelectCriteria selectCriteria) {
        List<NoticeDto> noticeList = noticeMapper.selectNoticeListWithPaging(selectCriteria);
        return noticeList;
    }

//    public List<NoticeDto> getNoticeListWithPaging(NoticeDto noticeDto) {
//        List<NoticeDto> noticeList = Collections.emptyList();
//
//        int noticeTotalCount = noticeMapper.selectNoticeTotal(noticeDto);
//
//        PaginationInfo paginationInfo = new PaginationInfo(noticeDto);
//        paginationInfo.setTotalRecordCount(noticeTotalCount);
//
//        noticeDto.setPaginationInfo(paginationInfo);
//
//        if(noticeTotalCount > 0) {
//            noticeList = noticeMapper.selectNoticeList(noticeDto);
//        }
//        return noticeList;
//    }

    // 공지사항 게시판 게시글 수정
    @Transactional
    public String modifyNotice(NoticeDto noticeDto) {
        int result = 0;

        result = noticeMapper.modifyNotice(noticeDto);

        System.out.println("result = " + result);
        return (result > 0) ? "공지 수정 성공" :  "공지 수정 실패";
    }


    // 공지사항 게시판 게시글 삭제
    @Transactional
    public String deleteNotice(NoticeDto noticeDto) {
        int result = 0;

        result = noticeMapper.deleteNotice(noticeDto);

        return (result > 0) ? "공지 삭제 성공" :  "공지 삭제 실패";
    }

    // 공지사항 게시판 게시글 상세보기
    public NoticeDto selectNotice(Long noticeNo) {

        return noticeMapper.selectNotice(noticeNo);
    }


    public void updateCount(Long noticeNo) {
        noticeMapper.updateCount(noticeNo);
    }
}


