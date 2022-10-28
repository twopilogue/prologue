package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.PostListResponse;
import com.b208.prologue.api.service.PostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/posts")
@RequiredArgsConstructor
public class PostsController {

    private final PostService postService;

    @GetMapping("/list")
    @ApiOperation(value = "게시물 목록 조회", notes = "게시물 목록 조회를 위해 Git 통신")
    @ApiResponses({
            @ApiResponse(code = 200, message = "목록 조회 성공", response = PostListResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getPost(@RequestParam String accessToken, @RequestParam String githubId, @RequestParam String repoName){
        List<String> result = postService.getList(accessToken, githubId, repoName);

        return ResponseEntity.status(200).body(PostListResponse.of(result,200, "게시물 목록 조회 성공"));
    }
}
