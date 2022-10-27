package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements  PostService{

    private final Base64Converter base64Converter;
    private final RestTemplate restTemplate;

    static List<String> result;

    @Override
    public List<String> getList(String accessToken, String gitId, String repoName) {

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(accessToken);
        HttpEntity<Void> request = new HttpEntity<>(headers);

        PostGetListResponse[] list = restTemplate.exchange("https://api.github.com/repos/" + gitId + "/" + repoName + "/contents/post",
                HttpMethod.GET,
                request,
                PostGetListResponse[].class
                ).getBody();
        System.out.println(list[0].toString());

        return result;
    }

//    @Override
//    public List<String> getList(String accessToken, String gitId, String repoName) {
//
//        HttpHeaders headers = new HttpHeaders();
//        headers.setBearerAuth(accessToken);
//        HttpEntity<Void> request = new HttpEntity<>(headers);
//
//        PostGetListResponse list = restTemplate.exchange("https://api.github.com/repos/" + gitId + "/" + repoName + "/contents/post",
//                HttpMethod.GET,
//                request,
//                PostGetListResponse.class
//        ).getBody();
//        System.out.println("hello");
//        System.out.println(list.getResult());
//
//        return result;
//    }

//    public String setItem() {
//
//    }
}
