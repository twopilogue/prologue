package com.b208.prologue.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final WebClient webClient;

    @Override
    public void createRepository(String accessToken, String githubId) {

        String dataJson = "{\"name\" : \""+ githubId + ".github.io\"}";

        webClient.post()
                .uri("/user/repos")
                .headers(h -> h.setBearerAuth(accessToken))
                .bodyValue(dataJson)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

}