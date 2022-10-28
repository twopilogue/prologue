package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.PostCountResponse;
import com.b208.prologue.api.response.PostListResponse;
import com.b208.prologue.api.service.DashBoardService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final DashBoardService dashBoardService;

    @GetMapping("/list")
    @ApiOperation(value = "최신게시물 5개 조회", notes = "최신게시물 조회를 위해 Git 통신")
    @ApiResponses({
            @ApiResponse(code = 200, message = "목록 조회 성공", response = PostListResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getCurrentPost(@RequestParam String accessToken, @RequestParam String githubId){
        List<String> result = dashBoardService.getList(accessToken, githubId);

        return ResponseEntity.status(200).body(PostListResponse.of(result, 200, "게시물 목록 조회 성공"));
    }

    @GetMapping("/count")
    @ApiOperation(value = "게시물 수 조회", notes = "전체 게시물 수 확인을 위한 Git 통신")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시물 수 조회 성공", response = PostCountResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getPostCount(@RequestParam String accessToken, @RequestParam String githubId){
        int result = dashBoardService.getListCount(accessToken, githubId);

        return ResponseEntity.status(200).body(PostCountResponse.of(result, 200, "게시물 수 조회 성공"));
    }
}
