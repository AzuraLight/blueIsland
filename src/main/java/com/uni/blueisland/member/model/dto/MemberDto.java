package com.uni.blueisland.member.model.dto;

import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDateTime;
import java.util.Collection;

@ToString
@Getter
@Setter
@AllArgsConstructor
@RequiredArgsConstructor
public class MemberDto implements UserDetails {

    private Long memberNo;
    private String memberId;
    private String memberPwd;
    private String memberName;
    private String memberRole;
    private LocalDateTime appendDate;
    private LocalDateTime updateDate;


    // 시큐리티
    private Collection<? extends GrantedAuthority> authorities;

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return this.authorities;
    }

    @Override
    public String getPassword() {
        return this.memberPwd;

    }

    @Override
    public String getUsername() {
        return this.memberName ;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
