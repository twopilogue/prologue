package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("PostListResponse")
public class PostListResponse extends BaseResponseBody {

    @ApiModelProperty(name = "게시글,디렉토리 리스트")
    Map<String, List<String>> result;

    public static PostListResponse of(Map<String, List<String>> result,Integer statusCode, String message){
        PostListResponse res = new PostListResponse();
        res.setResult(result);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
