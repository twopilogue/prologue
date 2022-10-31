package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.GetRepoContentResponse;

import java.util.List;
import java.util.Map;

public interface PostService {
    Map<String,List<String>> getList(String accessToken, String gitId);
    void insertDetailPost(String encodedAccessToken, String githubId, String content) throws Exception;
    void updateDetailPost(String encodedAccessToken, String githubId, String directory, String content,String sha) throws Exception;
    GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception;
}
