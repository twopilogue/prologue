package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.DashBoardPostRequest;
import com.b208.prologue.api.response.*;
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
import java.util.Set;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/dashboard")
@RequiredArgsConstructor
public class DashBoardController {

    private final DashBoardService dashBoardService;

    @GetMapping("/list")
    @ApiOperation(value = "최신게시글 5개 조회", notes = "최신게시물 조회를 위해 Git 통신")
    @ApiResponses({
            @ApiResponse(code = 200, message = "목록 조회 성공", response = PostListResponse.class),
            @ApiResponse(code = 400, message = "게시글 목록 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getCurrentPost(@RequestParam String accessToken, @RequestParam String githubId) {
        try {
            List<DashBoardPostRequest> result = dashBoardService.getList(accessToken, githubId);
            return ResponseEntity.status(200).body(DashBoardListResponse.of(result, 200, "게시글 목록 조회 성공"));
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
                                                                        @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId,
                                                                        @RequestParam @ApiParam(value = "사용자 블로그 템플릿", required = true) String template) throws Exception {
        Double size = dashBoardService.getRepositorySize(accessToken, githubId, template);
        return ResponseEntity.status(200).body(RepositorySizeResponse.of(size, 200, "레포지토리 사용량 조회 성공"));
    }

    @GetMapping("/month-posts")
    @ApiOperation(value = "게시글 날짜 조회", notes = "게시글 날짜 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "게시글 날짜 조회 성공", response = DateListResponse.class),
            @ApiResponse(code = 400, message = "게시글 날짜 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getDateList(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            Set<String> result = dashBoardService.getDateList(accessToken, githubId);

            return ResponseEntity.status(200).body(DateListResponse.of(result, 200, "게시글 날짜목록 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "게시글 날짜목록 조회에 실패하였습니다."));
        }
    }

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

    @GetMapping("/total")
    @ApiOperation(value = "게시글 수 조회", notes = "게시글 수 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "전체 게시글 수 조회 성공", response = DateListResponse.class),
            @ApiResponse(code = 400, message = "전체 게시글 수 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getTotalPostCount(@RequestParam String accessToken, @RequestParam String githubId) {

        try {
            int result = dashBoardService.getTotalCount(accessToken, githubId);

            return ResponseEntity.status(200).body(GetTotalCountResponse.of(result, 200, "전체 게시글 수 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "전체 게시글 수 조회에 실패하였습니다."));
        }
    }

    @GetMapping("/build")
    @ApiOperation(value = "빌드 상태 조회", notes = "빌드 상태 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "빌드 상태 조회 성공", response = GetBuildStateResponse.class),
            @ApiResponse(code = 400, message = "빌드 상태 조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getBuildState(@RequestParam String accessToken, @RequestParam String githubId) {
        try {
            String buildState = dashBoardService.getBuildState(accessToken, githubId);
            return ResponseEntity.status(200).body(GetBuildStateResponse.of(buildState, 200, "빌드 상태 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "빌드 상태 조회에 실패하였습니다."));
        }
    }

    @GetMapping("/check")
    @ApiOperation(value = "레포지토리 변경 사항 여부 조회", notes = "레포지토리 변경 사항 여부 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 변경 사항 여부 성공", response = GetCheckUpdateResponse.class),
            @ApiResponse(code = 400, message = "조회 실패", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkUpdate(@RequestParam String accessToken, @RequestParam String githubId) {
        try {
            boolean checkUpdate = dashBoardService.checkUpdate(accessToken, githubId);
            return ResponseEntity.status(200).body(GetCheckUpdateResponse.of(checkUpdate, 200, "레포지토리 변경 사항 여부 조회 성공"));
        } catch (Exception e) {
            return ResponseEntity.status(400).body(BaseResponseBody.of(400, "레포지토리 변경 사항 여부 조회에 실패하였습니다."));
        }
    }
}
