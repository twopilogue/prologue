package com.b208.prologue.api.service;

import com.b208.prologue.api.request.ModifyTempPostRequest;
import com.b208.prologue.api.request.SaveTempPostRequest;

import java.util.Map;

public interface TempPostService {
    Map<String, Object> getTempPost(final String githubId, final Long tempPostId) throws Exception;
    Long saveTempPost(final SaveTempPostRequest saveTempPostRequest) throws Exception;
    void modifyTempPost(final ModifyTempPostRequest modifyTempPostRequest) throws Exception;
    void deleteTempPost(final String githubId, final Long tempPostId) throws Exception;
    int countTempPosts(final String githubId) throws Exception;
}
