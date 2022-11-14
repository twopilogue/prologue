package com.b208.prologue.api.service;

import com.b208.prologue.api.request.ModifyBlogSettingRequest;
import com.b208.prologue.api.request.github.TreeRequest;
import com.b208.prologue.api.request.github.UpdateContentRequest;
import com.b208.prologue.api.response.GetBlogSettingResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.util.*;

@Service
@RequiredArgsConstructor
public class SettingServiceImpl implements SettingService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final CommonService commonService;

    @Override
    public GetBlogSettingResponse getBlogSetting(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetBlogSettingResponse getBlogSettingResponse = new GetBlogSettingResponse();

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/util/site.json")
                .getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONObject meta = (JSONObject) jsonObj.get("meta");

        JSONObject social = (JSONObject) meta.get("social");
        JSONObject author = (JSONObject) meta.get("author");

        String nickName= author.get("name").toString();
        String summary = author.get("summary").toString();
        String title = meta.get("title").toString();
        String description = meta.get("description").toString();

        Map<String, String> socialMap = new HashMap<>();
        socialMap.put("github", social.get("github").toString());
        socialMap.put("gmail", social.get("gmail").toString());
        socialMap.put("instagram", social.get("instagram").toString());
        socialMap.put("twitter", social.get("twitter").toString());

        getBlogSettingResponse.setNickName(nickName);
        getBlogSettingResponse.setSummary(summary);
        getBlogSettingResponse.setTitle(title);
        getBlogSettingResponse.setDescription(description);
        getBlogSettingResponse.setSocial(socialMap);

        GetRepoContentResponse[] getRepoContentResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/src/images")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse[].class).block();

        String imageUrl = "";
        for (int i = 0; i < getRepoContentResponse.length; i++) {
            if (getRepoContentResponse[i].getName().contains("profile-pic")) {
                imageUrl = getRepoContentResponse[i].getUrl();
                break;
            }
        }

        getBlogSettingResponse.setProfileImg(imageUrl);

        return getBlogSettingResponse;
    }

    @Override
    public void updateBlogSetting(ModifyBlogSettingRequest modifyBlogSettingRequest, MultipartFile imageFile) throws Exception {
        String accessToken = base64Converter.decryptAES256(modifyBlogSettingRequest.getAccessToken());
        String githubId = modifyBlogSettingRequest.getGithubId();
        String commit = "update: 블로그 설정 수정";

        List<TreeRequest> treeRequestList = new ArrayList<>();

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/util/site.json")
                .getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONObject meta = (JSONObject) jsonObj.get("meta");

        JSONObject social = (JSONObject) meta.get("social");
        JSONObject author = (JSONObject) meta.get("author");

        author.put("name", modifyBlogSettingRequest.getNickName());
        author.put("summary", modifyBlogSettingRequest.getSummary());
        meta.put("title", modifyBlogSettingRequest.getTitle());
        meta.put("description", modifyBlogSettingRequest.getDescription());

        if (modifyBlogSettingRequest.getSocial().get("github") == null) {
            social.put("github", "");
        }else {
            social.put("github", modifyBlogSettingRequest.getSocial().get("github"));
        }
        if (modifyBlogSettingRequest.getSocial().get("gmail") == null) {
            social.put("gmail", "");
        }else {
            social.put("gmail", modifyBlogSettingRequest.getSocial().get("gmail"));
        }
        if (modifyBlogSettingRequest.getSocial().get("instagram") == null) {
            social.put("instagram", "");
        }else {
            social.put("instagram", modifyBlogSettingRequest.getSocial().get("instagram"));
        }
        if (modifyBlogSettingRequest.getSocial().get("twitter") == null) {
            social.put("twitter", "");
        }else {
            social.put("twitter", modifyBlogSettingRequest.getSocial().get("twitter"));

        }

        jsonObj.put("meta", meta);
        String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()));
        treeRequestList.add(new TreeRequest("src/util/site.json", "100644", "blob", encodedContent));

        if (imageFile != null) {
            String path = "src/images/";

            GetRepoContentResponse[] getRepoContentResponse = webClient.get()
                    .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/src/images")
                    .headers(h -> h.setBearerAuth(accessToken))
                    .accept(MediaType.APPLICATION_JSON)
                    .retrieve()
                    .bodyToMono(GetRepoContentResponse[].class).block();

            String fileName = "";
            for (int i = 0; i < getRepoContentResponse.length; i++) {
                if (getRepoContentResponse[i].getName().contains("profile-pic")) {
                    fileName = getRepoContentResponse[i].getName();
                    treeRequestList.add(new TreeRequest(path + getRepoContentResponse[i].getName(), "100644", "blob", null));
                    break;
                }
            }

            int idx = imageFile.getOriginalFilename().lastIndexOf(".");
            fileName = "profile-pic" + imageFile.getOriginalFilename().substring(idx);

            author.put("profile", "../src/images/" + fileName);
            jsonObj.put("meta", meta);
            encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()));
            treeRequestList.add(new TreeRequest("src/util/site.json", "100644", "blob", encodedContent));

            String image = new String(Base64.encodeBase64(imageFile.getBytes()));
            encodedContent = commonService.makeBlob(accessToken, githubId, image);
            treeRequestList.add(new TreeRequest(path + fileName, "100644", "blob", encodedContent));
        }

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/util/customizing-setting.json")
                .getContent().replace("\n", ""));

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
        String path = "src/util/customizing-setting.json";

        JSONArray jsonArray = new JSONArray();
        jsonArray.add("전체보기");
        for (int i = 0; i < category.size(); i++) {
            if (category.get(i).equals("전체보기")) {
                throw new Exception("해당 이름은 생성할 수 없습니다.");
            }
            jsonArray.add(category.get(i));
        }

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));
        String sha = getRepoContentResponse.getSha();

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        jsonObj.replace("category", jsonArray);

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 카테고리 설정", base64Converter.encode(jsonObj.toString()), sha);

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/"+path)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public JSONObject[] getBlogPages(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/util/customizing-setting.json")
                .getContent().replace("\n", ""));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONArray jsonArray = (JSONArray) jsonObj.get("pages");

        JSONObject[] pages = new JSONObject[jsonArray.size()];

        for (int i = 0; i < pages.length; i++) {
            pages[i] = (JSONObject) jsonArray.get(i);
        }

        return pages;
    }

    @Override
    public void updateBlogPages(String encodedAccessToken, String githubId, List<Map<String, String>> pages) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 페이지 목록 수정";

        String path = "content/pages/";
        String settingPath = "src/util/customizing-setting.json";
        List<TreeRequest> treeRequestList = new ArrayList<>();
        List<TreeRequest> addedTreeRequestList = new ArrayList<>();
        String defaultContent = "페이지 내용 넣기";

        JSONArray jsonArray = new JSONArray();

        for (int i = 0; i < pages.size(); i++) {
            Map page = pages.get(i);
            String directory = page.get("label").toString().toLowerCase();

            if (page.get("type").equals("deleted")) {
                if (Boolean.parseBoolean(page.get("posts").toString())) {
                    throw new Exception("posts는 삭제할 수 없습니다.");
                }
                GetRepoContentResponse[] repoContentResponses = commonService.getContentList(accessToken, githubId, path + directory);

                for (GetRepoContentResponse getRepoContentResponse : repoContentResponses) {
                    treeRequestList.add(new TreeRequest(getRepoContentResponse.getPath(), "100644", "blob", null));
                }
                continue;
            } else if (page.get("type").equals("changing")) {
                if (!Boolean.parseBoolean(page.get("posts").toString()) && (directory.equals("post") || directory.equals("posts") || directory.equals("blog"))) {
                    throw new Exception("해당 이름으로 변경할 수 없습니다.");
                }
                GetRepoContentResponse[] repoContentResponses = commonService.getContentList(accessToken, githubId, path + page.get("oldName").toString().toLowerCase());
                for (GetRepoContentResponse getRepoContentResponse : repoContentResponses) {
                    GetRepoContentResponse response = commonService.getDetailContent(accessToken, githubId, getRepoContentResponse.getPath());
                    String encodedContent = commonService.makeBlob(accessToken, githubId, response.getContent());
                    addedTreeRequestList.add(new TreeRequest(path + directory + "/" + response.getName(), "100644", "blob", encodedContent));
                    treeRequestList.add(new TreeRequest(getRepoContentResponse.getPath(), "100644", "blob", null));
                }
            } else if (page.get("type").equals("new")) {
                if (directory.equals("post") || directory.equals("posts") || directory.equals("blog")) {
                    throw new Exception("해당 이름은 생성할 수 없습니다.");
                }
                String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(defaultContent));
                addedTreeRequestList.add(new TreeRequest(path + directory + "/index.md", "100644", "blob", encodedContent));
            }

            String url = Boolean.parseBoolean(page.get("posts").toString()) ? "/blog" : "/" + directory + "/";

            JSONObject jsonObj = new JSONObject();
            jsonObj.put("label", page.get("label"));
            jsonObj.put("url", url);
            jsonArray.add(jsonObj);
        }

        for (int i = 0; i < addedTreeRequestList.size(); i++) {
            treeRequestList.add(addedTreeRequestList.get(i));
        }

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, settingPath);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);

        jsonObj.replace("pages", jsonArray);

        String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()));
        treeRequestList.add(new TreeRequest(settingPath, "100644", "blob", encodedContent));

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);

    }

    @Override
    public String getBlogLayout(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, "src/pages/index.js");
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int startIndex = content.lastIndexOf("return");
        startIndex = content.indexOf(">", startIndex);
        int endIndex = content.lastIndexOf("Layout");
        endIndex = content.lastIndexOf("<", endIndex);

        return content.substring(startIndex + 1, endIndex);
    }

    @Override
    public void updateBlogLayout(String encodedAccessToken, String githubId, String layout) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String path = "src/pages/index.js";

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int startIndex = content.indexOf("display_row");
        startIndex = content.indexOf(">", startIndex);
        int endIndex = content.lastIndexOf("Layout");
        endIndex = content.lastIndexOf("div", endIndex);
        endIndex = content.lastIndexOf("<", endIndex);

        StringBuilder sb = new StringBuilder();
        sb.append(content.substring(0, startIndex + 1)).append("\n");
        sb.append(layout).append("\n");
        sb.append(content.substring(endIndex));

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 레이아웃 설정 변경", base64Converter.encode(sb.toString()), getRepoContentResponse.getSha());

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }

    @Override
    public String getBlogLayoutCss(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, "src/style.css");
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int targetIndex = content.lastIndexOf("CustomCSS");
        targetIndex = content.indexOf("/", targetIndex);

        return content.substring(targetIndex + 1);
    }

    @Override
    public void updateBlogLayoutCss(String encodedAccessToken, String githubId, String css) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String path = "src/style.css";

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int targetIndex = content.lastIndexOf("CustomCSS");
        targetIndex = content.indexOf("/", targetIndex);

        StringBuilder sb = new StringBuilder();
        sb.append(content.substring(0, targetIndex+1)).append("\n").append(css);

        UpdateContentRequest updateContentRequest = new UpdateContentRequest(
                "modify: 레이아웃 세부 설정 변경", base64Converter.encode(sb.toString()), getRepoContentResponse.getSha());

        webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(updateContentRequest), UpdateContentRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class)
                .block();
    }
}
