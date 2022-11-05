package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BlogPagesResponse")
public class BlogPagesResponse extends BaseResponseBody {

    @ApiModelProperty(name = "블로그 페이지 목록")
    String[] pages;

    public static BlogPagesResponse of(String[] pages, Integer statusCode, String message) {
        BlogPagesResponse res = new BlogPagesResponse();
        res.setPages(pages);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

