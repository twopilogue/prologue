package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.*;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final PostServiceImpl postService;
    private final CommonService commonService;

    @Override
    public Map<String, Object> getList(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Map<String, Object> result = new HashMap<>();
        List<String> content = new ArrayList<>();
        List<String> directory = new ArrayList<>();

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = list.length - 1; i > list.length - 6; i--) {
            if (i < 0) break;
            content.add(postService.setItem(url, accessToken, list[i].getPath()));
            directory.add(list[i].getName());
        }

        int cnt = list.length;
        result.put("content", content);
        result.put("directory", directory);
        result.put("postCount", cnt);
        return result;
    }

    @Override
    public List<Map<String, String>> getListImagese(String encodedAccessToken, String githubId, List<String> directories) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        List<Map<String, String>> result = new ArrayList<>();
        Map<String, String> image;

        for (String directory : directories) {
            GetRepoContentResponse[] responses = commonService.getContentList(accessToken, githubId, "content/blog/" + directory);
            image = new HashMap<>();
            int flag = 0;

            for (int i = responses.length - 1; i > responses.length - 6; i--) {
                if (i < 0) break;

                if (!responses[flag].getName().equals("index.md")) {
                    image.put(directory, responses[flag].getUrl());
                    break;
                } else {
                    flag++;
                    continue;
                }
            }

            result.add(image);
        }

        return result;
    }

    @Override
    public Double getRepositorySize(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepositorySizeResponse getRepositorySizeResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetRepositorySizeResponse.class).block();

        return getRepositorySizeResponse.getSize() / 1000.0;
    }

    @Override
    public Set<String> getDateList(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Set<String> result = new LinkedHashSet<>();
        GetFileNameResponse[] getFileNameResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetFileNameResponse[].class).block();

        for (int i = 0; i < getFileNameResponse.length; i++){
            Date date = new Date(Long.parseLong(getFileNameResponse[i].getName()));
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");

            result.add(String.valueOf(dateFormat.format(date)));
        }

        return result;
    }

    public String getLatestBuildTime(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetLatestBuildTimeResponse getLatestBuildTimeResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/pages/builds/latest")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetLatestBuildTimeResponse.class).block();

        SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        return dataFormat.format(getLatestBuildTimeResponse.getLastBuildTime());
    }
}
