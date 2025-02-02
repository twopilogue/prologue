package com.b208.prologue.api.service;

import com.b208.prologue.api.request.DashBoardPostRequest;
import com.b208.prologue.api.response.github.GetFileNameResponse;
import com.b208.prologue.api.response.github.GetRepositorySizeResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final PostServiceImpl postService;
    private static String path;

    @Value("${template.path}")
    private void setTemplatePath(String path) {
        this.path = path;
    }

    @Override
    public List<DashBoardPostRequest> getList(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        List<DashBoardPostRequest> boardPostRequests = new ArrayList<>();
        List<String> temp = new ArrayList<>();

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = list.length - 1; i > list.length - 7; i--) {
            if (i < 0) break;
            DashBoardPostRequest boardPostRequest = new DashBoardPostRequest();

            if (isNumeric(list[i].getName()) == false && list[i].getName().length() != 13) {
                String post = postService.setItem(url, accessToken, list[i].getPath());
                temp.add(post);
                boardPostRequest.setDirectory(list[i].getName());

                StringTokenizer st = new StringTokenizer(post, "\n");
                int cnt = st.countTokens();

                boolean flag = false;
                for (int j = 0; j < cnt; j++) {
                    String line = st.nextToken();

                    if (line.contains("date")) {
                        flag = true;

                        String tempDate = line.substring(line.indexOf("\"") + 1);
                        String[] tmp = tempDate.split("T");
                        tempDate = tmp[0];

                        boardPostRequest.setDate(tempDate);
                        break;
                    }
                }
                if (flag == false) {
                    continue;
                }
            } else {
                temp.add(postService.setItem(url, accessToken, list[i].getPath()));
                boardPostRequest.setDirectory(list[i].getName());

                Date tempDate = new Date(Long.parseLong(list[i].getName()));
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

                boardPostRequest.setDate(String.valueOf(dateFormat.format(tempDate)));
            }

            boardPostRequests.add(boardPostRequest);
        }

        for (int i = 0; i < temp.size(); i++) {
            StringTokenizer st = new StringTokenizer(temp.get(i), "\n");
            int cnt = st.countTokens();

            for (int j = 0; j < cnt; j++) {
                String line = st.nextToken();
                if (line.contains("title")) {
                    boardPostRequests.get(i).setTitle(line.substring(line.indexOf(": ") + 1));
                    break;
                }
                if (j == (cnt - 1)) {
                    boardPostRequests.get(i).setTitle("No Title");
                }
            }
        }

        Collections.sort(boardPostRequests, new Comparator().reversed());

        return boardPostRequests;
    }

    public class Comparator implements java.util.Comparator<DashBoardPostRequest> {
        @Override
        public int compare(DashBoardPostRequest val1, DashBoardPostRequest val2) {
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

            Date date1 = null;
            Date date2 = null;
            try {
                date1 = sdf.parse(val1.getDate());
                date2 = sdf.parse(val2.getDate());
            } catch (ParseException e) {
                e.printStackTrace();
            }

            return Long.valueOf(date1.getTime())
                    .compareTo(date2.getTime());
        }
    }

    @Override
    public Double getRepositorySize(String encodedAccessToken, String githubId, String template) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepositorySizeResponse getRepositorySizeResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetRepositorySizeResponse.class).block();

        if (getRepositorySizeResponse.getSize() == 0.0) {
            GetRepositorySizeResponse tempBlogSize = webClient.get()
                    .uri("/repos/" + path + "/" + template)
                    .accept(MediaType.APPLICATION_JSON)
                    .headers(h -> h.setBearerAuth(accessToken))
                    .retrieve()
                    .bodyToMono(GetRepositorySizeResponse.class).block();
            return tempBlogSize.getSize() / 1000.0;
        }

        return getRepositorySizeResponse.getSize() / 1000.0;
    }

    @Override
    public Set<String> getDateList(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Set<String> result = new LinkedHashSet<>();

        GetFileNameResponse[] getFileNameResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/content/blog")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetFileNameResponse[].class).block();

        for (int i = 0; i < getFileNameResponse.length; i++) {
            if (isNumeric(getFileNameResponse[i].getName()) == false && getFileNameResponse[i].getName().length() != 13)
                continue;
            Date date = new Date(Long.parseLong(getFileNameResponse[i].getName()));
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            result.add(String.valueOf(dateFormat.format(date)));
        }

        return result;
    }

    public static boolean isNumeric(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public String getLatestBuildTime(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String response = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/actions/runs")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class).block();

        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(response);
        JSONArray workflow_runs = (JSONArray) jsonParser.parse(object.get("workflow_runs").toString());
        JSONObject content = (JSONObject) workflow_runs.get(0);

        LocalDateTime dateTime = LocalDateTime.from(
                Instant.from(
                        DateTimeFormatter.ISO_DATE_TIME.parse(content.get("created_at").toString())
                ).atZone(ZoneId.of("Asia/Seoul"))
        );

        Date date = java.sql.Timestamp.valueOf(dateTime);
        SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm");

        return dataFormat.format(date);
    }

    @Override
    public Integer getTotalCount(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        return list.length;
    }

    @Override
    public String getBuildState(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String response = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/actions/runs")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class).block();

        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(response);
        JSONArray workflow_runs = (JSONArray) jsonParser.parse(object.get("workflow_runs").toString());
        JSONObject content = (JSONObject) workflow_runs.get(0);

        String buildState = "progress";
        if (content.get("status").equals("completed")) {
            buildState = "completed";
        }
        return buildState;
    }

    public boolean checkUpdate(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String response = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/branches/main")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(String.class).block();

        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(response);
        JSONObject commit = (JSONObject) jsonParser.parse(object.get("commit").toString());
        JSONObject commitDetail = (JSONObject) jsonParser.parse(commit.get("commit").toString());
        if (commitDetail.get("message").equals("action workflow")) return false;
        return true;
    }
}
