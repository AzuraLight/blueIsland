package com.uni.blueisland.board.model.dto;

import com.uni.blueisland.common.model.dto.CommonDto;
import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardDto extends CommonDto {

    private Long boardNo;
    private String memberId;
    private String boardTitle;
    private String boardContent;
    private String status;
    private int boardCount;
}
