package com.b208.prologue.api.service;

import java.util.List;
import java.util.Map;
import java.util.Set;

public interface DashBoardService {
    Map<String, List<String>> getList(String encodedAccessToken, String githubId) throws Exception;
    Double getRepositorySize(String encodedAccessToken, String githubId) throws Exception;
    Set<String> getDateList(String encodedAccessToken, String githubId) throws Exception;
    String getLatestBuildTime(String encodedAccessToken, String githubId) throws Exception;
}
