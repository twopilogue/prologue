package com.b208.prologue.api.service;

import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.GetSettingResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;

    @Override
    public List<String> getBlogSetting(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        GetSettingResponse item = webClient.get()
                .uri(url + "gastby-config.json")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetSettingResponse.class).block();

        StringTokenizer st = new StringTokenizer(item.getContent(), "\n");
        StringBuilder sb = new StringBuilder();

        int val = st.countTokens();

        for (int i = 0; i < val; i++) {
            sb.append(st.nextToken());
        }

        List<String> result = new ArrayList<>();
        String Line = "";
        Line = base64Converter.decode(sb.toString());

        String[] stringVal = Line.split(",\n" + "  plugins:");
        String tempVal = stringVal[0].replace("module.exports = {\n", "");

        result.add(tempVal);

        stringVal = tempVal.split("profileImg:");
        stringVal = stringVal[1].split("description:");

        String imagePath = stringVal[0].replace("\"","");
        imagePath = imagePath.replace(",","");
        imagePath = imagePath.replace("}","");
        imagePath = imagePath.replace(" ","");
        imagePath = imagePath.replace("\n","");


        result.add(getProfileImage(accessToken, url, imagePath));

        return result;
    }

    public String getProfileImage(String accessToken, String url, String path){

        GetRepoContentResponse item = webClient.get()
                .uri(url + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse.class).block();

        return item.getUrl();
    }
}
