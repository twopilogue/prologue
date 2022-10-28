package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.GetRepoContentResponse;

import java.util.List;

public interface PostService {

    List<String> getList(String accessToken, String gitId, String repoName);
    GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception;
}
