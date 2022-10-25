package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AuthUriResponse")
public class AuthUriResponse extends BaseResponseBody {

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    String uri;

    public static AuthUriResponse of(String uri, Integer statusCode, String message) {
        AuthUriResponse res = new AuthUriResponse();
        res.setUri(uri);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
