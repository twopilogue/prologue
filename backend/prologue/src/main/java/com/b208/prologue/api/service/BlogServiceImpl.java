package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.*;
import com.b208.prologue.api.response.github.*;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class BlogServiceImpl implements BlogService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final CommonService commonService;
    static private List<TreeRequest> treeRequestList;

    @Override
    public void createRepository(String encodedAccessToken, String githubId) throws Exception {

        CreateRepositoryRequest createRepositoryRequest = new CreateRepositoryRequest(githubId + ".github.io");

        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        webClient.post()
                .uri("/user/repos")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createRepositoryRequest), CreateRepositoryRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void updateDeployBranch(String encodedAccessToken, String githubId) throws Exception {

        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        SourceRequest sourceRequest = new SourceRequest("deploy", "/");
        UpdateDeployBranchRequest updateDeployBranchRequest = new UpdateDeployBranchRequest(sourceRequest);
        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/pages")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateDeployBranchRequest), UpdateDeployBranchRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void deleteRepository(String encodedAccessToken, String githubId) throws Exception {

        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        webClient.delete()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public boolean checkUserRepository(String encodedAccessToken, String githubId) throws Exception {

        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        RepositoryListResponse[] repoList = webClient.get()
                .uri("/users/" + githubId + "/repos")
                .headers(h -> h.setBearerAuth(accessToken))
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
    public void selectTemplate(String encodedAccessToken, String githubId, String template) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        treeRequestList = new ArrayList<>();
        searchTemplate(accessToken, githubId, template, "");
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, "template upload");
    }

    public void searchTemplate(String accessToken, String githubId, String template, String path) {
        GetTemplateFileResponse[] templateFileList = webClient.get()
                .uri("/repos/team-epilogue/" + template + "/contents/" + path)
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetTemplateFileResponse[].class).block();
        for (GetTemplateFileResponse getTemplateFileResponse : templateFileList) {
            if (getTemplateFileResponse.getType().equals("file")) {
                getFileContent(accessToken, githubId, template, getTemplateFileResponse.getPath());
            } else {
                searchTemplate(accessToken, githubId, template, getTemplateFileResponse.getPath());
            }
        }
    }

    public void getFileContent(String accessToken, String githubId, String template, String path) {
        GetFileContentResponse getFileContentResponse = webClient.get()
                .uri("/repos/team-epilogue/" + template + "/contents/" + path)
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetFileContentResponse.class).block();
        String content = commonService.makeBlob(accessToken, githubId, getFileContentResponse.getContent());
        treeRequestList.add(new TreeRequest(path, "100644", "blob", content));
    }

    @Override
    public void createWorkflow(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        ClassPathResource resource = new ClassPathResource("deploy.yaml");
        BufferedReader br = new BufferedReader(new InputStreamReader(resource.getInputStream()));
        StringBuilder sb = new StringBuilder();
        String nullString = "";
        while ((nullString = br.readLine()) != null) {
            sb.append(nullString).append("\n");
        }
        String workflow = base64Converter.encode(sb.toString());

        CreateContentRequest createContentRequest = new CreateContentRequest("upload git action workflow", workflow);
        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/.github/workflows/deploy.yaml")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createContentRequest), CreateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class).block();
    }
}