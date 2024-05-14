package com.b208.prologue.tempPost;

import com.b208.prologue.api.controller.TempPostController;
import com.b208.prologue.api.service.TempPostServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.util.HashMap;

import static org.mockito.Mockito.doReturn;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TempPostControllerTest {

    @InjectMocks
    private TempPostController tempPostController;

    @Mock
    private TempPostServiceImpl tempPostService;

    private static final String githubId = "test**";
    private static final Long tempPostId = 0L;

    private MockMvc mockMvc;

    @BeforeEach
    void init() {
        mockMvc = MockMvcBuilders.standaloneSetup(tempPostController)
                .build();
    }

    @Nested
    class 임시저장게시글_조회 {
        final String url = "/api/temp-posts";

        @Test
        void 임시저장게시글없음() throws Exception {
            //given
            doReturn(null).when(tempPostService).getTempPost(githubId, tempPostId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url)
                            .param("githubId", githubId)
                            .param("tempPostId", String.valueOf(tempPostId))
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 임시저장게시글있음() throws Exception {
            //given
            doReturn(new HashMap<>()).when(tempPostService).getTempPost(githubId, tempPostId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url)
                            .param("githubId", githubId)
                            .param("tempPostId", String.valueOf(tempPostId))
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

}
