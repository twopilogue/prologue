package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.CreateRepositoryRequest;
import com.b208.prologue.api.response.github.RepositoryListResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.Arrays;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;

    @Override
    public void createRepository(String accessToken, String githubId) throws Exception {

        CreateRepositoryRequest createRepositoryRequest = new CreateRepositoryRequest(githubId + ".github.io");

        String decodeAccessToken = base64Converter.decryptAES256(accessToken);

        webClient.post()
                .uri("/user/repos")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .body(Mono.just(createRepositoryRequest), CreateRepositoryRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void deleteRepository(String accessToken, String githubId) throws Exception {

        String decodeAccessToken = base64Converter.decryptAES256(accessToken);

        webClient.delete()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public boolean checkUserRepository(String accessToken, String githubId) throws Exception{

        String decodeAccessToken = base64Converter.decryptAES256(accessToken);

        RepositoryListResponse[] repoList = webClient.get()
                .uri("/users/"+githubId+"/repos")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(RepositoryListResponse[].class)
                .block();
        for (RepositoryListResponse  repositoryListResponse : repoList) {
            if(repositoryListResponse.getName().equals(githubId+".github.io")) return true;
        }
        return false;
    }

}