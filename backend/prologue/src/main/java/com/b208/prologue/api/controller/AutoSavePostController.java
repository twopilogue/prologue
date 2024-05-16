package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.AutoSavePostRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.service.AutoSavePostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/auto-posts")
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
}
