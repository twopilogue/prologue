package com.b208.prologue.api.service;

import java.util.List;
import java.util.Map;

public interface DashBoardService {
    Map<String, List<String>> getList(String encodedAccessToken, String githubId) throws Exception;
    Double getRepositorySize(String encodedAccessToken, String githubId) throws Exception;
}
