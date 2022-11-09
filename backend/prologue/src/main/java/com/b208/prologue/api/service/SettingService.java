package com.b208.prologue.api.service;

import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface SettingService {
    List<String> getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogSetting(String encodedAccessToken, String githubId, String modified, MultipartFile imageFile) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception;
    JSONObject[] getBlogPages(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogPages(String encodedAccessToken, String githubId, List<Map<String,String>> pages) throws Exception;
    String getBlogLayout(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogLayout(String encodedAccessToken, String githubId, String layout) throws Exception;
}
