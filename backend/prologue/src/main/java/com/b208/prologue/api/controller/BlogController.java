package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.service.BlogService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @GetMapping("/repo")
    @ApiOperation(value = "블로그 레포지토리 생성", notes = "블로그 개설을 위한 레포지토리를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 생성 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> createRepository(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                       @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId){
        blogService.createRepository(accessToken, githubId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "레포지토리 생성을 완료했습니다."));
    }
}