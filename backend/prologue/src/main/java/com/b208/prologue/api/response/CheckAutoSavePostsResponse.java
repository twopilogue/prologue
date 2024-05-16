package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CheckAutoSavePostsResponse")
public class CheckAutoSavePostsResponse extends BaseResponseBody {

    @ApiModelProperty(name = "자동 저장 게시글 존재 여부")
    boolean exist;

    @ApiModelProperty(name = "자동 저장 시간")
    String updatedAt;

    public static CheckAutoSavePostsResponse of(boolean exist, String updatedAt, Integer statusCode, String message) {
        CheckAutoSavePostsResponse res = new CheckAutoSavePostsResponse();
        res.setExist(exist);
        res.setUpdatedAt(updatedAt);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
