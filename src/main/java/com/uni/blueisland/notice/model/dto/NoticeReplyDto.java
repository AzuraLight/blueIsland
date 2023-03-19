package com.uni.blueisland.notice.model.dto;

import com.uni.blueisland.common.model.dto.CommonDto;
import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
public class NoticeReplyDto  extends CommonDto {
    private Long replyNo;
    private Long noticeNo;
    private String memberId;
    private String ReplyContent;
    private String status;
}
