package com.b208.prologue.api.service;

public interface BlogService {
    void createRepository(String accessToken, String githubId) throws Exception;
    void deleteRepository(String accessToken, String githubId) throws Exception;
    boolean checkUserRepository(String accessToken, String githubId) throws Exception;
    void selectTemplate(String accessToken,  String githubId, int templateNumber) throws Exception;
    void createWorkflow(String accessToken, String githubId) throws Exception;
}
