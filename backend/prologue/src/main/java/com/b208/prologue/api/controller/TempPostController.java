package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.SaveTempPostRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.GetTempPostResponse;
import com.b208.prologue.api.response.SaveTempPostResponse;
import com.b208.prologue.api.service.TempPostService;
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
@RequestMapping("/api/temp-posts")
@RequiredArgsConstructor
public class TempPostController {

    private final TempPostService tempPostService;

    @GetMapping("")
    @ApiOperation(value = "임시 저장 게시물 조회", notes = "임시 저장 게시물 불러오기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "임시 저장 게시물 조회 성공", response = GetTempPostResponse.class),
            @ApiResponse(code = 400, message = "임시 저장 게시물 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getTempPost(@RequestParam String githubId,
                                                                  @RequestParam Long tempPostId) {
        try {
            Map<String, Object> result = tempPostService.getTempPost(githubId, tempPostId);
            if (result == null)
                return ResponseEntity.status(400).body(BaseResponseBody.of(400, "임시 저장 게시물 조회에 실패헸습니다."));
            return ResponseEntity.status(200).body(GetTempPostResponse.of(result, 200, "임시 저장 게시물 조회 성공했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "임시 저장 게시물 조회에 실패헸습니다."));
        }
    }

    @PostMapping("")
    @ApiOperation(value = "게시글 임시 저장", notes = "게시글을 임시 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 임시 저장 성공", response = SaveTempPostResponse.class),
            @ApiResponse(code = 400, message = "게시글 임시 저장 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> saveTempPost(@Valid @RequestBody SaveTempPostRequest saveTempPostRequest) {
        try {
            Long tempPostId = tempPostService.saveTempPost(saveTempPostRequest);
            return ResponseEntity.status(200).body(SaveTempPostResponse.of(tempPostId, 200, "게시글 임시 저장에 성공했습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 임시 저장에 실패헸습니다."));
        }
    }
}
