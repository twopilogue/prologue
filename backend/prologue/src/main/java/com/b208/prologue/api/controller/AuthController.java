package com.b208.prologue.api.controller;

import com.b208.prologue.api.response.AuthUriResponse;
import com.b208.prologue.api.response.BaseResponseBody;
import com.b208.prologue.api.service.AuthService;
import io.swagger.annotations.ApiOperation;
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

    @GetMapping("/uri")
    @ApiOperation(value = "GitHub 연동 uri 조회", notes = "GitHub 연동하기위한 uri를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "GitHub 연동 uri 조회 성공", response = AuthUriResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = BaseResponseBody.class)
    })
    public ResponseEntity<? extends BaseResponseBody> getUri(){
        String uri = authService.getUri();
        return ResponseEntity.status(200).body(AuthUriResponse.of(uri, 200, "GitHub 연동 uri 조회에 성공하였습니다."));
    }

}
