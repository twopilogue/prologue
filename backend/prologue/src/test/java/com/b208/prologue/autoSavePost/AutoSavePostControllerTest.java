package com.b208.prologue.autoSavePost;

import com.b208.prologue.api.controller.AutoSavePostController;
import com.b208.prologue.api.exception.AutoSavePostException;
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

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class AutoSavePostControllerTest {

    @InjectMocks
    private AutoSavePostController autoSavePostController;

    @Mock
    private AutoSavePostServiceImpl autoSavePostService;

    private static final String githubId = "test**";
    private static final String url = "/api/auto-post";

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

    @Nested
    class 자동저장게시글_조회 {

        @Test
        void 실패_깃허브ID없음() throws Exception {
            //given

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new AutoSavePostException()).when(autoSavePostService).getAutoSavePost(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url)
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given
            final Map<String, Object> result = new HashMap<>();
            result.put("title", "제목");
            result.put("description", "설명");
            result.put("category", "카테고리");
            result.put("tags", null);
            result.put("content", "내용");
            result.put("updatedAt", LocalDateTime.now());
            doReturn(result).when(autoSavePostService).getAutoSavePost(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url)
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

    @Nested
    class 자동저장게시글_존재여부_확인 {

        @Test
        void 실패_깃허브ID없음() throws Exception {
            //given

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url + "/exist")
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new Exception()).when(autoSavePostService).checkAutoSavePost(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url + "/exist")
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given
            doReturn(true).when(autoSavePostService).checkAutoSavePost(githubId);
            doReturn(String.valueOf(LocalDateTime.now())).when(autoSavePostService).getUpdatedTime(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url + "/exist")
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

}
