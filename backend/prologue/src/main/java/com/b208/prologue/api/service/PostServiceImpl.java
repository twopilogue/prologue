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
    public Map<String, Object> getList(String encodedAccessToken, String githubId, int page) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);

        Map<String, Object> result = new HashMap<>();
        List<String> temp = new ArrayList<>();
        List<PostRequest> postRequests = new ArrayList<>();

        String url = "/repos/" + githubId + "/" + githubId + ".github.io" + "/contents/";

        PostGetListResponse[] list = webClient.get()
                .uri(url + "content/blog")
                .headers(h -> h.setBearerAuth(accessToken))
                .accept(MediaType.APPLICATION_JSON)
                .retrieve()
                .bodyToMono(PostGetListResponse[].class).block();

        for (int i = (list.length - 1) - (6 * page); i > (list.length - 1) - (6 * (page + 1)); i--) {
            if (i < 0) {
                break;
            }
            PostRequest postRequest = new PostRequest();

            if (isNumeric(list[i].getName()) == false && list[i].getName().length() != 13) {
                String post = setItem(url, accessToken, list[i].getPath());
                temp.add(post);
                postRequest.setDirectory(list[i].getName());
                postRequest.setImgUrl(getImage(accessToken, githubId, list[i].getName()));

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

                        postRequest.setDate(tempDate);
                        break;
                    }
                }
                if (flag == false) {
                    postRequest.setDate("No Date");
                }
            } else {
                temp.add(setItem(url, accessToken, list[i].getPath()));
                postRequest.setDirectory(list[i].getName());
                postRequest.setImgUrl(getImage(accessToken, githubId, list[i].getName()));

                Date tempDate = new Date(Long.parseLong(list[i].getName()));
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");

                postRequest.setDate(String.valueOf(dateFormat.format(tempDate)));
            }
            postRequests.add(postRequest);
        }

        for (int i = 0; i < temp.size(); i++) {
            if (temp.get(i).contains("---")) {
                String tempContent[] = temp.get(i).split("---\n");

                StringTokenizer st = new StringTokenizer(tempContent[1], "\n");
                int cnt = st.countTokens();

                List<String> tag = new ArrayList<>();
                for (int j = 0; j < cnt; j++) {
                    String line = st.nextToken();
                    if (line.contains("title")) {
                        postRequests.get(i).setTitle(line.substring(line.indexOf(": ") + 1));
                    } else if (line.contains("description")) {
                        postRequests.get(i).setDescription(line.substring(line.indexOf(": ") + 1));
                    } else if (line.contains("category")) {
                        postRequests.get(i).setCategory(line.substring(line.indexOf(": ") + 1));
                    } else if (line.contains("tag")) {
                        String tagLine = line.substring(line.indexOf(": ") + 1);
                        String[] tagArr = tagLine.split(",");
                        for (String tagTemp : tagArr) {
                            tag.add(tagTemp);
                        }
                        postRequests.get(i).setTag(tag);
                    }
                }
            }
        }

        Collections.sort(postRequests, new Comparator().reversed());

        int cnt = list.length;
        result.put("PostCount", cnt);
        result.put("Post", postRequests);

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

        List<TreeRequest> treeRequestList = new ArrayList<>();

        Long nowDate = System.currentTimeMillis();
        Timestamp timeStamp = new Timestamp(nowDate);
        String directory = String.valueOf(timeStamp.getTime());
        String path = "content/blog/" + directory;

        if (images != null && !images.isEmpty()) {
            content = replaceImageUrlWithPath(content, images);
        }

        if(blogType==1){
            int index = content.indexOf("-");
            StringBuilder sb = new StringBuilder();
            sb.append("---\n");
            sb.append("template: blog-post\n");
            sb.append("templateKey: blog-post\n");
            sb.append("slug: /").append(directory).append("\n");
            sb.append("featuredImage: image/post-image.png\n");
            sb.append("image: image/post-image.png\n");
            sb.append("author: ").append(githubId).append("\n");
            sb.append("featured: false\n");
            sb.append("featuredpost: false\n");
            sb.append(content.substring(index+4));

            content=sb.toString();
        }

        String encodedContent = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));

        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", encodedContent));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename().replace(' ','_'), "100644", "blob", encodedContent));
            }
        }
        commonService.multiFileCommit(accessToken, githubId, treeRequestList, commit);
    }

    @Override
    public void updateDetailPost(String encodedAccessToken, String githubId, int blogType, String path, String content, List<MultipartFile> files, List<ImageResponse> images) throws Exception {
        String accessToken = base64Converter.decryptAES256(encodedAccessToken);
        String commit = "modify: 게시글 수정";

        List<TreeRequest> treeRequestList = new ArrayList<>();

        if (images != null && !images.isEmpty()) {
            for (ImageResponse image : images) {
                String imageName = image.getName().replace(' ','_');
                if (content.contains(image.getUrl())) {
                    content = content.replace(image.getUrl(), "./" + imageName);
                } else {
                    treeRequestList.add(new TreeRequest(path + "/" + imageName, "100644", "blob", null));
                }
            }
        }

        if(blogType==1){
            int index = content.indexOf("-");
            StringBuilder sb = new StringBuilder();
            sb.append("---\n");
            sb.append("template: blog-post\n");
            sb.append("templateKey: blog-post\n");
            sb.append("slug: /").append(path.substring(path.lastIndexOf("/")+1)).append("\n");
            sb.append("featuredImage: image/post-image.png\n");
            sb.append("image: image/post-image.png\n");
            sb.append("author: ").append(githubId).append("\n");
            sb.append("featured: false\n");
            sb.append("featuredpost: false\n");
            sb.append(content.substring(index+4));

            content=sb.toString();
        }

        content = commonService.makeBlob(accessToken, githubId, base64Converter.encode(content));
        treeRequestList.add(new TreeRequest(path + "/index.md", "100644", "blob", content));

        if (files != null && !files.isEmpty()) {
            for (int i = 0; i < files.size(); i++) {
                MultipartFile file = files.get(i);
                String image = new String(Base64.encodeBase64(file.getBytes()));
                String encodedContent = commonService.makeBlob(accessToken, githubId, image);
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename().replace(' ','_'), "100644", "blob", encodedContent));
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
                String imageName = image.getName().replace(' ','_');
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
                treeRequestList.add(new TreeRequest(path + "/" + file.getOriginalFilename().replace(' ','_'), "100644", "blob", encodedContent));
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

        int index = content.indexOf("date");
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
        UploadTempImageRequest uploadTempImageRequest = new UploadTempImageRequest("upload tempImage", "deploy", image);

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
            content = content.replace(image.getUrl(), "./" + image.getName().replace(' ','_'));
        }
        return content;
    }

    @Override
    public String replaceImagePathWithUrl(String content, List<ImageResponse> images) {
        for (ImageResponse image : images) {
            content = content.replace("./" + image.getName().replace(' ','_'), image.getUrl());
        }
        return content;
    }
}
