package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.AuthAccessTokenRespense;
import com.b208.prologue.api.response.github.UserInfo;
import reactor.core.publisher.Mono;

public interface AuthService {
    String getUri();
    String getAccessToken(String code);
    Mono<UserInfo> getUserInfo(String accessToken);
}