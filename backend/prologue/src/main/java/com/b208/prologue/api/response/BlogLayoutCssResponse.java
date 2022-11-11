package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BlogLayoutCssResponse")
public class BlogLayoutCssResponse extends BaseResponseBody {

    @ApiModelProperty(name = "레이아웃 세부 설정 내용")
    String css;

    public static BlogLayoutCssResponse of(String css, Integer statusCode, String message) {
        BlogLayoutCssResponse res = new BlogLayoutCssResponse();
        res.setCss(css);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

