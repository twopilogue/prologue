package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.*;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.GetShaResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.PostgetResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.util.*;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private List<TreeRequest> treeRequestList;

    @Override
    public Map<String, List<String>> getList(String encodedAccessToken, String githubId) throws Exception {

        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Map<String, List<String>> result = new HashMap<>();
        List<String> content = new ArrayList<>();
        List<String> directory = new ArrayList<>();

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = 0; i < list.length; i++) {
            content.add(setItem(url, accessToken, list[i].getPath()));
            directory.add(list[i].getName());
        }

        result.put("content", content);
        result.put("directory", directory);
        return result;
    }

    public String setItem(String url, String accessToken, String path) {
        PostgetResponse item = webClient.get()
                .uri(url + path + "/index.md")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostgetResponse.class).block();

        StringTokenizer st = new StringTokenizer(item.getContent(), "\n");
        StringBuilder sb = new StringBuilder();

        int val = st.countTokens();

        for (int i = 0; i < val; i++) {
            sb.append(st.nextToken());
        }

        String Line = "";
        try {
            Line = base64Converter.decode(sb.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return Line;
    }

    @Override
    public void insertDetailPost(String encodedAccessToken, String githubId, String content, List<MultipartFile> files) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "add: 새게시글 작성";

        treeRequestList = new ArrayList<>();

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String directory = String.valueOf(timeStamp.getTime());
        String path = "content/blog/" + directory;

        String encodedContent = makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", encodedContent));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                encodedContent = makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename(), "100644", "blob", encodedContent));
            }
        }
        push(accessToken, githubId, commit);
    }

    @Override
    public void updateDetailPost(String encodedAccessToken, String githubId, String directory, String content, String sha, List<MultipartFile> files) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 게시글 수정";
        String path = "content/blog/" + directory;

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                commit, base64Converter.encode(content), sha);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog/" + directory + "/index.md")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        if (files != null && !files.isEmpty()) {
            treeRequestList = new ArrayList<>();
            String encodedContent;
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                encodedContent = makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename(), "100644", "blob", encodedContent));
            }
            push(accessToken, githubId, commit);
        }

    }

    @Override
    public void deleteDetailPost(String encodedAccessToken, String githubId, String directory, String sha) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse[] responses = getContentList(accessToken, githubId, "content/blog/" + directory);
        Mono mono = null;

        for (int i = 0; i < responses.length; i++) {
            DeleteContentRequest deleteContentRequest = new DeleteContentRequest(
                    "remove: 게시글 삭제", responses[i].getSha());

            Mono<String> tmp = webClient.method(HttpMethod.DELETE)
                    .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + responses[i].getPath())
                    .headers(h -> h.setBearerAuth(accessToken))
                    .body(Mono.just(deleteContentRequest), DeleteContentRequest.class)
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(String.class);

            if (i == 0) {
                mono = tmp;
            } else {
                mono = Mono.zip(mono, tmp);
            }
        }
        mono.block();
    }

    @Override
    public GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        return getDetailContent(accessToken, githubId, "content/blog/" + directory +"/index.md");
    }

    @Override
    public List<ImageResponse> getImages(String encodedAccessToken, String githubId, String directory) throws Exception{
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        GetRepoContentResponse[] responses = getContentList(accessToken, githubId, "content/blog/" + directory);
        List<ImageResponse> images = new ArrayList<>();
        for(int i=0; i<responses.length; i++){
            if(!responses[i].getName().equals("index.md")){
                images.add(new ImageResponse(responses[i].getName(), responses[i].getUrl()));
            }
        }
        return images;
    }

    @Override
    public GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception {
        GetRepoContentResponse postResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse.class).block();
        String tmp = postResponse.getContent().replace("\n", "");
        postResponse.setContent(base64Converter.decode(tmp));
        return postResponse;
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

    public void push(String accessToken, String githubId, String commit) throws Exception {
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
        CreateCommitRequest createCommitRequest = new CreateCommitRequest(treeSha, commit, parents);
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
}
