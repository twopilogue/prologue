package com.b208.prologue.api.response;

import com.b208.prologue.api.response.github.UserInfo;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoResponse extends BaseResponseBody{

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    String token;

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    String githubId;

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    String githubName;

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    String githubImage;

    public static UserInfoResponse of(String token, UserInfo userInfo,Integer statusCode, String message) {
        UserInfoResponse res = new UserInfoResponse();
        res.setToken(token);
//        res.setGithubId(userInfo.getGithubId());
//        res.setGithubName(userInfo.getGithubName());
//        res.setGithubImage(userInfo.getGithubImage());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
