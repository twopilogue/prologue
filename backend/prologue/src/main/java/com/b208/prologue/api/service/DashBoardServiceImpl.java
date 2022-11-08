package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.*;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
@RequiredArgsConstructor
public class DashBoardServiceImpl implements DashBoardService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final PostServiceImpl postService;

    @Override
    public Map<String, List<String>> getList(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Map<String, List<String>> result = new HashMap<>();
        List<String> title = new ArrayList<>();
        List<String> temp = new ArrayList<>();
        List<String> date = new ArrayList<>();
        List<String> directory = new ArrayList<>();

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = list.length - 1; i > list.length - 7; i--) {
            if (i < 0) break;

            if(isNumeric(list[i].getName()) == false && list[i].getName().length() != 13) {
                String post = postService.setItem(url, accessToken, list[i].getPath());
                temp.add(post);
                directory.add(list[i].getName());

                StringTokenizer st = new StringTokenizer(post, "\n");
                int cnt = st.countTokens();

                boolean flag = false;
                for(int j = 0; j < cnt; j++){
                    String line = st.nextToken();

                    if(line.contains("date")){
                        flag = true;

                        String tempDate = line.substring(line.indexOf("\"") + 1);
                        String[] tmp = tempDate.split("T");
                        tempDate = tmp[0];

                        date.add(tempDate);
                        break;
                    }
                }
                if(flag == false){
                    continue;
                }
            }else{
                temp.add(postService.setItem(url, accessToken, list[i].getPath()));
                directory.add(list[i].getName());

                Date tempDate = new Date(Long.parseLong(list[i].getName()));
                SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");

                date.add(String.valueOf(dateFormat.format(tempDate)));
            }

        }

        for(int i = 0; i < temp.size(); i++){
            StringTokenizer st = new StringTokenizer(temp.get(i), "\n");
            int cnt = st.countTokens();

            for(int j = 0; j < cnt; j++){
                String line = st.nextToken();
                if(line.contains("title")){
                    title.add(line.substring(line.indexOf(": ") + 1));
                    break;
                }
                if(j == (cnt-1)){
                    title.add("No Title");
                }
            }
        }

        result.put("title", title);
        result.put("date", date);
        result.put("directory", directory);
        return result;
    }

    @Override
    public Double getRepositorySize(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepositorySizeResponse getRepositorySizeResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetRepositorySizeResponse.class).block();

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

        for (int i = 0; i < getFileNameResponse.length; i++){
            if(isNumeric(getFileNameResponse[i].getName()) == false && getFileNameResponse[i].getName().length() != 13) continue;
            Date date = new Date(Long.parseLong(getFileNameResponse[i].getName()));
            SimpleDateFormat dateFormat = new SimpleDateFormat ("yyyy-MM-dd");

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

        GetLatestBuildTimeResponse getLatestBuildTimeResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/pages/builds/latest")
                .accept(MediaType.APPLICATION_JSON)
                .headers(h -> h.setBearerAuth(accessToken))
                .retrieve()
                .bodyToMono(GetLatestBuildTimeResponse.class).block();

        SimpleDateFormat dataFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm");
        return dataFormat.format(getLatestBuildTimeResponse.getLastBuildTime());
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
}
