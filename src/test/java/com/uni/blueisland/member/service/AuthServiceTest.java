package com.uni.blueisland.member.service;


import com.uni.blueisland.common.ResponseDto;
import com.uni.blueisland.member.model.dto.MemberDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;


@Transactional
@Rollback
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class AuthServiceTest {
    @LocalServerPort
    private int port;

    @Autowired
    private AuthService authService;

    @Autowired
    private TestRestTemplate restTemplate;


    @Test
    void 회원가입() {
        //given
        MemberDto member = new MemberDto();
        member.setMemberId("user07");
        member.setMemberPwd("pass07");
        member.setMemberName("이준");

        String url = "http://localhost:" + port + "/auth/signup";

        //when
        ResponseEntity<ResponseDto> response = restTemplate.postForEntity(url, member, ResponseDto.class);

        //then
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        authService.signup(member);
    }

    @Test
    void 로그인() {

        //given
        MemberDto member = new MemberDto();
        member.setMemberId("user07");
        member.setMemberPwd("pass07");

        String url = "http://localhost:" + port + "/auth/login";

        //when
        ResponseEntity<ResponseDto> response = restTemplate.postForEntity(url, member, ResponseDto.class);

        //then
        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        authService.login(member);

    }
}