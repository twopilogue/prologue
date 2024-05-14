package com.b208.prologue.api.service;

import com.b208.prologue.api.entity.TempPost;
import com.b208.prologue.api.repository.TempPostRepository;
import com.b208.prologue.api.request.SaveTempPostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TempPostServiceImpl implements TempPostService {

    private final TempPostRepository tempPostRepository;

    @Override
    public Map<String, Object> getTempPost(final String githubId, final Long tempPostId) throws Exception{
        final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(tempPostId, githubId);

        if (tempPost == null) return null;

        Map<String, Object> result = new HashMap<>();
        result.put("tempPostId", tempPost.getTempPostId());
        result.put("title", tempPost.getTitle());
        result.put("description", tempPost.getDescription());
        result.put("category", tempPost.getCategory());
        result.put("tags", tempPost.getTags());
        result.put("content", tempPost.getContent());
        result.put("createdAt", tempPost.getCreateTime());
        result.put("updatedAt", tempPost.getUpdateTime());
        return result;
    }

    @Override
    public Long saveTempPost(final SaveTempPostRequest saveTempPostRequest) throws Exception{
        final TempPost tempPost = TempPost.builder()
                .githubId(saveTempPostRequest.getGithubId())
                .title(saveTempPostRequest.getTitle())
                .description(saveTempPostRequest.getDescription())
                .category(saveTempPostRequest.getCategory())
                .tags(saveTempPostRequest.getTags())
                .content(saveTempPostRequest.getContent())
                .build();

        return tempPostRepository.save(tempPost).getTempPostId();
    }
}

