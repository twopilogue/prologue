package com.b208.prologue.autoSavePost;

import com.b208.prologue.api.entity.AutoSavePost;
import com.b208.prologue.api.repository.AutoSavePostRepository;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class AutoSavePostRepositoryTest {

    @Autowired
    private AutoSavePostRepository autoSavePostRepository;

    private static final String githubId = "test**";

    @Nested
    class 자동저장게시글_생성 {

        @Test
        void 자동저장_처음생성() {
            //given
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());

            //when
            final AutoSavePost autoSavePost = autoSavePostRepository.findByGithubId(githubId);

            //then
            assertThat(autoSavePost).isNotNull();
            assertThat(autoSavePost.getTitle()).isEqualTo("abc");
        }

        @Test
        void 자동저장_덮어쓰기() {
            //given
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("123")
                    .githubId(githubId)
                    .build());

            //when
            final AutoSavePost autoSavePost = autoSavePostRepository.findByGithubId(githubId);

            //then
            assertThat(autoSavePost).isNotNull();
            assertThat(autoSavePost.getTitle()).isEqualTo("123");
        }
    }

    @Nested
    class 자동저장게시글_존재여부_확인 {

        @Test
        void 게시글없음() {
            //given

            //when
            final boolean exist = autoSavePostRepository.existsByGithubId(githubId);

            //then
            assertThat(exist).isFalse();
        }

        @Test
        void 게시글있음() {
            //given
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());

            //when
            final boolean exist = autoSavePostRepository.existsByGithubId(githubId);

            //then
            assertThat(exist).isTrue();
        }
    }


    @Test
    void 자동저장게시글_깃허브ID_기준_삭제() {
        //given
        autoSavePostRepository.save(AutoSavePost.builder()
                .title("abc")
                .githubId(githubId)
                .build());

        //when
        autoSavePostRepository.deleteByGithubId(githubId);
        final AutoSavePost autoSavePost = autoSavePostRepository.findByGithubId(githubId);

        //then
        assertThat(autoSavePost).isNull();
    }

    @Nested
    class 자동저장게시글_날짜_기준삭제 {
        @Test
        void 삭제할게시글없음() {
            //given
            final LocalDateTime today = LocalDate.now().atTime(0, 0);
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId("abc")
                    .build());

            //when
            autoSavePostRepository.deleteByUpdateTimeBefore(today);
            final List<AutoSavePost> list = autoSavePostRepository.findAll();

            //then
            assertThat(list).hasSize(2);
        }

        @Test
        void 삭제할게시글2개() {
            //given
            final LocalDateTime today = LocalDate.now().atTime(0, 0);
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build());
            autoSavePostRepository.save(AutoSavePost.builder()
                    .title("abc")
                    .githubId("abc")
                    .build());

            //when
            autoSavePostRepository.deleteByUpdateTimeBefore(today.plusDays(1));
            final List<AutoSavePost> list = autoSavePostRepository.findAll();

            //then
            assertThat(list).hasSize(0);
        }
    }
}
