package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final PostServiceImpl postService;

    @Override
    public Map<String, List<String>> getList(String accessToken, String gitId) {

        Map<String, List<String>> result = new HashMap<>();
        List<String> content = new ArrayList<>();
        List<String> directory = new ArrayList<>();
        List<String> count = new ArrayList<>();

        String url = "/repos/" + gitId + "/" + gitId + ".github.io" + "/contents/";

        PostGetListResponse[] list =  webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = list.length-1; i > list.length-6; i--){
            if(i < 0) break;
            content.add(postService.setItem(url, accessToken, list[i].getPath()));
            directory.add(list[i].getName());
        }

        String cnt = list.length + "";
        count.add(cnt);
        result.put("content", content);
        result.put("directory", directory);
        result.put("postCount", count);
        return result;
    }

}
