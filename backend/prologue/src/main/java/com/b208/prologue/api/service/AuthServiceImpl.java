package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.AuthAccessTokenResponse;
import com.b208.prologue.api.response.github.AuthUserInfoResponse;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
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

    private final WebClient webClient;

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
    public Mono<AuthAccessTokenResponse> getAccessToken(String code) {

        HttpClient httpClient = HttpClient.create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 5000)
                .responseTimeout(Duration.ofMillis(5000))
                .doOnConnected(conn ->
                        conn.addHandlerLast(new ReadTimeoutHandler(5000, TimeUnit.MILLISECONDS))
                                .addHandlerLast(new WriteTimeoutHandler(5000, TimeUnit.MILLISECONDS)));

        WebClient client = WebClient.builder()
                .baseUrl("https://github.com")
                .defaultUriVariables(Collections.singletonMap("url", "https://github.com"))
                .defaultHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_VALUE)
                .clientConnector(new ReactorClientHttpConnector(httpClient))
                .build();


        MultiValueMap<String, String> formData = new LinkedMultiValueMap<>();
        formData.add("client_id", clientId);
        formData.add("client_secret", clientSecret);
        formData.add("code", code);

        return client.post()
                .uri("/login/oauth/access_token")
                .body(BodyInserters.fromFormData(formData))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(AuthAccessTokenResponse.class);
    }

    @Override
    public Mono<AuthUserInfoResponse> getUserInfo(String accessToken) {
        return webClient.get()
                .uri("/user")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(AuthUserInfoResponse.class);
    }

}
