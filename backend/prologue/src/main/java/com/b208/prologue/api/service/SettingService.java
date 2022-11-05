package com.b208.prologue.api.service;

import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface SettingService {
    List<String> getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogSetting(String encodedAccessToken, String githubId, String ninkName, String summary, List<String> techStack, String blogName, String description, List<String> social, MultipartFile imageFile) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception;
    String[] getBlogPages(String encodedAccessToken, String githubId) throws Exception;
}
