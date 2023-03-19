package com.uni.blueisland.board.model.dao;


import com.uni.blueisland.board.model.dto.BoardReplyDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardReplyMapper {

    int insertReply(BoardReplyDto boardReplyDto);
    List<BoardReplyDto> selectReplyList(Long boardNo);
    int modifyBoardReply(BoardReplyDto boardReplyDto);

    int deleteBoardReply(BoardReplyDto boardReplyDto);
}
