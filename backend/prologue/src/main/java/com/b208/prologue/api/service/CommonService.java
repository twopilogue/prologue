package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.GetRepoContentResponse;

import java.util.List;

public interface CommonService {
    void multiFileCommit(String accessToken, String githubId, List treeRequestList, String commitMsg);
    String makeBlob(String accessToken, String githubId, String content);
    GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception;
    GetRepoContentResponse[] getContentList(String accessToken, String githubId, String path) throws Exception;
}
