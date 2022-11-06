package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.AuthAccessTokenRequest;
import com.b208.prologue.api.request.github.UpdateRepositorySecretRequest;
import com.b208.prologue.api.response.github.*;
import com.b208.prologue.common.Base64Converter;
import com.goterl.lazysodium.LazySodiumJava;
import com.goterl.lazysodium.SodiumJava;
import com.goterl.lazysodium.utils.Key;
import io.netty.channel.ChannelOption;
import io.netty.handler.timeout.ReadTimeoutHandler;
import io.netty.handler.timeout.WriteTimeoutHandler;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.client.reactive.ReactorClientHttpConnector;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import reactor.netty.http.client.HttpClient;

import java.nio.charset.StandardCharsets;
import java.time.Duration;
import java.util.Base64;
import java.util.Collections;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final Base64Converter base64Converter;
    private final WebClient webClient;
    private static String clientId;
    private static String clientSecret;

    @Value("${github.clientId}")
    private void setClientId(String clientId) {
        this.clientId = clientId;
    }

    @Value("${github.clientSecret}")
    private void setClientSecret(String clientSecret) {
        this.clientSecret = clientSecret;
    }

    @Override
    public String getUri() {
        return "https://github.com/login/oauth/authorize?client_id=" + clientId + "&scope=repo delete_repo workflow";
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

        AuthAccessTokenRequest requestBody = new AuthAccessTokenRequest(clientId, clientSecret, code);

        return client.post()
                .uri("/login/oauth/access_token")
                .body(Mono.just(requestBody), AuthAccessTokenRequest.class)
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

    @Override
    public void createRepositorySecrets(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        RepositoryPublicKeyResponse repositoryPublicKey = getRepositoryPublicKey(accessToken, githubId);
        Key publicKey = Key.fromBase64String(repositoryPublicKey.getKey());

        SodiumJava sodiumJava = new SodiumJava();
        LazySodiumJava lazySodiumJava = new LazySodiumJava(sodiumJava, StandardCharsets.UTF_8);

        String sealed_box = lazySodiumJava.cryptoBoxSealEasy(accessToken, publicKey);
        String encrypted_value = Base64.getEncoder().encodeToString(lazySodiumJava.sodiumHex2Bin(sealed_box));

        UpdateRepositorySecretRequest updateRepositorySecretRequest = new UpdateRepositorySecretRequest(encrypted_value, repositoryPublicKey.getKeyId());
        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/actions/secrets/TOKEN")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateRepositorySecretRequest), UpdateRepositorySecretRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public RepositoryPublicKeyResponse getRepositoryPublicKey(String accessToken, String githubId) {
        RepositoryPublicKeyResponse repositoryPublicKey = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/actions/secrets/public-key")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(RepositoryPublicKeyResponse.class)
                .block();
        return repositoryPublicKey;
    }

    public boolean checkAuthFile(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        GetFileNameResponse[] getFileList = webClient.get()
                .uri("/repos/" + githubId + "/" +githubId + ".github.io/contents")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetFileNameResponse[].class).block();
        for(GetFileNameResponse getFileNameResponse : getFileList){
            if(getFileNameResponse.getName().equals("AuthFile")) {
                GetFileContentResponse authFile = webClient.get()
                        .uri("/repos/" + githubId + "/" +githubId + ".github.io/contents/AuthFile")
                        .accept(MediaType.APPLICATION_JSON)
                        .headers(h -> h.setBearerAuth(accessToken))
                        .retrieve()
                        .bodyToMono(GetFileContentResponse.class).block();
                if(githubId.equals(base64Converter.decryptAES256(authFile.getContent()))) {
                    return true;
                }else {
                    return false;
                }
            }
        }
        return false;
    }

}
