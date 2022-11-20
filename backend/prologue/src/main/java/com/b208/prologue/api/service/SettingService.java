package com.b208.prologue.api.service;

import com.b208.prologue.api.request.ModifyBlogSettingRequest;
import com.b208.prologue.api.response.github.GetBlogLayoutCss;
import com.b208.prologue.api.response.GetBlogSettingResponse;
import org.json.simple.JSONObject;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface SettingService {
    GetBlogSettingResponse getBlogSetting(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogSetting(ModifyBlogSettingRequest modifyBlogSettingRequest, MultipartFile imageFile) throws Exception;
    String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception;
    JSONObject[] getBlogPages(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogPages(String encodedAccessToken, String githubId, List<Map<String,String>> pages) throws Exception;
    String getBlogLayout(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogLayout(String encodedAccessToken, String githubId, String layout, String layoutJson) throws Exception;
    GetBlogLayoutCss getBlogLayoutCss(String encodedAccessToken, String githubId) throws Exception;
    void updateBlogLayoutCss(String encodedAccessToken, String githubId, String css,
                             String logoText, boolean titleColor, String titleText,
                             MultipartFile logoImage, MultipartFile titleImage) throws Exception;
}
