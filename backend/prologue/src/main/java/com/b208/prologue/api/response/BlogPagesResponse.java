package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import org.json.simple.JSONObject;

@Getter
@Setter
@ApiModel("BlogPagesResponse")
public class BlogPagesResponse extends BaseResponseBody {

    @ApiModelProperty(name = "블로그 페이지 목록")
    BlogPage[] pages;

    public static BlogPagesResponse of(JSONObject[] pages, Integer statusCode, String message) {
        BlogPage[] tmp = new BlogPage[pages.length];
        for(int i=0; i<pages.length; i++){
            tmp[i] = new BlogPage(pages[i].get("label").toString(),pages[i].get("url").equals("/blog"));
        }
        BlogPagesResponse res = new BlogPagesResponse();
        res.setPages(tmp);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

    @Data
    @AllArgsConstructor
    static class BlogPage{
        String label;
        boolean isPosts;
    }
}

