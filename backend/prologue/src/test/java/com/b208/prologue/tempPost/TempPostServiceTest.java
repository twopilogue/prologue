package com.b208.prologue.tempPost;

import com.b208.prologue.api.entity.TempPost;
import com.b208.prologue.api.repository.TempPostRepository;
import com.b208.prologue.api.request.SaveTempPostRequest;
import com.b208.prologue.api.service.TempPostServiceImpl;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Map;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.any;
import static org.mockito.Mockito.doReturn;

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
            final Map<String, Object> result = tempPostService.getTempPost(githubId, tempPostId);

            //then
            assertThat(result).isNull();
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

}
