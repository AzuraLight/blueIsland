package com.uni.blueisland.notice.model.dto;

import com.uni.blueisland.common.model.dto.CommonDto;
import lombok.*;

@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Data
@EqualsAndHashCode(callSuper=false)
public class NoticeDto extends CommonDto {
    private Long noticeNo;

    private String memberId;
    private String noticeTitle;
    private String noticeContent;
    private String status;
    private int noticeCount;

//    private List<MemberDto> memberId;
}
