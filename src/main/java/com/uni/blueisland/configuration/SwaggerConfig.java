package com.uni.blueisland.configuration;

import org.springframework.context.annotation.Bean;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;

import java.util.HashSet;
import java.util.Set;

public class SwaggerConfig {

    //상위에 올라갈 설명을 표기하기 위해서 API Info를 작성
    private ApiInfo swaggerInfo() {

        return new ApiInfoBuilder()
                .title("SWAGGER TEST API")
                .description("spring boot swagger 연동 테스트")
                .build();
    }

    @Bean
    public Docket swaggerApi() {

        return new Docket(DocumentationType.OAS_30)  // Swagger 3에서는 DocumentationType.OAS_30을 사용// Open Api Specification
                .consumes(getConsumeContentTypes()) // 타입을 작성해줘야 한다.
                .produces(getProduceContentTypes())
                .apiInfo(swaggerInfo()) // 제목 설명등 문서정보를 가져오기위해 호출
                .select() // ApiselectorBuilder 를 생성
//                .apis(RequestHandlerSelectors.any())	//apis: api 스펙이 작성되어 있는 패키지 (Controller) 를 지정 해서 문서화하기 위함 //모든 경로를 API화 // 하나만!
                .apis(RequestHandlerSelectors.basePackage("com.uni.restapi.section05"))	//지정된 패키지만 API화
                .paths(PathSelectors.any())	//paths: apis 에 있는 API 중 특정 path 를 선택해서 문서화	//모든 URL 패턴에 대해 수행
                .build()
                .useDefaultResponseMessages(false);//Swagger 에서 제공해주는 기본 응답 코드 (200, 401, 403, 404). false 로 설정하면 response에 기본 응답 코드를 노출하지 않음 ////기본 응답 메시지 표시 여부, true 설정시 무조건 출력
    }


    private Set<String> getConsumeContentTypes() {  // Request 타입

        Set<String> consumes = new HashSet<>();
        consumes.add("application/json;charset=UTF-8");
        consumes.add("application/x-www-form-urlencoded");

        return consumes;
    }

    private Set<String> getProduceContentTypes() {  //Response 타입

        Set<String> produces = new HashSet<>();
        produces.add("application/json;charset=UTF-8");

        return produces;
    }
}