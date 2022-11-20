package com.b208.prologue.api.service;

import com.b208.prologue.api.request.PostRequest;
import com.b208.prologue.api.request.github.*;
import com.b208.prologue.api.response.ImageResponse;
import com.b208.prologue.api.response.github.PostGetListResponse;
import com.b208.prologue.api.response.github.GetRepoContentResponse;
import com.b208.prologue.api.response.github.PostgetResponse;
import com.b208.prologue.common.Base64Converter;
import lombok.RequiredArgsConstructor;
import org.apache.tomcat.util.codec.binary.Base64;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;

import java.io.UnsupportedEncodingException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.sql.Timestamp;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final WebClient webClient;
    private final Base64Converter base64Converter;
    private final CommonService commonService;

    @Override
    public Map<String, Object> getList(String encodedAccessToken, String githubId, int index, String category) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();
        index = index < 0 ? list.length - 1 : index;
        return category.equals("전체보기") ? getListAll(accessToken, githubId, list, index) : getListSpecific(accessToken, githubId, list, index, category);
    }

    @Override
    public Map<String, Object> getListAll(String accessToken, String githubId, PostGetListResponse[] list, int index) throws Exception {

        List<PostRequest> postRequests = new ArrayList<>();
        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";
        int i = index;

        for (; 0 <= i && i > index - 6; i--) {
            String post = setItem(url, accessToken, list[i].getPath());
            postRequests.add(getPostFrontMatter(accessToken, githubId, list[i], post));
        }

        Collections.sort(postRequests, new Comparator().reversed());

        Map<String, Object> result = new HashMap<>();
        result.put("Post", postRequests);
        result.put("isLast", i < 0);
        result.put("index", i);

        return result;
    }

    @Override
    public Map<String, Object> getListSpecific(String accessToken, String githubId, PostGetListResponse[] list, int index, String category) throws Exception {

        List<PostRequest> postRequests = new ArrayList<>();
        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";
        int i = index, cntPosts = 0;

        for (; 0 <= i; i--) {
            String post = setItem(url, accessToken, list[i].getPath());

            int startIndex = post.indexOf("\ncategory");
            startIndex = post.indexOf(": ", startIndex);
            int endIndex = post.indexOf("\ntags");
            String categoryStr = post.substring(startIndex + 2, endIndex).trim();

            if (category.equals(categoryStr)) {
                if (++cntPosts == 7) break;
                postRequests.add(getPostFrontMatter(accessToken, githubId, list[i], post));
            }
        }

        Collections.sort(postRequests, new Comparator().reversed());

        Map<String, Object> result = new HashMap<>();
        result.put("Post", postRequests);
        result.put("isLast", i < 0 || cntPosts < 7);
        result.put("index", i);

        return result;
    }

    @Override
    public PostRequest getPostFrontMatter(String accessToken, String githubId, PostGetListResponse item, String post) throws Exception {

        PostRequest postRequest = new PostRequest();
        postRequest.setDirectory(item.getName());
        postRequest.setImgUrl(getImage(accessToken, githubId, item.getName()));

        if (!isNumeric(item.getName()) && item.getName().length() != 13) {
            StringTokenizer st = new StringTokenizer(post, "\n");
            int cnt = st.countTokens();

            boolean flag = false;
            for (int j = 0; j < cnt; j++) {
                String line = st.nextToken();

                if (line.contains("date")) {
                    flag = true;

                    String tempDate = line.substring(line.indexOf("\"") + 1);
                    tempDate = tempDate.split("T")[0];

                    postRequest.setDate(tempDate);
                    break;
                }
            }
            if (flag == false) {
                postRequest.setDate("No Date");
            }
        } else {
            Date tempDate = new Date(Long.parseLong(item.getName()));
            SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

            postRequest.setDate(String.valueOf(dateFormat.format(tempDate)));
        }

        if (post.contains("---")) {
            int targetIndex = post.indexOf("]\ndate: ");

            String tempContent = post.substring(0, targetIndex);

            int startIndex = tempContent.indexOf("title");
            startIndex = tempContent.indexOf(": ", startIndex);
            int endIndex = tempContent.indexOf("\ndescription");
            postRequest.setTitle(tempContent.substring(startIndex + 2, endIndex));

            startIndex = tempContent.indexOf(": ", endIndex);
            endIndex = tempContent.indexOf("\ncategory");
            postRequest.setDescription(tempContent.substring(startIndex + 2, endIndex));

            startIndex = tempContent.indexOf(": ", endIndex);
            endIndex = tempContent.indexOf("\ntags");
            postRequest.setCategory(tempContent.substring(startIndex + 2, endIndex));

            startIndex = tempContent.indexOf("[", endIndex);
            String tagLine = tempContent.substring(startIndex + 1);
            String[] tagArr = tagLine.split(",");
            postRequest.setTag(tagArr[0].equals("") ? new String[]{} : tagArr);
        }

        return postRequest;
    }

    public static boolean isNumeric(String s) {
        try {
            Long.parseLong(s);
            return true;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    public class Comparator implements java.util.Comparator<PostRequest> {
        @Override
        public int compare(PostRequest val1, PostRequest val2) {
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

    public String getImage(String accessToken, String githubId, String directory) throws Exception {
        GetRepoContentResponse[] responses = commonService.getContentList(accessToken, githubId, "content/blog/" + directory);

        String imgUrl = "No Image";

        for (int i = 0; i < responses.length; i++) {
            if (!responses[i].getName().equals("index.md")) {
                imgUrl = responses[i].getUrl();
                break;
            } else {
                continue;
            }
        }

        return imgUrl;
    }


    public String setItem(String url, String accessToken, String path) {
        PostgetResponse item = webClient.get()
                .uri(url + path + "/index.md")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostgetResponse.class).block();

        StringTokenizer st = new StringTokenizer(item.getContent(), "\n");
        StringBuilder sb = new StringBuilder();

        int val = st.countTokens();

        for (int i = 0; i < val; i++) {
            sb.append(st.nextToken());
        }

        String Line = "";
        try {
            Line = base64Converter.decode(sb.toString());
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }

        return Line;
    }

    @Override
    public void insertDetailPost(String encodedAccessToken, String githubId, int blogType, String content, List<ImageResponse> images, List<MultipartFile> files) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "add: 새게시글 작성";
        String featuredImage = "/assets/post-image.png";
        List<TreeRequest> treeRequestList = new ArrayList<>();

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String directory = String.valueOf(timeStamp.getTime());
        String path = "content/blog/" + directory;
        String encodedContent;

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String imageName = file.getOriginalFilename().replace(' ', '_');
                encodedContent = commonService.makeBlob(accessToken, githubId, new String(Base64.encodeBase64(file.getBytes())));
                treeRequestList.add(new TreeRequest(path + "/" + imageName, "100644", "blob", encodedContent));
                featuredImage = "./" + imageName;
            }
        }

        if (images != null && !images.isEmpty()) {
            content = replaceImageUrlWithPath(content, images);
        }
        if (blogType == 1) {
            int index = content.indexOf("-");
            StringBuilder sb = new StringBuilder();
            sb.append("---\n");
            sb.append("template: blog-post\n");
            sb.append("templateKey: blog-post\n");
            sb.append("slug: /blog/").append(directory).append("\n");
            sb.append("featuredImage: ").append(featuredImage).append("\n");
            sb.append("featuredimage: ").append(featuredImage).append("\n");
            if (!featuredImage.equals("/assets/post-image.png")) {
                sb.append("selectedImage: ").append(featuredImage).append("\n");
            }
            sb.append("author: ").append(githubId).append("\n");
            sb.append("featured: false\n");
            sb.append("featuredpost: false\n");
            sb.append(content.substring(index + 4));

            content = sb.toString();
        }
        encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", encodedContent));

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void updateDetailPost(String encodedAccessToken, String githubId, int blogType, String path, String content, List<MultipartFile> files, List<ImageResponse> images) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 게시글 수정";
        String featuredImage = "/assets/post-image.png";

        List<TreeRequest> treeRequestList = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (ImageResponse image : images) {
                String imageName = image.getName().replace(' ', '_');
                if (content.contains(image.getUrl())) {
                    content = content.replace(image.getUrl(), "./" + imageName);
                    featuredImage = "./" + imageName;
                } else {
                    treeRequestList.add(new TreeRequest(path + "/" + imageName, "100644", "blob", null));
                }
            }
        }

        if (blogType == 1) {
            int index = content.indexOf("-");
            StringBuilder sb = new StringBuilder();
            sb.append("---\n");
            sb.append("template: blog-post\n");
            sb.append("templateKey: blog-post\n");
            sb.append("slug: /blog/").append(path.substring(path.lastIndexOf("/") + 1)).append("\n");
            sb.append("featuredImage: ").append(featuredImage).append("\n");
            sb.append("featuredimage: ").append(featuredImage).append("\n");
            if (!featuredImage.equals("/assets/post-image.png")) {
                sb.append("selectedImage: ").append(featuredImage).append("\n");
            }
            sb.append("author: ").append(githubId).append("\n");
            sb.append("featured: false\n");
            sb.append("featuredpost: false\n");
            sb.append(content.substring(index + 4));

            content = sb.toString();
        }
        content = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", content));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                String encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename().replace(' ', '_'), "100644", "blob", encodedContent));
            }
        }
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void updateDetailPage(String encodedAccessToken, String githubId, String path, String content, List<MultipartFile> files, List<ImageResponse> images) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 페이지 수정";

        List<TreeRequest> treeRequestList = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (ImageResponse image : images) {
                String imageName = image.getName().replace(' ', '_');
                if (content.contains(image.getUrl())) {
                    content = content.replace(image.getUrl(), "./" + imageName);
                } else {
                    treeRequestList.add(new TreeRequest(path + "/" + imageName, "100644", "blob", null));
                }
            }
        }

        content = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", content));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                String encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename().replace(' ', '_'), "100644", "blob", encodedContent));
            }
        }
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void deleteDetailPost(String encodedAccessToken, String githubId, String directory) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "remove: 게시글 삭제";
        String path = "content/blog/" + directory;

        GetRepoContentResponse[] responses = commonService.getContentList(accessToken, githubId, path);

        List<TreeRequest> treeRequestList = new ArrayList<>();

        for (int i = 0; i < responses.length; i++) {
            treeRequestList.add(new TreeRequest(path + "/" + responses[i].getName(), "100644", "blob", null));
        }

        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public String getDetailPost(String encodedAccessToken, String githubId, String path, List<ImageResponse> images) throws Exception {
        String content = getDetailPage(encodedAccessToken, githubId, path, images);

        int index = content.indexOf("date: ");
        index = content.indexOf("---", index);
        content = content.substring(index + 4);

        return content;
    }

    @Override
    public String getDetailPage(String encodedAccessToken, String githubId, String path, List<ImageResponse> images) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        GetRepoContentResponse response = commonService.getDetailContent(accessToken, githubId, path + "/index.md");
        String content = base64Converter.decode(response.getContent().replace("\n", ""));
        if (images != null && !images.isEmpty()) {
            content = replaceImagePathWithUrl(content, images);
        }
        return content;
    }

    @Override
    public List<ImageResponse> getImages(String encodedAccessToken, String githubId, String path) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        GetRepoContentResponse[] responses = commonService.getContentList(accessToken, githubId, path);
        List<ImageResponse> images = new ArrayList<>();
        for (int i = 0; i < responses.length; i++) {
            if (!responses[i].getName().equals("index.md")) {
                images.add(new ImageResponse(responses[i].getName(), responses[i].getUrl()));
            }
        }
        return images;
    }

    @Override
    public String tempImageUpload(String encodedAccessToken, String githubId, MultipartFile file) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        String image = new String(Base64.encodeBase64(file.getBytes()));
        UploadTempImageRequest uploadTempImageRequest = new UploadTempImageRequest("upload tempImage", "gh-pages", image);

        String extension = file.getOriginalFilename().substring(file.getOriginalFilename().lastIndexOf("."));

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String imageName = String.valueOf(timeStamp.getTime()) + extension;

        String response = webClient.put()
                .uri("/repos/" + githubId + "/" + githubId + ".github.io/contents/tempImage/" + imageName)
                .headers(h -> h.setBearerAuth(accessToken))
                .body(Mono.just(uploadTempImageRequest), UploadTempImageRequest.class)
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(String.class).block();

        JSONParser jsonParser = new JSONParser();
        JSONObject object = (JSONObject) jsonParser.parse(response);
        JSONObject content = (JSONObject) object.get("content");
        return (String) content.get("download_url");
    }

    @Override
    public String replaceImageUrlWithPath(String content, List<ImageResponse> images) {
        for (ImageResponse image : images) {
            content = content.replace(image.getUrl(), "./" + image.getName().replace(' ', '_'));
        }
        return content;
    }

    @Override
    public String replaceImagePathWithUrl(String content, List<ImageResponse> images) {
        for (ImageResponse image : images) {
            content = content.replace("./" + image.getName().replace(' ', '_'), image.getUrl());
        }
        return content;
    }
}
