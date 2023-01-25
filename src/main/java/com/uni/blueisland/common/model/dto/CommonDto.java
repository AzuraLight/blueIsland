package com.uni.blueisland.common.model.dto;

import com.uni.blueisland.common.paging.Criteria;
import com.uni.blueisland.common.paging.PaginationInfo;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class CommonDto extends Criteria {
    /** 페이징 정보 */
    private PaginationInfo paginationInfo;

    private LocalDateTime appendDate;
}
