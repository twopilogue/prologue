package com.b208.prologue.api.repository;

import com.b208.prologue.api.entity.TempPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TempPostRepository extends JpaRepository<TempPost, Long> {
    TempPost findByTempPostIdAndGithubId(final Long tempPostId, final String githubId);
}
