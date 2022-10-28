package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("PostCountResponse")
public class PostCountResponse extends BaseResponseBody{

    @ApiModelProperty(name = "게시글 수")
    Integer count;

    public static PostCountResponse of(Integer result, Integer statusCode, String message){
        PostCountResponse res = new PostCountResponse();
        res.setCount(result);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
