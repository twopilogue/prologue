package com.b208.prologue.api.service;

import com.b208.prologue.api.request.CreateRepositoryRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final WebClient webClient;

    @Override
    public void createRepository(String accessToken, String githubId) {

        CreateRepositoryRequest createRepositoryRequest = new CreateRepositoryRequest(githubId + ".github.io");

        webClient.post()
                .uri("/user/repos")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createRepositoryRequest), CreateRepositoryRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}