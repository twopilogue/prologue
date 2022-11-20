package com.b208.prologue.api.service;

import com.b208.prologue.api.request.DashBoardPostRequest;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface DashBoardService {
    List<DashBoardPostRequest> getList(String encodedAccessToken, String githubId) throws Exception;
    Double getRepositorySize(String encodedAccessToken, String githubId, String template) throws Exception;
    Set<String> getDateList(String encodedAccessToken, String githubId) throws Exception;
    String getLatestBuildTime(String encodedAccessToken, String githubId) throws Exception;
    Integer getTotalCount(String encodedAccessToken, String githubId) throws Exception;
    String getBuildState(String encodedAccessToken, String githubId) throws Exception;
    boolean checkUpdate(String encodedAccessToken, String githubId) throws Exception;
}
