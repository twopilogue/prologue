package com.b208.prologue.api.service;

public interface BlogService {
    void createRepository(String encodedAccessToken, String githubId) throws Exception;
    void deleteRepository(String encodedAccessToken, String githubId) throws Exception;
    boolean checkUserRepository(String encodedAccessToken, String githubId) throws Exception;
    void selectTemplate(String encodedAccessToken,  String githubId, String template) throws Exception;
    void createWorkflow(String encodedAccessToken, String githubId) throws Exception;
    void updateDeployBranch(String encodedAccessToken, String githubId) throws Exception;
}
