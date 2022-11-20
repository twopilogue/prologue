package com.b208.prologue.api.service;

import com.b208.prologue.api.request.PostRequest;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Map;

public interface PostService {
    Map<String, Object> getList(String encodedAccessToken, String githubId, int index, String category) throws Exception;
    Map<String, Object> getListAll(String accessToken, String githubId, PostGetListResponse[] list, int index) throws Exception;
    Map<String, Object> getListSpecific(String accessToken, String githubId, PostGetListResponse[] list, int index, String category) throws Exception;
    PostRequest getPostFrontMatter(String accessToken, String githubId, PostGetListResponse item, String post) throws Exception ;
    void insertDetailPost(String encodedAccessToken, String githubId, int blogType, String content, List<ImageResponse> images, List<MultipartFile> files) throws Exception;
    void updateDetailPost(String encodedAccessToken, String githubId, int blogType, String path, String content, List<MultipartFile> files, List<ImageResponse> images) throws Exception;
    void updateDetailPage(String encodedAccessToken, String githubId, String path, String content, List<MultipartFile> files, List<ImageResponse> images) throws Exception;
    void deleteDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception;
    String getDetailPost(String encodedAccessToken, String githubId, String path, List<ImageResponse> images) throws Exception;
    String getDetailPage(String encodedAccessToken, String githubId, String path, List<ImageResponse> images) throws Exception;
    List<ImageResponse> getImages(String encodedAccessToken, String githubId, String path) throws Exception;
    String tempImageUpload(String encodedAccessToken, String githubId, MultipartFile file) throws Exception;
    String replaceImageUrlWithPath(String content, List<ImageResponse> images);
    String replaceImagePathWithUrl(String content, List<ImageResponse> images);
}
