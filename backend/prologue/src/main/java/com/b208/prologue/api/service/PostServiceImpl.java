package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.CreateContentRequest;
import com.b208.prologue.api.request.github.DeleteContentRequest;
import com.b208.prologue.api.request.github.UpdateContentRequest;
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

    @Override
    public Map<String, List<String>> getList(String accessToken, String gitId) {

        Map<String, List<String>> result = new HashMap<>();
        List<String> content = new ArrayList<>();
        List<String> directory = new ArrayList<>();

        String url = "/repos/" + gitId + "/" + gitId + ".github.io" + "/contents/";

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

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String directory = String.valueOf(timeStamp.getTime());

        CreateContentRequest createContentRequest = new CreateContentRequest(commit, base64Converter.encode(content));

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog/" + directory + "/index.md")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createContentRequest), CreateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();

        if (files != null && !files.isEmpty()) {
            Mono mono = null;
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                createContentRequest = new CreateContentRequest(commit, image);

                Mono<String> tmp = webClient.put()
                        .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog/" + directory + "/" + file.getOriginalFilename())
                        .headers(h -> h.setBearerAuth(accessToken))
                        .body(Mono.just(createContentRequest), CreateContentRequest.class)
                        .accept(MediaType.APPLICATION_JSON)
                        .retrieve()
                        .bodyToMono(String.class);
                if (mono == null) mono = tmp;
                else mono = Mono.zip(mono, tmp);
            }
            mono.block();
        }

    }

    @Override
    public void updateDetailPost(String encodedAccessToken, String githubId, String directory, String content, String sha) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 게시글 수정", base64Converter.encode(content), sha);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog/" + directory + "/index.md")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
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
        return getDetailContent(accessToken, githubId, "content/blog/" + directory + "/index.md");
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

}
