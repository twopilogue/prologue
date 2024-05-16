package com.b208.prologue.autoSavePost;

import com.b208.prologue.api.controller.AutoSavePostController;
import com.b208.prologue.api.request.AutoSavePostRequest;
import com.b208.prologue.api.service.AutoSavePostServiceImpl;
import com.google.gson.Gson;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AutoSavePostControllerTest {

    @InjectMocks
    private AutoSavePostController autoSavePostController;

    @Mock
    private AutoSavePostServiceImpl autoSavePostService;

    private static final String githubId = "test**";
    private static final String url = "/api/auto-posts";

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach
    void init() {
        gson = new Gson();
        mockMvc = MockMvcBuilders.standaloneSetup(autoSavePostController)
                .build();
    }

    @Nested
    class 게시글_자동저장 {
        final AutoSavePostRequest autoSavePostRequest = AutoSavePostRequest.builder()
                .githubId(githubId)
                .title("abc")
                .build();

        @Test
        void 실패_깃허브ID없음() throws Exception {
            //given
            final AutoSavePostRequest autoSavePostRequest = AutoSavePostRequest.builder()
                    .title("abc")
                    .build();

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(autoSavePostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new Exception()).when(autoSavePostService).autoSavePost(autoSavePostRequest);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(autoSavePostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(autoSavePostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

}
