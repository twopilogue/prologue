package com.b208.prologue.api.service;

import java.util.Date;
import java.util.List;
import java.util.Map;

public interface DashBoardService {
    Map<String, Object> getList(String encodedAccessToken, String githubId) throws Exception;
    List<Map<String, String>> getListImagese(String encodedAccessToken, String githubId, List<String> directories) throws  Exception;
    Double getRepositorySize(String encodedAccessToken, String githubId) throws Exception;
    String getLatestBuildTime(String encodedAccessToken, String githubId) throws Exception;
}
