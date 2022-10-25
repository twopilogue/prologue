package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.AuthUserInfoResponse;

public interface AuthService {
    String getUri();
    String getAccessToken(String code);
    AuthUserInfoResponse getUserInfo(String accessToken);
}