package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.Map;

@Getter
@Setter
@ApiModel("GetBlogSettingResponse")
public class GetBlogSettingResponse extends BaseResponseBody {

    @ApiModelProperty(name = "name")
    String nickName;

    @ApiModelProperty(name = "summary")
    String summary;

    @ApiModelProperty(name = "title")
    String title;

    @ApiModelProperty(name = "description")
    String description;

    @ApiModelProperty(name = "social")
    Map<String, String> social;

    @ApiModelProperty(name = "profile image")
    String profileImg;


    public static GetBlogSettingResponse of(GetBlogSettingResponse getBlogSettingResponse, Integer statusCode, String message) {
        GetBlogSettingResponse res = new GetBlogSettingResponse();
        res.setNickName(getBlogSettingResponse.getNickName());
        res.setSummary(getBlogSettingResponse.getSummary());
        res.setTitle(getBlogSettingResponse.getTitle());
        res.setDescription(getBlogSettingResponse.getDescription());
        res.setSocial(getBlogSettingResponse.getSocial());
        res.setProfileImg(getBlogSettingResponse.getProfileImg());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
