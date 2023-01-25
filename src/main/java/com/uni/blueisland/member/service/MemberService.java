package com.uni.blueisland.member.service;

import com.uni.blueisland.member.model.dao.MemberMapper;
import com.uni.blueisland.member.model.dto.MemberDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

@Slf4j
@Service
public class MemberService {
    private final MemberMapper memberMapper;

    public MemberService(MemberMapper memberMapper) {
        this.memberMapper = memberMapper;
    }

    @GetMapping
    public MemberDto selectMyInfo(@PathVariable String userId) {
        log.info("[MemberService] getMyInfo Start ==============================");

        MemberDto user = memberMapper.selectByMemberId(userId);
        log.info("[MemberService] {}", user);
        log.info("[MemberService] getMyInfo End ==============================");

        return user;
    }


}