package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.AuthAccessTokenResponse;
import com.b208.prologue.api.response.github.AuthUserInfoResponse;
import reactor.core.publisher.Mono;

public interface AuthService {
    String getUri();
    Mono<AuthAccessTokenResponse> getAccessToken(String code);
    Mono<AuthUserInfoResponse> getUserInfo(String accessToken);
    void createRepositorySecrets(String encodedAccessToken, String githubId) throws Exception;
    boolean checkAuthFile(String encodedAccessToken, String githubId) throws Exception;
    void createAuthFile(String encodedAccessToken, String githubId) throws Exception;

}