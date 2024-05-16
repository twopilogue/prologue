package com.b208.prologue.api.repository;

import com.b208.prologue.api.entity.AutoSavePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AutoSavePostRepository extends JpaRepository<AutoSavePost, String> {
    AutoSavePost findByGithubId(final String githubId);
    boolean existsByGithubId(final String githubId);
    void deleteByGithubId(final String githubId);
}
