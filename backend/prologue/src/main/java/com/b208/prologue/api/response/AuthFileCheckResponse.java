package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("AuthFileCheckResponse")
public class AuthFileCheckResponse extends BaseResponseBody {

    @ApiModelProperty(name = "서비스 인증 파일 조회")
    boolean checkAuthFile = false;

    @ApiModelProperty(name = "블로그 타입")
    Integer blogType = null;

    @ApiModelProperty(name = "블로그 타입")
    String template;

    public static AuthFileCheckResponse of(boolean checkAuthFile, Integer blogType, String template, Integer statusCode, String message) {
        AuthFileCheckResponse res = new AuthFileCheckResponse();
        res.setCheckAuthFile(checkAuthFile);
        res.setBlogType(blogType);
        res.setTemplate(template);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
