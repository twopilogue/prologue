package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.BaseResponseBody;
<<<<<<< HEAD
import com.b208.prologue.api.response.DateListResponse;
=======
import com.b208.prologue.api.response.LatestBuildTimeResponse;
>>>>>>> cb70e4fa4444badf902da69845fbdbb5c8bf5789
import com.b208.prologue.api.response.PostListResponse;
import com.b208.prologue.api.response.RepositorySizeResponse;
import com.b208.prologue.api.service.DashBoardService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
            @ApiResponse(code = 400, message = "게시글 목록 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getCurrentPost(@RequestParam String accessToken, @RequestParam String githubId) {
        try {
            Map<String, Object> result = dashBoardService.getList(accessToken, githubId);

            List<Map<String, String>> images = dashBoardService.getListImagese(accessToken, githubId, (List<String>) result.get("directory"));
            return ResponseEntity.status(200).body(PostListResponse.of(result, images, 200, "게시물 목록 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 목록 조회에 실패하였습니다."));
        }
    }

    @GetMapping("/size")
    @ApiOperation(value = "레포지토리 사용량 조회", notes = "레포지토리 사용량 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 사용량 조회 성공", response = RepositorySizeResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getRepositorySize(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                        @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        Double size = dashBoardService.getRepositorySize(accessToken, githubId);
        return ResponseEntity.status(200).body(RepositorySizeResponse.of(size, 200, "레포지토리 사용량 조회 성공"));
    }

<<<<<<< HEAD
    @GetMapping("/month-posts")
    @ApiOperation(value = "게시글 날짜 조회", notes = "게시글 날짜 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 날짜 조회 성공", response = DateListResponse.class),
            @ApiResponse(code = 400, message = "게시글 날짜 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends  BaseResponseBody> getDateList(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            List<String> result = dashBoardService.getDateList(accessToken, githubId);

            return ResponseEntity.status(200).body(DateListResponse.of(result, 200, "게시물 목록 조회 성공"));
        } catch (Exception e){
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 목록 조회에 실패하였습니다."));
        }
    }

=======
    @GetMapping("/latest-build")
    @ApiOperation(value = "최근 빌드 시간 조회", notes = "최근 빌드 시간 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "최근 빌드 시간 조회 성공", response = LatestBuildTimeResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getLatestBuildTime(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                         @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        try {
            String latestBuildTime = dashBoardService.getLatestBuildTime(accessToken, githubId);
            return ResponseEntity.status(200).body(LatestBuildTimeResponse.of(latestBuildTime, 200, "최근 빌드 시간 조회 성공"));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(200).body(BaseResponseBody.of(400, "최근 빌드 시간 조회 실패"));
    }
>>>>>>> cb70e4fa4444badf902da69845fbdbb5c8bf5789

}
