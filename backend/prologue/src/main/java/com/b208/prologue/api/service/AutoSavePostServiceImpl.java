package com.b208.prologue.api.service;

import com.b208.prologue.api.entity.AutoSavePost;
import com.b208.prologue.api.repository.AutoSavePostRepository;
import com.b208.prologue.api.request.AutoSavePostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
}

