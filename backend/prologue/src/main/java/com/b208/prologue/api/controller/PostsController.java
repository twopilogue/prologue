package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.*;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.DetailPostResponse;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.PostListResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.service.PostService;
import io.swagger.annotations.ApiModelProperty;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

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
            @ApiResponse(code = 400, message = "게시글 목록 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getPost(@RequestParam String accessToken, @RequestParam String githubId, @RequestParam int page) {

        try {
            Map<String, Object> result = postService.getList(accessToken, githubId, page);

            return ResponseEntity.status(200).body(PostListResponse.of(result, 200, "게시물 목록 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 목록 조회에 실패하였습니다."));
        }
    }

    @GetMapping("")
    @ApiOperation(value = "GitHub 게시글 상세 조회", notes = "GitHub에서 게시글을 상세 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 상세 조회 성공", response = DetailPostResponse.class),
            @ApiResponse(code = 400, message = "게시글 상세 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getDetailPost(@RequestParam String accessToken, @RequestParam String githubId, @RequestParam String directory) {

        String path = "content/blog/" + directory;
        try {
            GetRepoContentResponse getRepoContentResponse = postService.getDetailPost(accessToken, githubId, path);
            List<ImageResponse> images = postService.getImages(accessToken, githubId, path);
            return ResponseEntity.status(200).body(DetailPostResponse.of(getRepoContentResponse, images, 200, "게시글 상세 조회에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 상세 조회에 실패하였습니다."));
        }
    }

    @PostMapping("")
    @ApiOperation(value = "GitHub 게시글 작성", notes = "GitHub 블로그 게시글을 작성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 작성 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "게시글 작성 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> writeDetailPost(@Valid @RequestPart WriteDetailPostRequest writeDetailPostRequest, @RequestPart(required = false) List<MultipartFile> files) {

        try {
            postService.insertDetailPost(writeDetailPostRequest.getAccessToken(), writeDetailPostRequest.getGithubId(),
                    writeDetailPostRequest.getContent(), files);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "게시글 작성에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 작성에 실패하였습니다."));
        }
    }

    @PutMapping("")
    @ApiOperation(value = "GitHub 게시글 수정", notes = "GitHub 블로그 게시글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 수정 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "게시글 수정 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> modifyDetailPost(@Valid @RequestPart ModifyDetailPostRequest modifyDetailPostRequest, @RequestPart(required = false) List<MultipartFile> files) {

        String path = "content/blog/" + modifyDetailPostRequest.getDirectory();
        try {
            postService.updateDetailPost(modifyDetailPostRequest.getAccessToken(), modifyDetailPostRequest.getGithubId(),
                    path , modifyDetailPostRequest.getContent(), files, modifyDetailPostRequest.getDeletedFiles());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "게시글 수정에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 수정에 실패하였습니다."));
        }
    }

    @DeleteMapping("")
    @ApiOperation(value = "GitHub 게시글 삭제", notes = "GitHub 블로그 게시글을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 삭제 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "게시글 삭제 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> removeDetailPost(@Valid @RequestBody RemoveDetailPostRequest removeDetailPostRequest) {

        try {
            postService.deleteDetailPost(removeDetailPostRequest.getAccessToken(), removeDetailPostRequest.getGithubId(), removeDetailPostRequest.getDirectory());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "게시글 삭제에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 삭제에 실패하였습니다."));
        }
    }

    @GetMapping("/pages")
    @ApiOperation(value = "GitHub 페이지 글 조회", notes = "GitHub에서 페이지 글을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "페이지 글 조회 성공", response = DetailPostResponse.class),
            @ApiResponse(code = 400, message = "페이지 글 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getDetailPage(@RequestParam String accessToken, @RequestParam String githubId, @RequestParam String pageName) {

        String path = "content/pages/" + pageName;
        try {
            GetRepoContentResponse getRepoContentResponse = postService.getDetailPost(accessToken, githubId, path);
            List<ImageResponse> images = postService.getImages(accessToken, githubId, path);
            return ResponseEntity.status(200).body(DetailPostResponse.of(getRepoContentResponse, images, 200, "페이지 글 조회에 성공하였습니다."));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "페이지 글 조회에 실패하였습니다."));
        }
    }

    @PutMapping("/pages")
    @ApiOperation(value = "GitHub 페이지 글 수정", notes = "GitHub 페이지 글을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "페이지 글 수정 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 400, message = "페이지 글 수정 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> modifyDetailPage(@Valid @RequestPart ModifyDetailPageRequest modifyDetailPageRequest, @RequestPart(required = false) List<MultipartFile> files) {

        String path = "content/pages/" + modifyDetailPageRequest.getPageName();
        try {
            postService.updateDetailPost(modifyDetailPageRequest.getAccessToken(), modifyDetailPageRequest.getGithubId(),
                    path, modifyDetailPageRequest.getContent(), files, modifyDetailPageRequest.getDeletedFiles());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "페이지 글 수정에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "페이지 글 수정에 실패하였습니다."));
        }
    }
}
