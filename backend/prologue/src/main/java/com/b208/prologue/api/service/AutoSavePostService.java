package com.b208.prologue.api.service;

import com.b208.prologue.api.exception.AutoSavePostException;
import com.b208.prologue.api.request.AutoSavePostRequest;

import java.util.Map;

public interface AutoSavePostService {
    void autoSavePost(final AutoSavePostRequest autoSavePostRequest) throws Exception;
    boolean checkAutoSavePost(final String githubId) throws Exception;
    String getUpdatedTime(final String githubId) throws AutoSavePostException;
    Map<String, Object> getAutoSavePost(final String githubId) throws AutoSavePostException;
    void deleteAutoSavePost(final String githubId) throws Exception;
}
