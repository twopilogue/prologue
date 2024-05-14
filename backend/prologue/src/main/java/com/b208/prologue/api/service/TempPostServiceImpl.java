package com.b208.prologue.api.service;

import com.b208.prologue.api.entity.TempPost;
import com.b208.prologue.api.exception.TempPostException;
import com.b208.prologue.api.repository.TempPostRepository;
import com.b208.prologue.api.request.ModifyTempPostRequest;
import com.b208.prologue.api.request.SaveTempPostRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class TempPostServiceImpl implements TempPostService {

    private final TempPostRepository tempPostRepository;

    @Override
    public Map<String, Object> getTempPost(final String githubId, final Long tempPostId) throws TempPostException {
        final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(tempPostId, githubId);

        if (tempPost == null) throw new TempPostException();

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
    public Long saveTempPost(final SaveTempPostRequest saveTempPostRequest) throws Exception {
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

    @Override
    @Transactional
    public void modifyTempPost(final ModifyTempPostRequest modifyTempPostRequest) throws TempPostException {
        final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(modifyTempPostRequest.getTempPostId(), modifyTempPostRequest.getGithubId());

        if (tempPost == null) throw new TempPostException();

        final TempPost modifyTempPost = TempPost.builder()
                .tempPostId(modifyTempPostRequest.getTempPostId())
                .githubId(modifyTempPostRequest.getGithubId())
                .title(modifyTempPostRequest.getTitle())
                .description(modifyTempPostRequest.getDescription())
                .category(modifyTempPostRequest.getCategory())
                .tags(modifyTempPostRequest.getTags())
                .content(modifyTempPostRequest.getContent())
                .build();

        tempPostRepository.save(modifyTempPost);
    }

    @Override
    @Transactional
    public void deleteTempPost(final String githubId, final Long tempPostId) throws Exception {
        tempPostRepository.deleteByTempPostIdAndGithubId(tempPostId, githubId);
    }

    @Override
    public int countTempPosts(final String githubId) throws Exception {
        return tempPostRepository.countByGithubId(githubId);
    }
}

