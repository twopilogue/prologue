package com.b208.prologue.api.controller;

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

    @GetMapping("/secrets")
    @ApiOperation(value = "GitHub 로그인 후 사용자 정보 조회", notes = "GitHub에서 사용자 정보를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "GitHub 사용자 정보 조회 성공", response = BaseResponseBody.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> login(@RequestParam @ApiParam(value = "accessToken", required = true) String accessToken,
                                                            @RequestParam @ApiParam(value = "사용자 깃허브 아이디", required = true) String githubId) throws Exception {

        try {
            authService.createRepositorySecrets(accessToken, githubId);
            return ResponseEntity.status(200).body(BaseResponseBody.of(200, "GitHub 사용자 정보 조회에 성공하였습니다."));
        } catch (Exception e) {
            e.printStackTrace();
        }
        return ResponseEntity.status(400).body(BaseResponseBody.of(400, "GitHub 사용자 정보 조회에 실패하였습니다."));
    }


}
