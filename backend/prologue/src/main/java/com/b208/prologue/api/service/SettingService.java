package com.b208.prologue.api.service;

import java.util.List;

public interface SettingService {
    Object getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception;
    String[] getBlogPages(String encodedAccessToken, String githubId) throws Exception;
}
