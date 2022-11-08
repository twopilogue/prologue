package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.CreateBlogTemplateRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.CheckRepositoryResponse;
import com.b208.prologue.api.service.BlogService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/blog")
@RequiredArgsConstructor
public class BlogController {

    private final BlogService blogService;

    @PostMapping("/repo")
    @ApiOperation(value = "블로그 레포지토리 생성", notes = "블로그 개설을 위한 레포지토리를 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 생성 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> createRepository(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                       @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        blogService.createRepository(accessToken, githubId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "레포지토리 생성을 완료했습니다."));
    }

    @DeleteMapping("/repo")
    @ApiOperation(value = "블로그 레포지토리 삭제", notes = "블로그 개설을 위한 기존 레포지토리를 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 삭제 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> deleteRepository(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                       @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        blogService.deleteRepository(accessToken, githubId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "레포지토리 삭제를 완료했습니다."));
    }

    @GetMapping("/list")
    @ApiOperation(value = "블로그 레포지토리 조회", notes = "블로그 개설을 위한 기존 레포지토리를 조회 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 레포지토리 조회 성공", response = CheckRepositoryResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends CheckRepositoryResponse> checkUserRepository(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                                 @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        Boolean checkRepository = blogService.checkUserRepository(accessToken, githubId);
        return ResponseEntity.status(200).body(CheckRepositoryResponse.of(checkRepository, 200, "블로그 레포지토리 조회를 완료했습니다."));
    }

    @PostMapping("/template")
    @ApiOperation(value = "블로그 템플릿 생성", notes = "블로그 템플릿을 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "블로그 템플릿 생성", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> selectBlogTemplate(@Valid @RequestBody CreateBlogTemplateRequest createBlogTemplateRequest) throws Exception {
        blogService.selectTemplate(createBlogTemplateRequest.getAccessToken(), createBlogTemplateRequest.getGithubId(), createBlogTemplateRequest.getTemplate());
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "블로그 템플릿 생성을 완료했습니다."));
    }

    @PostMapping("/workflow")
    @ApiOperation(value = "git actions workflow 생성", notes = "git actions workflow 를 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "git actions workflow 생성", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> createWorkflow(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                     @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        blogService.createWorkflow(accessToken, githubId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "git actions workflow 생성을 완료했습니다."));
    }

    @PutMapping("/deploy-branch")
    @ApiOperation(value = "깃허브 페이지 배포 프렌치 수정", notes = "git actions workflow 를 생성 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "깃허브 페이지 배포 프렌치 수정", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> updateDeployBranch(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                         @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        blogService.updateDeployBranch(accessToken, githubId);
        return ResponseEntity.status(200).body(BaseResponseBody.of(200, "깃허브 페이지 배포 프렌치 수정을 완료했습니다."));
    }

}
