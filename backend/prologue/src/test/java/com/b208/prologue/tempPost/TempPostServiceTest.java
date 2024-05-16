package com.b208.prologue.tempPost;

import com.b208.prologue.api.entity.TempPost;
import com.b208.prologue.api.exception.TempPostException;
import com.b208.prologue.api.repository.TempPostRepository;
import com.b208.prologue.api.request.ModifyTempPostRequest;
import com.b208.prologue.api.request.SaveTempPostRequest;
import com.b208.prologue.api.response.TempPostsResponse;
import com.b208.prologue.api.service.TempPostServiceImpl;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class TempPostServiceTest {

    @InjectMocks
    private TempPostServiceImpl tempPostService;

    @Mock
    private TempPostRepository tempPostRepository;

    private static final String githubId = "test**";
    private static final Long tempPostId = 0L;

    @Test
    void 게시글_임시저장() throws Exception {
        //given
        final SaveTempPostRequest saveTempPostRequest = SaveTempPostRequest.builder()
                .githubId(githubId)
                .title("abc")
                .build();
        final TempPost tempPost = TempPost.builder()
                .tempPostId(0L)
                .title(saveTempPostRequest.getTitle())
                .githubId(saveTempPostRequest.getGithubId())
                .build();
        doReturn(tempPost).when(tempPostRepository).save(any(TempPost.class));

        //when
        final Long tempPostId = tempPostService.saveTempPost(saveTempPostRequest);

        //then
        assertThat(tempPostId).isNotNull().isEqualTo(tempPost.getTempPostId());
    }

    @Nested
    class 임시저장게시글_조회 {
        @Test
        void 임시저장게시글없음() throws Exception {
            //given

            //when
            assertThrows(TempPostException.class, () -> tempPostService.getTempPost(githubId, tempPostId));

            //then

            //verify
            verify(tempPostRepository, times(1)).findByTempPostIdAndGithubId(any(Long.class), any(String.class));
        }

        @Test
        void 임시저장게시글있음() throws Exception {
            //given
            final TempPost tempPost = TempPost.builder()
                    .title("abc")
                    .githubId(githubId)
                    .build();
            doReturn(tempPost).when(tempPostRepository).findByTempPostIdAndGithubId(any(), any());

            //when
            final Map<String, Object> result = tempPostService.getTempPost(githubId, tempPostId);

            //then
            assertThat(result).isNotNull();
            assertThat(result.get("title")).isEqualTo(tempPost.getTitle());
        }
    }

    @Nested
    class 임시저장게시글_수정 {
        final ModifyTempPostRequest modifyTempPostRequest = ModifyTempPostRequest.builder()
                .githubId(githubId)
                .tempPostId(0L)
                .title("abc")
                .build();
        final TempPost tempPost = TempPost.builder()
                .tempPostId(modifyTempPostRequest.getTempPostId())
                .githubId(modifyTempPostRequest.getGithubId())
                .title(modifyTempPostRequest.getTitle())
                .build();

        @Test
        void 임시저장게시글없음() throws Exception {
            //given

            //when
            assertThrows(TempPostException.class, () -> tempPostService.modifyTempPost(modifyTempPostRequest));

            //then

            //verify
            verify(tempPostRepository, times(1)).findByTempPostIdAndGithubId(any(Long.class), any(String.class));
        }

        @Test
        void 임시저장게시글있음() throws Exception {
            //given
            doReturn(tempPost).when(tempPostRepository).findByTempPostIdAndGithubId(any(), any());

            //when
            tempPostService.modifyTempPost(modifyTempPostRequest);

            //then

            //verify
            verify(tempPostRepository, times(1)).findByTempPostIdAndGithubId(any(Long.class), any(String.class));
            verify(tempPostRepository, times(1)).save(any(TempPost.class));
        }
    }

    @Test
    void 임시저장게시글_삭제() throws Exception {
        //given

        //when
        tempPostService.deleteTempPost(githubId, tempPostId);

        //then

        //verify
        verify(tempPostRepository, times(1)).deleteByTempPostIdAndGithubId(any(Long.class), any(String.class));
    }

    @Test
    void 임시저장게시글_수_조회() throws Exception {
        //given
        doReturn(3).when(tempPostRepository).countByGithubId(any(String.class));

        //when
        int count = tempPostService.countTempPosts(githubId);

        //then
        assertThat(count).isEqualTo(3);
    }

    @Test
    void 임시저장게시글_목록_조회() throws Exception {
        //given
        final List<TempPost> tempPostList = new ArrayList<>();
        tempPostList.add(TempPost.builder()
                .title("abc")
                .githubId(githubId)
                .build());
        tempPostList.add(TempPost.builder()
                .title("123")
                .githubId(githubId)
                .build());
        doReturn(tempPostList).when(tempPostRepository).findAllByGithubId(any(String.class));

        //when
        List<TempPostsResponse> list = tempPostService.getTempPosts(githubId);

        //then
        assertThat(list).hasSize(2);
    }
}
