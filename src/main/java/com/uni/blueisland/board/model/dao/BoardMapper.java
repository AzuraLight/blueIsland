package com.uni.blueisland.board.model.dao;

import com.uni.blueisland.board.model.dto.BoardDto;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface BoardMapper {
    int selectBoardTotal(BoardDto boardDto);

    List<BoardDto> selectBoardList(BoardDto boardDto);

    BoardDto selectBoard(Long boardNo);

    int insertBoard(BoardDto boardDto);

    int modifyBoard(BoardDto boardDto);

    int deleteBoard(BoardDto boardDto);
}
