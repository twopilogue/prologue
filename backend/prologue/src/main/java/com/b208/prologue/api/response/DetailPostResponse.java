package com.b208.prologue.api.response;

import com.b208.prologue.api.response.github.GetRepoContentResponse;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("DetailPostResponse")
public class DetailPostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "게시글 수정 시 필요한 코드")
    String sha;

    @ApiModelProperty(name = "게시글 내용")
    String content;

    public static DetailPostResponse of(GetRepoContentResponse getRepoContentResponse, Integer statusCode, String message) {
        DetailPostResponse res = new DetailPostResponse();
        res.setSha(getRepoContentResponse.getSha());
        res.setContent(getRepoContentResponse.getContent());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

