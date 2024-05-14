package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@ApiModel("GetTempPostResponse")
public class GetTempPostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "임시 저장 게시글 관련 정보")
    Map<String, Object> result;

    public static GetTempPostResponse of(Map<String, Object> result, Integer statusCode, String message){
        GetTempPostResponse res = new GetTempPostResponse();
        res.setResult(result);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
