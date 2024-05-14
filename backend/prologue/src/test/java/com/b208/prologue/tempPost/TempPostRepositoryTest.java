package com.b208.prologue.tempPost;

import com.b208.prologue.api.entity.TempPost;
import com.b208.prologue.api.repository.TempPostRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class TempPostRepositoryTest {

    @Autowired
    private TempPostRepository tempPostRepository;

    private static final String githubId = "test**";

    @Nested
    class 임시저장게시글_조회 {
        @Test
        void 임시저장게시글없음() {
            //given

            //when
            final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(0L, githubId);

            //then
            assertThat(tempPost).isNull();
        }

        @Test
        void 임시저장게시글있음() {
            //given
            final TempPost saveTempPost = tempPostRepository.save(TempPost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());

            //when
            final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(saveTempPost.getTempPostId(), githubId);

            //then
            assertThat(tempPost).isNotNull();
            assertThat(tempPost.getTitle()).isEqualTo(saveTempPost.getTitle());
            assertThat(tempPost.getCreateTime()).isEqualTo(tempPost.getUpdateTime());
        }
    }

    @Test
    void 임시저장게시글_삭제() {
        //given
        final TempPost saveTempPost = tempPostRepository.save(TempPost.builder()
                .title("abc")
                .githubId(githubId)
                .build());

        //when
        tempPostRepository.deleteByTempPostIdAndGithubId(saveTempPost.getTempPostId(), githubId);
        final TempPost tempPost = tempPostRepository.findByTempPostIdAndGithubId(saveTempPost.getTempPostId(), githubId);

        //then
        assertThat(tempPost).isNull();
    }

    @Nested
    class 임시저장게시글_수_조회 {
        @Test
        void 임시저장게시글없음() {
            //given

            //when
            final int count = tempPostRepository.countByGithubId(githubId);

            //then
            assertThat(count).isZero();
        }

        @Test
        void 임시저장게시글있음_2개() {
            //given
            tempPostRepository.save(TempPost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());
            tempPostRepository.save(TempPost.builder()
                    .title("123")
                    .githubId(githubId)
                    .build());

            //when
            final int count = tempPostRepository.countByGithubId(githubId);

            //then
            assertThat(count).isEqualTo(2);
        }
    }

}
