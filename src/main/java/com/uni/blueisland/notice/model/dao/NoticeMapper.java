package com.uni.blueisland.notice.model.dao;

import com.uni.blueisland.common.paging.SelectCriteria;
import com.uni.blueisland.notice.model.dto.NoticeDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;


@Mapper
public interface NoticeMapper {

    int insertNotice(NoticeDto noticeDto);

//    int selectNoticeTotal(NoticeDto noticeDto);

    List<NoticeDto> selectNoticeList(NoticeDto noticeDto);

    int modifyNotice(NoticeDto noticeDto);

    int deleteNotice(NoticeDto noticeDto);

    NoticeDto selectNotice(Long noticeNo);

    int selectNoticeTotal();

    List<NoticeDto> selectNoticeListWithPaging(SelectCriteria selectCriteria);
}
