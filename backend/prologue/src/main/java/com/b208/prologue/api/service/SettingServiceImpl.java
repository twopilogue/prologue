package com.b208.prologue.api.service;

import com.b208.prologue.api.request.ModifyBlogSettingRequest;
import com.b208.prologue.api.response.github.GetBlogLayoutCss;
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

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/utils/site.json")
                .getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONObject meta = (JSONObject) jsonObj.get("meta");

        JSONObject social = (JSONObject) meta.get("social");
        JSONObject author = (JSONObject) meta.get("author");

        String nickName = author.get("name").toString();
        String summary = author.get("summary").toString();
        String title = meta.get("title").toString();
        String description = meta.get("description").toString();

        JSONObject github = (JSONObject) social.get("github");
        JSONObject email = (JSONObject) social.get("email");
        JSONObject instagram = (JSONObject) social.get("instagram");
        JSONObject twitter = (JSONObject) social.get("twitter");

        Map<String, String> socialMap = new HashMap<>();
        socialMap.put("github", github.get("username").toString());
        socialMap.put("email", email.get("username").toString());
        socialMap.put("instagram", instagram.get("username").toString());
        socialMap.put("twitter", twitter.get("username").toString());

        getBlogSettingResponse.setNickName(nickName);
        getBlogSettingResponse.setSummary(summary);
        getBlogSettingResponse.setTitle(title);
        getBlogSettingResponse.setDescription(description);
        getBlogSettingResponse.setSocial(socialMap);

        String profile = author.get("profile").toString();
        profile = profile.substring(profile.lastIndexOf('/') + 1);
        GetRepoContentResponse getRepoContentResponse = webClient.get()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/static/assets/" + profile)
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(GetRepoContentResponse.class).block();

        getBlogSettingResponse.setProfileImg(getRepoContentResponse.getUrl());

        return getBlogSettingResponse;
    }

    @Override
    public void updateBlogSetting(ModifyBlogSettingRequest modifyBlogSettingRequest, MultipartFile imageFile) throws Exception {
        String accessToken = base64Converter.decryptAES256(modifyBlogSettingRequest.getAccessToken());
        String githubId = modifyBlogSettingRequest.getGithubId();
        String commit = "update: 블로그 설정 수정";
        String path = "src/utils/site.json";
        String encodedContent;
        List<TreeRequest> treeRequestList = new ArrayList<>();

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, path)
                .getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONObject meta = (JSONObject) jsonObj.get("meta");

        JSONObject social = (JSONObject) meta.get("social");
        JSONObject author = (JSONObject) meta.get("author");

        meta.replace("title", modifyBlogSettingRequest.getTitle());
        meta.replace("description", modifyBlogSettingRequest.getDescription());
        author.replace("name", modifyBlogSettingRequest.getNickName());
        author.replace("summary", modifyBlogSettingRequest.getSummary());

        if (imageFile != null) {
            int idx = imageFile.getOriginalFilename().lastIndexOf(".");
            String fileName = "profile-pic" + imageFile.getOriginalFilename().substring(idx);
            author.replace("profile", "../assets/" + fileName);

            String image = new String(Base64.encodeBase64(imageFile.getBytes()));
            encodedContent = commonService.makeBlob(accessToken, githubId, image);
            treeRequestList.add(new TreeRequest("static/assets/" + fileName, "100644", "blob", encodedContent));
        }
        meta.replace("author", author);

        JSONObject github = (JSONObject) social.get("github");
        JSONObject email = (JSONObject) social.get("email");
        JSONObject instagram = (JSONObject) social.get("instagram");
        JSONObject twitter = (JSONObject) social.get("twitter");

        github.replace("username", modifyBlogSettingRequest.getSocial().get("github") == null ? "" : modifyBlogSettingRequest.getSocial().get("github"));
        email.replace("username", modifyBlogSettingRequest.getSocial().get("email") == null ? "" : modifyBlogSettingRequest.getSocial().get("email"));
        instagram.replace("username", modifyBlogSettingRequest.getSocial().get("instagram") == null ? "" : modifyBlogSettingRequest.getSocial().get("instagram"));
        twitter.replace("username", modifyBlogSettingRequest.getSocial().get("twitter") == null ? "" : modifyBlogSettingRequest.getSocial().get("twitter"));

        social.replace("github", github);
        social.replace("email", email);
        social.replace("instagram", instagram);
        social.replace("twitter", twitter);
        meta.replace("social", social);

        jsonObj.replace("meta", meta);
        encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()));
        treeRequestList.add(new TreeRequest(path, "100644", "blob", encodedContent));

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public String[] getBlogCategory(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/utils/customizing-setting.json")
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
        String path = "src/utils/customizing-setting.json";

        JSONArray jsonArray = new JSONArray();
        jsonArray.add("전체보기");
        for (int i = 0; i < category.size(); i++) {
            if (category.get(i).equals("전체보기")) {
                throw new Exception("해당 이름은 생성할 수 없습니다.");
            }
            jsonArray.add(category.get(i).trim());
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
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/" + path)
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

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/utils/customizing-setting.json")
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
        String settingPath = "src/utils/customizing-setting.json";
        List<TreeRequest> treeRequestList = new ArrayList<>();
        List<TreeRequest> addedTreeRequestList = new ArrayList<>();
        String defaultContent = "자유롭게 작성해보세요";

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

        String content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/utils/customizing-setting.json")
                .getContent().replace("\n", ""));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);

        String layout = jsonObj.get("customLayout").toString();

        return layout;
    }

    @Override
    public void updateBlogLayout(String encodedAccessToken, String githubId, String layout, String layoutJson) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String path = "src/pages/index.js";
        String settingPath = "src/utils/customizing-setting.json";
        String commit = "modify: 레이아웃 설정 변경";
        List<TreeRequest> treeRequestList = new ArrayList<>();

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int endIndex = content.lastIndexOf("Layout");
        endIndex = content.lastIndexOf("<", endIndex);
        int startIndex = content.lastIndexOf("Layout", endIndex);
        startIndex = content.indexOf(">", startIndex);

        StringBuilder sb = new StringBuilder();
        sb.append(content.substring(0, startIndex + 2));
        sb.append(layout).append("\n");
        sb.append(content.substring(endIndex));

        String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(sb.toString()));
        treeRequestList.add(new TreeRequest(path, "100644", "blob", encodedContent));

        content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, settingPath)
                .getContent().replace("\n", ""));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        JSONObject customLayout = (JSONObject) jsonParser.parse(layoutJson);
        jsonObj.replace("customLayout", customLayout);

        encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()));
        treeRequestList.add(new TreeRequest(settingPath, "100644", "blob", encodedContent));

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public GetBlogLayoutCss getBlogLayoutCss(String encodedAccessToken, String githubId) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, "src/style.css");
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int targetIndex = content.lastIndexOf("CustomCSS");
        targetIndex = content.indexOf("/", targetIndex);

        String css = content.substring(targetIndex + 2);

        content = base64Converter.decode(commonService.getDetailContent(accessToken, githubId, "src/utils/customizing-setting.json")
                .getContent().replace("\n", ""));
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);

        String logoText = jsonObj.get("logo").toString();

        JSONObject title = (JSONObject) jsonObj.get("title");
        boolean titleColor = Boolean.parseBoolean(title.get("color").toString());
        String titleText = title.get("text").toString();

        return new GetBlogLayoutCss(css, logoText, titleText, titleColor);
    }

    @Override
    public void updateBlogLayoutCss(String encodedAccessToken, String githubId, String css,
                                    String logoText, boolean titleColor, String titleText,
                                    MultipartFile logoImage, MultipartFile titleImage) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String path = "src/style.css";
        String commit = "modify: 레이아웃 세부 설정 변경";
        List<TreeRequest> treeRequestList = new ArrayList<>();

        GetRepoContentResponse getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        String content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        int targetIndex = content.lastIndexOf("CustomCSS");
        targetIndex = content.indexOf("/", targetIndex);

        StringBuilder sb = new StringBuilder();
        sb.append(content.substring(0, targetIndex + 1)).append("\n").append(css);

        treeRequestList.add(new TreeRequest(path, "100644", "blob", commonService.makeBlob(accessToken, githubId, base64Converter.encode(sb.toString()))));

        path = "src/utils/customizing-setting.json";
        getRepoContentResponse = commonService.getDetailContent(accessToken, githubId, path);
        content = base64Converter.decode(getRepoContentResponse.getContent().replace("\n", ""));

        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj = (JSONObject) jsonParser.parse(content);
        jsonObj.replace("logo", logoText);

        JSONObject title = new JSONObject();
        title.put("text", titleText);
        title.put("color", titleColor);
        jsonObj.replace("title", title);

        treeRequestList.add(new TreeRequest(path, "100644", "blob", commonService.makeBlob(accessToken, githubId, base64Converter.encode(jsonObj.toString()))));

        if (logoImage != null && !logoImage.isEmpty()) {
            String image = new String(Base64.encodeBase64(logoImage.getBytes()));
            String encodedContent = commonService.makeBlob(accessToken, githubId, image);
            treeRequestList.add(new TreeRequest("src/images/gatsby-icon.png", "100644", "blob", encodedContent));
        }
        if (titleImage != null && !titleImage.isEmpty()) {
            String image = new String(Base64.encodeBase64(titleImage.getBytes()));
            String encodedContent = commonService.makeBlob(accessToken, githubId, image);
            treeRequestList.add(new TreeRequest("src/images/background-default.png", "100644", "blob", encodedContent));
        }

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }
}
