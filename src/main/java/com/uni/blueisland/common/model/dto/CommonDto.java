package com.uni.blueisland.common.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.uni.blueisland.common.paging.backup.Criteria;
import com.uni.blueisland.common.paging.backup.PaginationInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommonDto extends Criteria {
    /** 페이징 정보 */
    private PaginationInfo paginationInfo;

    @JsonFormat(shape= JsonFormat.Shape.STRING, pattern="yyyy-MM-dd HH:mm:ss", timezone="Asia/Seoul")
    private LocalDateTime appendDate;
}
