package com.b208.prologue.api.service;

import java.util.List;

public interface SettingService {
    List<Object> getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
}
