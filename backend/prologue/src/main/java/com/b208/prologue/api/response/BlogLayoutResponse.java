package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("BlogLayoutResponse")
public class BlogLayoutResponse extends BaseResponseBody {

    @ApiModelProperty(name = "레이아웃 설정 내용")
    String layout;

    public static BlogLayoutResponse of(String layout, Integer statusCode, String message) {
        BlogLayoutResponse res = new BlogLayoutResponse();
        res.setLayout(layout);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

