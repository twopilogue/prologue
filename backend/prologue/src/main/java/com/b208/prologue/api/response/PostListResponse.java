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

    @ApiModelProperty(name = "제목, 날짜, 컨텐츠, 디렉토리 리스트")
    Map<String, Object> result;

    public static PostListResponse of(Map<String, Object> result, Integer statusCode, String message){
        PostListResponse res = new PostListResponse();
        res.setResult(result);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
