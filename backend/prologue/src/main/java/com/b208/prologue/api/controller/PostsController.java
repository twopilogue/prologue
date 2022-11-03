package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.ModifyDetailPostRequest;
import com.b208.prologue.api.request.RemoveDetailPostRequest;
import com.b208.prologue.api.request.WriteDetailPostRequest;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.DetailPostResponse;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.PostListResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.service.PostService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

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
    public ResponseEntity<? extends BaseResponseBody> getPost(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            Map<String, List<String>> result = postService.getList(accessToken, githubId);

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

        GetRepoContentResponse getRepoContentResponse = null;
        try {
            getRepoContentResponse = postService.getDetailPost(accessToken, githubId, directory);
            List<ImageResponse> images = postService.getImages(accessToken, githubId, directory);
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
    public ResponseEntity<? extends BaseResponseBody> writeDetailPost(WriteDetailPostRequest writeDetailPostRequest) {

        try {
            postService.insertDetailPost(writeDetailPostRequest.getAccessToken(), writeDetailPostRequest.getGithubId(),
                    writeDetailPostRequest.getContent(), writeDetailPostRequest.getFiles());
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
    public ResponseEntity<? extends BaseResponseBody> modifyDetailPost(ModifyDetailPostRequest modifyDetailPostRequest) {

        try {
            postService.updateDetailPost(modifyDetailPostRequest.getAccessToken(), modifyDetailPostRequest.getGithubId(),
                    modifyDetailPostRequest.getDirectory(), modifyDetailPostRequest.getContent(), modifyDetailPostRequest.getSha(), modifyDetailPostRequest.getFiles());
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
    public ResponseEntity<? extends BaseResponseBody> removeDetailPost(@RequestBody RemoveDetailPostRequest removeDetailPostRequest) {

        try {
            postService.deleteDetailPost(removeDetailPostRequest.getAccessToken(), removeDetailPostRequest.getGithubId(), removeDetailPostRequest.getDirectory());
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "게시글 삭제에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 삭제에 실패하였습니다."));
        }
    }
}
