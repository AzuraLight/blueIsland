package com.uni.blueisland.board.model.dto;

import com.uni.blueisland.common.model.dto.CommonDto;
import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class BoardReplyDto  extends CommonDto {
    private Long replyNo;
    private Long boardNo;
    private String memberId;
    private String ReplyContent;
    private String status;
}
