package com.b208.prologue.api.service;

import com.b208.prologue.api.request.request.AuthAccessTokenRequest;
import com.b208.prologue.api.response.github.AuthAccessTokenRespense;
import com.b208.prologue.api.response.github.AuthUserInfoResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService{

    private final RestTemplate restTemplate ;

    private static String clientId;
    private static String clientSecret;

    @Value("${github.clientId}")
    private void setClientId(String clientId){
        this.clientId=clientId;
    }

    @Value("${github.clientSecret}")
    private void setClientSecret(String clientSecret){
        this.clientSecret=clientSecret;
    }

    @Override
    public String getUri() {
        return "https://github.com/login/oauth/authorize?client_id="+clientId+"&scope=repo";
    }

    @Override
    public String getAccessToken(String code) {

        AuthAccessTokenRequest requestBody = new AuthAccessTokenRequest(clientId, clientSecret, code);

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        HttpEntity<String> request = new HttpEntity<String>(requestBody.toString(), headers);

        return restTemplate.postForObject(
                "https://github.com/login/oauth/access_token",
                request,
                AuthAccessTokenRespense.class
        ).getAccessToken();
    }

    @Override
    public AuthUserInfoResponse getUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        return restTemplate.exchange(
                "https://api.github.com/user",
                HttpMethod.GET,
                request,
                AuthUserInfoResponse.class
        ).getBody();
    }


}