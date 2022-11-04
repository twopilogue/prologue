package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("GetBlogSettingResponse")
public class GetBlogSettingResponse extends BaseResponseBody {

    @ApiModelProperty(name = "닉네임")
    String nickName;

    @ApiModelProperty(name = "프로필 이미지")
    String profileImg;

    @ApiModelProperty(name = "내 소개")
    String summary;

    @ApiModelProperty(name = "블로그명")
    String blogName;

    @ApiModelProperty(name = "닉네임")
    String description;

    @ApiModelProperty(name = "소셜/링크")
    Map<String, String> social;

    public static GetBlogSettingResponse of(String nickName, String profileImg, String summary, String blogName, String description, Map<String, String> social, Integer statusCode, String message) {
        GetBlogSettingResponse res = new GetBlogSettingResponse();
        res.setNickName(nickName);
        res.setProfileImg(profileImg);
        res.setSummary(summary);
        res.setBlogName(blogName);
        res.setDescription(description);
        res.setSocial(social);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
