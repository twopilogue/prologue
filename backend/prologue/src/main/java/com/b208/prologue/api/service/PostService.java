package com.b208.prologue.api.service;

import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface PostService {
    Map<String,List<String>> getList(String encodedAccessToken, String githubId) throws Exception;
    void insertDetailPost(String encodedAccessToken, String githubId, String content, List<MultipartFile> files) throws Exception;
    void updateDetailPost(String encodedAccessToken, String githubId, String directory, String content, List<MultipartFile> files, List<String> deletedFiles) throws Exception;
    void deleteDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    List<ImageResponse> getImages(String encodedAccessToken, String githubId, String directory) throws Exception;
    GetRepoContentResponse getDetailContent(String accessToken, String githubId, String path) throws Exception;
    GetRepoContentResponse[] getContentList(String accessToken, String githubId, String path) throws Exception;
}
