package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("DetailPostResponse")
public class DetailPostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "게시글 내용")
    String content;

    @ApiModelProperty(name = "게시글 이미지 url")
    List<ImageResponse> images;

    public static DetailPostResponse of(String content, List<ImageResponse> images, Integer statusCode, String message) {
        DetailPostResponse res = new DetailPostResponse();
        res.setContent(content);
        res.setImages(images);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

