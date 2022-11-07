package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.ModifyBlogCategoryRequest;
import com.b208.prologue.api.request.ModifyBlogSettingRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.BlogCategoryResponse;
import com.b208.prologue.api.response.BlogPagesResponse;
import com.b208.prologue.api.response.GetBlogSettingResponse;
import com.b208.prologue.api.service.SettingService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import javax.validation.Valid;

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

    @PutMapping("/blog")
    @ApiOperation(value = "블로그 설정 수정", notes = "블로그 설정을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 설정 수정 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "블로그 설정 수정 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBlogSetting(@Valid @RequestPart ModifyBlogSettingRequest modifyBlogSettingRequest, @RequestPart (required = false) MultipartFile imgFile) {
        try {
            settingService.updateBlogSetting(modifyBlogSettingRequest.getAccessToken(), modifyBlogSettingRequest.getGithubId(), modifyBlogSettingRequest.getModified());

            if(imgFile != null){
                settingService.updateProfileImage(modifyBlogSettingRequest.getAccessToken(), modifyBlogSettingRequest.getGithubId(), imgFile);
            }
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "블로그 설정 수정에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "블로그 설정 수정에 실패하였습니다."));
        }
    }

    @GetMapping("/category")
    @ApiOperation(value = "블로그 카테고리 조회", notes = "블로그 카테고리 설정을 위해 카테고리 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 카테고리 조회 성공", response = BlogCategoryResponse.class),
            @ApiResponse(code = 400, message = "블로그 카테고리 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getBlogCategory(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            String[] category = settingService.getBlogCategory(accessToken, githubId);
            return ResponseEntity.status(200).body(BlogCategoryResponse.of(category, 200, "블로그 카테고리 조회에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "블로그 카테고리 조회에 실패하였습니다."));
        }
    }

    @PutMapping("/category")
    @ApiOperation(value = "블로그 카테고리 수정", notes = "블로그 카테고리 목록을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 카테고리 수정 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "블로그 카테고리 수정 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> modifyBlogCategory(@Valid @RequestBody ModifyBlogCategoryRequest modifyBlogCategoryRequest) {

        try {
            settingService.updateBlogCategory(modifyBlogCategoryRequest.getAccessToken(), modifyBlogCategoryRequest.getGithubId(), modifyBlogCategoryRequest.getCategory());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "블로그 카테고리 수정에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "블로그 카테고리 수정에 실패하였습니다."));
        }
    }

    @GetMapping("/pages")
    @ApiOperation(value = "블로그 페이지 목록 조회", notes = "블로그 페이지 목록을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 페이지 목록 조회 성공", response = BlogPagesResponse.class),
            @ApiResponse(code = 400, message = "블로그 페이지 목록 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getBlogPages(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            String[] pages = settingService.getBlogPages(accessToken, githubId);
            return ResponseEntity.status(200).body(BlogPagesResponse.of(pages, 200, "블로그 페이지 목록 조회에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "블로그 페이지 목록 조회에 실패하였습니다."));
        }
    }
}
