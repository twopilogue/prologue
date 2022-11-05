package com.b208.prologue.api.service;

public interface SettingService {
    Object getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
}
