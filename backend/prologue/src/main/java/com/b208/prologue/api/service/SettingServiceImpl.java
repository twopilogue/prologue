package com.b208.prologue.api.service;

import com.b208.prologue.api.request.github.CreateContentRequest;
import com.b208.prologue.api.request.github.DeleteContentRequest;
import com.b208.prologue.api.request.github.UpdateContentRequest;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.GetSettingResponse;
import com.b208.prologue.api.response.github.GetShaResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.ArrayList;
import java.util.List;
import java.util.StringTokenizer;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final CommonService commonService;

    @Override
    public List<String> getBlogSetting(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        GetSettingResponse item = webClient.get()
                .uri(url + "gatsby-config.js")
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

        String imagePath = "images/profile-pic.png";
        result.add(getProfileImage(accessToken, url, imagePath));

        return result;
    }

    @Override
    public void updateBlogSetting(String encodedAccessToken, String githubId, String modified) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, "gatsby-config.js");
        String sha = getRepoContentResponse.getSha();

        String lastModify = "module.exports = " + modified;
        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 블로그 설정", base64Converter.encode(lastModify), sha);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/gatsby-config.js")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public void updateProfileImage(String encodedAccessToken, String githubId, MultipartFile imageFile) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse[] getRepoContentResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/images")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse[].class).block();

        String fileName = "";
        String sha = "";
        for (int i = 0; i < getRepoContentResponse.length; i++){
            GetRepoContentResponse getRepoContent = webClient.get()
                    .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + getRepoContentResponse[i].getPath())
                    .headers(h -> h.setBearerAuth(accessToken))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(GetRepoContentResponse.class).block();

            if(getRepoContent.getName().contains("profile-pic")){
                fileName = getRepoContent.getName();
                sha = getRepoContent.getSha();
                break;
            }
        }

        DeleteContentRequest deleteContentRequest = new DeleteContentRequest("delete: profile img 삭제", sha);
        webClient.method(HttpMethod.DELETE)
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/images/" + fileName)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(deleteContentRequest), DeleteContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class).block();

        int idx = imageFile.getOriginalFilename().indexOf(".");
        fileName = "profile-pic" + imageFile.getOriginalFilename().substring(idx);

        String image = new String(Base64.encodeBase64(imageFile.getBytes()));

        CreateContentRequest createContentRequest = new CreateContentRequest("update: 프로필 이미지 변경", image);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/images/" + fileName)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(createContentRequest), CreateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class).block();
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

    @Override
    public String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String content = commonService.getDetailContent(accessToken, githubId, "customizing-setting.json").getContent();
        int index = content.indexOf('=');
        content = content.substring(index + 1);

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONArray jsonArray = (JSONArray) jsonObj.get("category");

        String[] category = new String[jsonArray.size() - 1];

        for (int i = 0; i < category.length; i++) {
            category[i] = jsonArray.get(i + 1).toString();
        }

        return category;
    }

    @Override
    public void updateBlogCategory(String encodedAccessToken, String githubId, List<String> category) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        JSONArray jsonArray = new JSONArray();
        jsonArray.add("전체보기");
        for (int i = 0; i < category.size(); i++) {
            jsonArray.add(category.get(i));
        }

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, "customizing-setting.json");
        String content = getRepoContentResponse.getContent();
        String sha = getRepoContentResponse.getSha();

        int index = content.indexOf('=');
        content = content.substring(index + 1);

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        jsonObj.replace("category", jsonArray);

        String jsonString = "customizing-setting=" + jsonObj;

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 카테고리 설정", base64Converter.encode(jsonString), sha);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/customizing-setting.json")
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public String[] getBlogPages(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String content = commonService.getDetailContent(accessToken, githubId, "customizing-setting.json").getContent();
        int index = content.indexOf('=');
        content = content.substring(index + 1);

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONArray jsonArray = (JSONArray) jsonObj.get("pages");

        String[] pages = new String[jsonArray.size()];

        for (int i = 0; i < pages.length; i++) {
            pages[i] = jsonArray.get(i).toString();
        }

        return pages;
    }
}
