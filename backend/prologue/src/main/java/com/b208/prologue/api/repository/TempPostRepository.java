package com.b208.prologue.api.repository;

import com.b208.prologue.api.entity.TempPost;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TempPostRepository extends JpaRepository<TempPost, Long> {
    TempPost findByTempPostIdAndGithubId(final Long tempPostId, final String githubId);
    void deleteByTempPostIdAndGithubId(final Long tempPostId, final String githubId);
    int countByGithubId(final String githubId);
    List<TempPost> findAllByGithubId(final String githubId);

    @Modifying
    @Query("delete from TempPost t where t.updateTime < :target")
    void deleteByUpdateTimeBefore(final LocalDateTime target);
}
