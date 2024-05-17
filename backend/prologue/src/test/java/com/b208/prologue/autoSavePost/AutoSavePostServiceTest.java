package com.b208.prologue.autoSavePost;

import com.b208.prologue.api.entity.AutoSavePost;
import com.b208.prologue.api.exception.AutoSavePostException;
import com.b208.prologue.api.repository.AutoSavePostRepository;
import com.b208.prologue.api.request.AutoSavePostRequest;
import com.b208.prologue.api.service.AutoSavePostServiceImpl;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class AutoSavePostServiceTest {

    @InjectMocks
    private AutoSavePostServiceImpl autoSavePostService;

    @Mock
    private AutoSavePostRepository autoSavePostRepository;

    private static final String githubId = "test**";

    @Test
    void 게시글_자동저장() throws Exception {
        //given
        final AutoSavePostRequest autoSavePostRequest = AutoSavePostRequest.builder()
                .githubId(githubId)
                .title("abc")
                .build();

        //when
        autoSavePostService.autoSavePost(autoSavePostRequest);

        //then

        //verify
        verify(autoSavePostRepository, times(1)).save(any(AutoSavePost.class));
    }

    @Test
    void 자동저장게시글_존재여부_확인() throws Exception {
        //given
        doReturn(true).when(autoSavePostRepository).existsByGithubId(githubId);

        //when
        final boolean exist = autoSavePostService.checkAutoSavePost(githubId);

        //then
        assertThat(exist).isTrue();

        //verify
        verify(autoSavePostRepository, times(1)).existsByGithubId(any(String.class));
    }

    @Nested
    class 자동저장게시글_조회 {
        @Test
        void 자동저장게시글_존재안함() throws Exception {
            //given
            doReturn(null).when(autoSavePostRepository).findByGithubId(githubId);

            //when
            assertThrows(AutoSavePostException.class, () -> autoSavePostService.getAutoSavePost(githubId));

            //then

            //verify
            verify(autoSavePostRepository, times(1)).findByGithubId(any(String.class));
        }

        @Test
        void 자동저장게시글_존재함() throws Exception {
            //given
            final AutoSavePost autoSavePost = AutoSavePost.builder()
                    .githubId(githubId)
                    .title("abc")
                    .updateTime(LocalDateTime.now())
                    .build();
            doReturn(autoSavePost).when(autoSavePostRepository).findByGithubId(githubId);

            //when
            final Map<String, Object> result = autoSavePostService.getAutoSavePost(githubId);

            //then
            assertThat(result).isNotNull();
            assertThat((String) result.get("title")).isEqualTo("abc");
        }
    }

    @Nested
    class 자동저장게시글_시간조회 {
        @Test
        void 자동저장게시글_존재안함() throws Exception {
            //given
            doReturn(null).when(autoSavePostRepository).findByGithubId(githubId);

            //when
            assertThrows(AutoSavePostException.class, () -> autoSavePostService.getUpdatedTime(githubId));

            //then

            //verify
            verify(autoSavePostRepository, times(1)).findByGithubId(any(String.class));
        }

        @Test
        void 자동저장게시글_존재함() throws Exception {
            //given
            final AutoSavePost autoSavePost = AutoSavePost.builder()
                    .githubId(githubId)
                    .title("abc")
                    .updateTime(LocalDateTime.now())
                    .build();
            doReturn(autoSavePost).when(autoSavePostRepository).findByGithubId(githubId);

            //when
            final String updatedAt = autoSavePostService.getUpdatedTime(githubId);

            //then
            assertThat(updatedAt).isNotNull();
        }
    }

    @Test
    void 자동저장게시글_깃허브ID_기준_삭제() throws Exception {
        //given

        //when
        autoSavePostService.deleteAutoSavePost(githubId);

        //then

        //verify
        verify(autoSavePostRepository, times(1)).deleteByGithubId(any(String.class));
    }

    @Test
    void 자동저장게시글_날짜_기준_삭제() throws Exception {
        //given

        //when
        autoSavePostService.deleteInvalidDateAutoSavePost();

        //then

        //verify
        verify(autoSavePostRepository, times(1)).deleteByUpdateTimeBefore(any(LocalDateTime.class));
    }

}
