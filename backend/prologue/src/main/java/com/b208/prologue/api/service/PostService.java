package com.b208.prologue.api.service;

import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface PostService {
    Map<String, Object> getList(String encodedAccessToken, String githubId, int page) throws Exception;
    void insertDetailPost(String encodedAccessToken, String githubId, String content, List<MultipartFile> files) throws Exception;
    void updateDetailPost(String encodedAccessToken, String githubId, String path, String content, List<MultipartFile> files, List<String> deletedFiles) throws Exception;
    void deleteDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    GetRepoContentResponse getDetailPost(String encodedAccessToken, String githubId, String path) throws Exception;
    List<ImageResponse> getImages(String encodedAccessToken, String githubId, String path) throws Exception;
}
