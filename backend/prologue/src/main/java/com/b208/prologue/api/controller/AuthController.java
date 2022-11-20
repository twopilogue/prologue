package com.b208.prologue.api.controller;

import com.b208.prologue.api.request.CreateAuthFileRequest;
import com.b208.prologue.api.response.AuthFileCheckResponse;
import com.b208.prologue.api.response.AuthUriResponse;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.response.UserInfoResponse;
import com.b208.prologue.api.response.github.AuthUserInfoResponse;
import com.b208.prologue.api.service.AuthService;
import com.b208.prologue.common.Base64Converter;
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
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final Base64Converter base64Converter;

    @GetMapping("/uri")
    @ApiOperation(value = "GitHub 연동 uri 조회", notes = "GitHub 연동하기위한 uri를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "GitHub 연동 uri 조회 성공", response = AuthUriResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getUri() {
        String uri = authService.getUri();
        return ResponseEntity.status(200).body(AuthUriResponse.of(uri, 200, "GitHub 연동 uri 조회에 성공하였습니다."));
    }

    @GetMapping("/login")
    @ApiOperation(value = "GitHub 로그인 후 사용자 정보 조회", notes = "GitHub에서 사용자 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "GitHub 사용자 정보 조회 성공", response = UserInfoResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> login(@RequestParam String code) {
        String accessToken = authService.getAccessToken(code).block().getAccessToken();
        try {
            String encodedAccessToken = base64Converter.encryptAES256(accessToken);
            AuthUserInfoResponse userInfo = authService.getUserInfo(accessToken).block();
            return ResponseEntity.status(200).body(UserInfoResponse.of(encodedAccessToken, userInfo, 200, "GitHub 사용자 정보 조회에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "GitHub 사용자 정보 조회에 실패하였습니다."));
    }

    @PutMapping("/secrets")
    @ApiOperation(value = "레포지토리 시크릿 생성", notes = "레포지토리 시크릿을 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "레포지토리 시크릿 생성 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> createSecrets(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                    @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        try {
            authService.createRepositorySecrets(accessToken, githubId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "레포지토리 시크릿 생성에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "레포지토리 시크릿 생성에 실패하였습니다."));
    }

    @GetMapping("/check")
    @ApiOperation(value = "서비스 인증 파일 조회", notes = "서비스 인증 파일을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "서비스 인증 파일 조회 성공", response = AuthFileCheckResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> checkAuthFile(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                                    @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {
        try {
            AuthFileCheckResponse authFileCheckResponse = authService.checkAuthFile(accessToken, githubId);
            boolean checkAuthFile = authFileCheckResponse.isCheckAuthFile();
            Integer blogType = authFileCheckResponse.getBlogType();
            String template = authFileCheckResponse.getTemplate();
            return ResponseEntity.status(200).body(AuthFileCheckResponse.of(checkAuthFile, blogType, template, 200, "서비스 인증 파일 조회를 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "서비스 인증 파일 조회를 실패하였습니다."));
    }

    @PutMapping("/check")
    @ApiOperation(value = "서비스 인증 파일 생성", notes = "서비스 인증 파일을 생성한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "서비스 인증 파일 생성 성공", response = AuthFileCheckResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> createAuthFile(@Valid @RequestBody CreateAuthFileRequest createAuthFileRequest) throws Exception {
        try {
            authService.createAuthFile(createAuthFileRequest);
            return ResponseEntity.status(200).body(AuthFileCheckResponse.of(true, createAuthFileRequest.getBlogType(), createAuthFileRequest.getTemplate(), 200, "서비스 인증 파일 생성을 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "서비스 인증 파일 생성을 실패하였습니다."));
    }

}
