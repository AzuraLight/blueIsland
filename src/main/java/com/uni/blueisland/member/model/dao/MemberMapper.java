package com.uni.blueisland.member.model.dao;


import com.uni.blueisland.member.model.dto.MemberDto;
import org.apache.ibatis.annotations.Mapper;
import java.util.Optional;

@Mapper
public interface MemberMapper {

    int insertMember(MemberDto member);

    Optional<MemberDto> findByMemberId(String memberId);

    MemberDto selectByMemberId(String memberId);
}
