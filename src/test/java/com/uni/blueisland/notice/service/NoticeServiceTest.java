package com.uni.blueisland.notice.service;

import com.uni.blueisland.notice.model.dao.NoticeMapper;
import com.uni.blueisland.notice.model.dto.NoticeDto;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.test.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.Rollback;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Transactional
@Rollback
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
class NoticeServiceTest {

    @LocalServerPort
    private int port;

    @Autowired
    private NoticeService noticeService;
    @Autowired
    private TestRestTemplate restTemplate;

    @Test
    void 공지사항_작성_테스트() {
     
    }

    @Test
    void 공지사항_전체_조회_서비스() {

        NoticeDto noticeDto = new NoticeDto();
        //given
        String url = "http://localhost:" + port + "/api/notices/read-only";

        //when
        ResponseEntity<NoticeDto> response = restTemplate.getForEntity(url, NoticeDto.class);

        //then

        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

        Assertions.assertThat(response.getBody()).isEqualTo(10);
        
    }

    @Test
    void 공지사항_수정_테스트() {
    }

    @Test
    void 공지사항_삭제_테스트() {
    }

    @Test
    void 공지사항_상세보기_테스트() {
        //given
//        MemberDto member = new MemberDto();
//        member.setMemberId("user07");
//        member.setMemberPwd("pass07");
//        member.setMemberName("이준");

//        String url = "http://localhost:" + port + "/auth/signup";

        //when
//        ResponseEntity<ResponseDto> response = restTemplate.postForEntity(url, member, ResponseDto.class);

        //then
//        Assertions.assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);
//
//        authService.signup(member);
    }
}