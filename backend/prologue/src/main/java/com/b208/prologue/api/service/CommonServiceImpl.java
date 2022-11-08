package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.CreateBlobRequest;
import com.b208.prologue.api.request.github.CreateCommitRequest;
import com.b208.prologue.api.request.github.CreateTreeRequest;
import com.b208.prologue.api.request.github.UpdateReferencesRequest;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.GetShaResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CommonServiceImpl implements CommonService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;

    @Override
    public void multiFileCommit(String accessToken, String githubId, List treeRequestList, String commitMsg){

        GetShaResponse getBaseTreeSha = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/trees/main")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetShaResponse.class)
                .block();
        String base_tree = getBaseTreeSha.getSha();

        CreateTreeRequest createTreeRequest = new CreateTreeRequest(treeRequestList, base_tree);
        GetShaResponse getTreeSha = webClient.post()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/trees")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createTreeRequest), CreateTreeRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetShaResponse.class)
                .block();
        String treeSha = getTreeSha.getSha();

        String[] parents = {base_tree};
        CreateCommitRequest createCommitRequest = new CreateCommitRequest(treeSha, commitMsg, parents);
        GetShaResponse getCommitSha = webClient.post()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/commits")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createCommitRequest), CreateCommitRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetShaResponse.class)
                .block();
        String commitSha = getCommitSha.getSha();

        UpdateReferencesRequest updateReferencesRequest = new UpdateReferencesRequest(commitSha);
        webClient.patch()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/git/refs/heads/main")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateReferencesRequest), UpdateReferencesRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();

    }

    @Override
    public String makeBlob(String accessToken, String githubId, String content) {
        CreateBlobRequest createBlobRequest = new CreateBlobRequest(content, "base64");
        GetShaResponse getShaResponse = webClient.post()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io" + "/git/blobs")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createBlobRequest), CreateBlobRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetShaResponse.class).block();
        return getShaResponse.getSha();
    }

    @Override
    public GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception {
        return webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse.class).block();
    }

    @Override
    public GetRepoContentResponse[] getContentList(String accessToken, String githubId, String path) throws Exception {
        GetRepoContentResponse[] postResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse[].class).block();

        return postResponse;
    }

}
