package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.GetBlogSettingResponse;
import com.b208.prologue.api.service.SettingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin("*")
@RequestMapping("/api/setting")
@RestController
@RequiredArgsConstructor
public class SettingConroller {

    private final SettingService settingService;

    @GetMapping("/blog")
    @ApiOperation(value = "블로그 설정 조회", notes = "블로그 설정 조회를 위해 Git 통신")
    @ApiResponses({
            @ApiResponse(code = 200, message = "설정 조회 성공", response = GetBlogSettingResponse.class),
            @ApiResponse(code = 400, message = "설정 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getBlogSetting(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
           List<String> result = settingService.getBlogSetting(accessToken, githubId);

            return ResponseEntity.status(200).body(GetBlogSettingResponse.of(result.get(0), result.get(1), 200, "블로그 설정 조회에 성공하였습니다."));
        }catch (Exception e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "블로그 설정 조회에 실패하였습니다."));
        }
    }
}
