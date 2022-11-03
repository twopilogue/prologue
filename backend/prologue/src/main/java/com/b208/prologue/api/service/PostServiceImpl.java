package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.*;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.PostgetResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;

import java.io.UnsupportedEncodingException;
import java.util.*;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final CommonService commonService;


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

        List<TreeRequest> treeRequestList = new ArrayList<>();

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String directory = String.valueOf(timeStamp.getTime());
        String path = "content/blog/" + directory;

        String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", encodedContent));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename(), "100644", "blob", encodedContent));
            }
        }
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void updateDetailPost(String encodedAccessToken, String githubId, String directory, String content, List<MultipartFile> files, List<String> deletedFiles) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 게시글 수정";
        String path = "content/blog/" + directory;
        List<TreeRequest> treeRequestList = new ArrayList<>();

        content = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", content));

        if (deletedFiles != null && !deletedFiles.isEmpty()) {
            for (int i = 0; i < deletedFiles.size(); i++) {
                treeRequestList.add(new TreeRequest(path + "/" + deletedFiles.get(i), "100644", "blob", null));
            }
        }

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                String encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename(), "100644", "blob", encodedContent));
            }
        }
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void deleteDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception{
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "remove: 게시글 삭제";
        String path = "content/blog/" + directory;

        GetRepoContentResponse[] responses = getContentList(accessToken, githubId, path);

        List<TreeRequest> treeRequestList = new ArrayList<>();

        for (int i = 0; i < responses.length; i++) {
            treeRequestList.add(new TreeRequest(path+"/"+responses[i].getName(), "100644", "blob", null));
        }

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        return getDetailContent(accessToken, githubId, "content/blog/" + directory + "/index.md");
    }

    @Override
    public List<ImageResponse> getImages(String encodedAccessToken, String githubId, String directory) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        GetRepoContentResponse[] responses = getContentList(accessToken, githubId, "content/blog/" + directory);
        List<ImageResponse> images = new ArrayList<>();
        for (int i = 0; i < responses.length; i++) {
            if (!responses[i].getName().equals("index.md")) {
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

}
