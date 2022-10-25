package com.b208.prologue.api.service;

import com.b208.prologue.api.request.request.AuthAccessTokenRequest;
import com.b208.prologue.api.response.github.AuthAccessTokenRespense;
import com.b208.prologue.api.response.github.UserInfo;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.reactive.function.BodyInserters;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.time.Duration;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

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
        HttpEntity<String> entity = new HttpEntity<String>(requestBody.toString(), headers);

        return restTemplate.postForObject(
                "https://github.com/login/oauth/access_token",
                entity,
                AuthAccessTokenRespense.class
        ).getAccessToken();
    }

    @Override
    public Mono<UserInfo> getUserInfo(String accessToken) {
        return null;
    }


}