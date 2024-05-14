package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CountTempPostsResponse")
public class CountTempPostsResponse extends BaseResponseBody {

    @ApiModelProperty(name = "임시 저장 게시글 개수")
    int count;

    public static CountTempPostsResponse of(int count, Integer statusCode, String message) {
        CountTempPostsResponse res = new CountTempPostsResponse();
        res.setCount(count);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
