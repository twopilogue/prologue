package com.b208.prologue.tempPost;

import com.b208.prologue.api.controller.TempPostController;
import com.b208.prologue.api.exception.TempPostException;
import com.b208.prologue.api.request.ModifyTempPostRequest;
import com.b208.prologue.api.request.SaveTempPostRequest;
import com.b208.prologue.api.service.TempPostServiceImpl;
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

import java.util.HashMap;

import static org.mockito.Mockito.doReturn;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
class TempPostControllerTest {

    @InjectMocks
    private TempPostController tempPostController;

    @Mock
    private TempPostServiceImpl tempPostService;

    private static final String githubId = "test**";
    private static final Long tempPostId = 0L;
    private static final String url = "/api/temp-posts";

    private MockMvc mockMvc;
    private Gson gson;

    @BeforeEach
    void init() {
        gson = new Gson();
        mockMvc = MockMvcBuilders.standaloneSetup(tempPostController)
                .build();
    }

    @Nested
    class 게시글_임시저장 {
        final SaveTempPostRequest saveTempPostRequest = SaveTempPostRequest.builder()
                .githubId(githubId)
                .title("abc")
                .build();

        @Test
        void 실패_깃허브ID없음() throws Exception {
            //given
            final SaveTempPostRequest saveTempPostRequest = SaveTempPostRequest.builder()
                    .title("abc")
                    .build();

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(saveTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new Exception()).when(tempPostService).saveTempPost(saveTempPostRequest);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(saveTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given
            doReturn(0L).when(tempPostService).saveTempPost(saveTempPostRequest);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.post(url)
                            .content(gson.toJson(saveTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

    @Nested
    class 임시저장게시글_조회 {

        @Test
        void 임시저장게시글없음() throws Exception {
            //given
            doThrow(new TempPostException()).when(tempPostService).getTempPost(githubId, tempPostId);

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

    @Nested
    class 임시저장게시글_수정 {
        final ModifyTempPostRequest modifyTempPostRequest = ModifyTempPostRequest.builder()
                .githubId(githubId)
                .tempPostId(0L)
                .title("abc")
                .build();

        @Test
        void 실패_깃허브ID없음() throws Exception {
            //given
            final ModifyTempPostRequest modifyTempPostRequest = ModifyTempPostRequest.builder()
                    .tempPostId(0L)
                    .title("abc")
                    .build();

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .content(gson.toJson(modifyTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패_임시저장게시글ID없음() throws Exception {
            //given
            final ModifyTempPostRequest modifyTempPostRequest = ModifyTempPostRequest.builder()
                    .githubId(githubId)
                    .title("abc")
                    .build();

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .content(gson.toJson(modifyTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 실패_임시저장게시글없음() throws Exception {
            //given
            doThrow(new TempPostException()).when(tempPostService).modifyTempPost(modifyTempPostRequest);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.put(url)
                            .content(gson.toJson(modifyTempPostRequest))
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
                            .content(gson.toJson(modifyTempPostRequest))
                            .contentType(MediaType.APPLICATION_JSON)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

    @Nested
    class 임시저장게시글_삭제 {

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new Exception()).when(tempPostService).deleteTempPost(githubId, tempPostId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.delete(url)
                            .param("githubId", githubId)
                            .param("tempPostId", String.valueOf(tempPostId))
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.delete(url)
                            .param("githubId", githubId)
                            .param("tempPostId", String.valueOf(tempPostId))
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

    @Nested
    class 임시저장게시글_수_조회 {

        @Test
        void 실패() throws Exception {
            //given
            doThrow(new Exception()).when(tempPostService).countTempPosts(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url + "/count")
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isBadRequest());
        }

        @Test
        void 성공() throws Exception {
            //given
            doReturn(127).when(tempPostService).countTempPosts(githubId);

            //when
            final ResultActions resultActions = mockMvc.perform(
                    MockMvcRequestBuilders.get(url + "/count")
                            .param("githubId", githubId)
            );

            //then
            resultActions.andExpect(status().isOk());
        }
    }

}
