package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetBlogSettingResponse")
public class GetBlogSettingResponse extends BaseResponseBody {

    @ApiModelProperty(name = "설정 부분 글")
    String setting;

    @ApiModelProperty(name = "프로필 이미지")
    String profileImg;


    public static GetBlogSettingResponse of(String setting, String profileImg, Integer statusCode, String message) {
        GetBlogSettingResponse res = new GetBlogSettingResponse();
        res.setSetting(setting);
        res.setProfileImg(profileImg);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
