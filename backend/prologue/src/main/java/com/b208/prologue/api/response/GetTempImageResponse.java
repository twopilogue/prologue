package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetTempImageResponse")
public class GetTempImageResponse extends BaseResponseBody {

    @ApiModelProperty(name = "임시 이미지 url")
    String tempImageUrl;

    public static GetTempImageResponse of(String tempImageUrl, Integer statusCode, String message){
        GetTempImageResponse res = new GetTempImageResponse();
        res.setTempImageUrl(tempImageUrl);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
