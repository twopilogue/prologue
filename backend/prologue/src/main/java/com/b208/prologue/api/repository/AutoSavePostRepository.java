package com.b208.prologue.api.repository;

import com.b208.prologue.api.entity.AutoSavePost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;

@Repository
public interface AutoSavePostRepository extends JpaRepository<AutoSavePost, String> {
    AutoSavePost findByGithubId(final String githubId);
    boolean existsByGithubId(final String githubId);
    void deleteByGithubId(final String githubId);

    @Modifying
    @Query("delete from AutoSavePost a where a.updateTime < :target")
    void deleteByUpdateTimeBefore(final LocalDateTime target);
}
