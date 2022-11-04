package com.b208.prologue.api.service;

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
    public List<Object> getBlogSetting(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        List<Object> result = new ArrayList<>();
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

        String Line = "";
        Line = base64Converter.decode(sb.toString());

        String cut = ",\n" + "    },\n" + "  },\n" + "  plugins: \\[";
        String[] stringVal = Line.split(cut);

        cut = "siteMetadata: \\{\n" + "    title: `";
        stringVal = stringVal[0].split(cut);

        cut = "`,\n" + "    author: \\{\n" + "      name: `";
        stringVal = stringVal[1].split(cut);
        String blogName = stringVal[0];
        result.add(blogName);

        cut = "`,\n" + "      summary: `";
        stringVal = stringVal[1].split(cut);
        String nickName = stringVal[0];
        result.add(nickName);

        cut = "`,\n" + "      profileImg: \"";
        stringVal = stringVal[1].split(cut);
        String summary = stringVal[0];
        result.add(summary);

        cut = "\",\n" + "    },\n" + "    description: `";
        stringVal = stringVal[1].split(cut);
        String profileImgPath = stringVal[0];
        result.add(profileImgPath);

        cut = "`,\n" + "    siteUrl:";
        stringVal = stringVal[1].split(cut);
        String description = stringVal[0];
        result.add(description);

        Map<String, String> social = new HashMap<>();

        if(stringVal[1].contains("Github") || stringVal[1].contains("Instagram") || stringVal[1].contains("twitter")){
            cut = "social: \\{\n      ";
            stringVal = stringVal[1].split(cut);
            stringVal = stringVal[1].split(",\n      ");

            if(stringVal.length > 0){
                for (int i = 0; i < stringVal.length; i++){
                    String[] temp = stringVal[i].split(": ");

                    social.put(temp[0], temp[1].replace("`",""));
                }
            }
        }

        result.add(social);
        return result;
    }
}
