package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.AutoSavePostRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.CheckAutoSavePostsResponse;
import com.b208.prologue.api.response.GetAutoSavePostResponse;
import com.b208.prologue.api.service.AutoSavePostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auto-post")
@RequiredArgsConstructor
public class AutoSavePostController {

    private final AutoSavePostService autoSavePostService;

    @PostMapping("")
    @ApiOperation(value = "게시글 자동 저장", notes = "게시글을 자동 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 자동 저장 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "게시글 자동 저장 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> autoSavePost(@Valid @RequestBody final AutoSavePostRequest autoSavePostRequest) {
        try {
            autoSavePostService.autoSavePost(autoSavePostRequest);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "게시글 자동 저장에 성공했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 자동 저장에 실패헸습니다."));
        }
    }

    @GetMapping("")
    @ApiOperation(value = "자동 저장 게시글 조회", notes = "자동 저장 게시글 조회하기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "자동 저장 게시글 조회 성공", response = GetAutoSavePostResponse.class),
            @ApiResponse(code = 400, message = "자동 저장 게시글 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getAutoSavePost(@RequestParam String githubId) {
        try {
            final Map<String, Object> result = autoSavePostService.getAutoSavePost(githubId);
            return ResponseEntity.status(200).body(GetAutoSavePostResponse.of(result, 200, "자동 저장 게시글 조회에 성공했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "자동 저장 게시글 조회에 실패헸습니다."));
        }
    }

    @GetMapping("/exist")
    @ApiOperation(value = "자동 저장 게시글 존재 여부 확인", notes = "자동 저장 게시글 존재 여부 확인하기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "자동 저장 게시글 존재 여부 확인 성공", response = CheckAutoSavePostsResponse.class),
            @ApiResponse(code = 400, message = "자동 저장 게시글 존재 여부 확인 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkAutoSavePost(@RequestParam String githubId) {
        try {
            final boolean exist = autoSavePostService.checkAutoSavePost(githubId);
            final String updatedAt = exist ? autoSavePostService.getUpdatedTime(githubId) : null;
            return ResponseEntity.status(200).body(CheckAutoSavePostsResponse.of(exist, updatedAt, 200, "자동 저장 게시글 존재 여부 확인에 성공했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "자동 저장 게시글 존재 여부 확인에 실패헸습니다."));
        }
    }
}
