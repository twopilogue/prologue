package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.CreateCommitRequest;
import com.b208.prologue.api.request.github.CreateRepositoryRequest;
import com.b208.prologue.api.request.github.CreateTreeRequest;
import com.b208.prologue.api.response.github.GetTemplateFileResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
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
    public boolean checkUserRepository(String accessToken, String githubId) throws Exception {

        String decodeAccessToken = base64Converter.decryptAES256(accessToken);

        RepositoryListResponse[] repoList = webClient.get()
                .uri("/users/" + githubId + "/repos")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(RepositoryListResponse[].class)
                .block();
        for (RepositoryListResponse repositoryListResponse : repoList) {
            if (repositoryListResponse.getName().equals(githubId + ".github.io")) return true;
        }
        return false;
    }

    @Override
    public void selectTemplate(String accessToken, String githubId, int templateNumber) throws Exception {
        String SHA = null;
        String tree = null;
        String message = null;
        String parents = null;

        String decodeAccessToken = base64Converter.decryptAES256(accessToken);

        // 디렉토리 내 파일 불러오기


        // tree 만들기
        CreateTreeRequest createTreeRequest = new CreateTreeRequest(tress, base_tree);
        webClient.post()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/trees")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .body(Mono.just(createCommitRequest), CreateCommitRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 커밋하기
        CreateCommitRequest createCommitRequest = new CreateCommitRequest(tree, message, parents);
        webClient.post()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/commits")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .body(Mono.just(createCommitRequest), CreateCommitRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        // 레퍼런스 업데이트
        CreateRepositoryRequest createRepositoryRequest = new CreateRepositoryRequest(SHA);
        webClient.patch()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/refs/heads/main")
                .headers(h -> h.setBearerAuth(decodeAccessToken))
                .body(Mono.just(createRepositoryRequest), CreateRepositoryRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    public void searchTemplate(String accessToken, String githubId, String path) {
        // 파일 경로,파일 컨텐츠 , 파일 이름 불러오기
        GetTemplateFileResponse[] templateFileList = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetTemplateFileResponse[].class).block();

        for (GetTemplateFileResponse getTemplateFileResponse : templateFileList) {
            if (getTemplateFileResponse.getType().equals("file")) {
                getFileContent();
            } else {
                searchTemplate(accessToken, githubId, getTemplateFileResponse.getType());
            }

        }
    }

    public void getFileContent(String accessToken, String githubId, String path) {
        GetTemplateFileResponse[] templateFileList = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetTemplateFileResponse[].class).block();
    }

}