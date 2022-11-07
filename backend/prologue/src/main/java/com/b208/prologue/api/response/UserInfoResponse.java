package com.b208.prologue.api.response;

import com.b208.prologue.api.response.github.AuthUserInfoResponse;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("UserInfoResponse")
public class UserInfoResponse extends BaseResponseBody{

    @ApiModelProperty(name = "GitHub accessToken")
    String accessToken;

    @ApiModelProperty(name = "GitHub 아이디")
    String githubId;

    @ApiModelProperty(name = "GitHub 사용자 프로필 사진")
    String githubImage;

    public static UserInfoResponse of(String token, AuthUserInfoResponse userInfo, Integer statusCode, String message) {
        UserInfoResponse res = new UserInfoResponse();
        res.setAccessToken(token);
        res.setGithubId(userInfo.getLogin());
        res.setGithubImage(userInfo.getAvatarUrl());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }

}
