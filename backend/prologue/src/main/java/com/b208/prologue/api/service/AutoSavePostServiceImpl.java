package com.b208.prologue.api.service;

import com.b208.prologue.api.entity.AutoSavePost;
import com.b208.prologue.api.exception.AutoSavePostException;
import com.b208.prologue.api.repository.AutoSavePostRepository;
import com.b208.prologue.api.request.AutoSavePostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AutoSavePostServiceImpl implements AutoSavePostService {

    private final AutoSavePostRepository autoSavePostRepository;

    @Override
    public void autoSavePost(final AutoSavePostRequest autoSavePostRequest) throws Exception {
        final AutoSavePost autoSavePost = AutoSavePost.builder()
                .githubId(autoSavePostRequest.getGithubId())
                .title(autoSavePostRequest.getTitle())
                .description(autoSavePostRequest.getDescription())
                .category(autoSavePostRequest.getCategory())
                .tags(autoSavePostRequest.getTags())
                .content(autoSavePostRequest.getContent())
                .build();
        autoSavePostRepository.save(autoSavePost);
    }

    @Override
    public boolean checkAutoSavePost(final String githubId) throws Exception {
        return autoSavePostRepository.existsByGithubId(githubId);
    }

    @Override
    public String getUpdatedTime(final String githubId) throws AutoSavePostException {
        final AutoSavePost autoSavePost = autoSavePostRepository.findByGithubId(githubId);
        if (autoSavePost == null) throw new AutoSavePostException();
        return String.valueOf(autoSavePost.getUpdateTime());
    }

    @Override
    public Map<String, Object> getAutoSavePost(final String githubId) throws AutoSavePostException {
        final AutoSavePost autoSavePost = autoSavePostRepository.findByGithubId(githubId);
        if (autoSavePost == null) throw new AutoSavePostException();

        Map<String, Object> result = new HashMap<>();
        result.put("title", autoSavePost.getTitle());
        result.put("description", autoSavePost.getDescription());
        result.put("category", autoSavePost.getCategory());
        result.put("tags", autoSavePost.getTags());
        result.put("content", autoSavePost.getContent());
        result.put("updatedAt", autoSavePost.getUpdateTime());
        return result;
    }

    @Override
    public void deleteAutoSavePost(final String githubId) throws Exception {
        autoSavePostRepository.deleteByGithubId(githubId);
    }

}

