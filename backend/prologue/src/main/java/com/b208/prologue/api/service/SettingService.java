package com.b208.prologue.api.service;

import java.util.List;
import java.util.Map;

public interface SettingService {
    Object getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception;
    String[] getBlogPages(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogPages(String encodedAccessToken, String githubId, List<String> pages,
                         List<Map<String,String>> modifiedPages, List<String> addedPages, List<String> deletedPages) throws Exception;
}
