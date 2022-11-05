package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Data
@ApiModel("ModifyBlogSettingRequest")
public class ModifyBlogSettingRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "닉네임", example = "닉네임", required = true)
    String nickName;

    @NotNull
    @ApiModelProperty(name = "자기소개", example = "자기소개", required = true)
    String summary;

    @NotNull
    @ApiModelProperty(name = "기술스택 목록", example = "기술스택 목록", required = true)
    List<String> techStack;

    @NotNull
    @ApiModelProperty(name = "블로그명", example = "블로그명", required = true)
    String blogName;

    @NotNull
    @ApiModelProperty(name = "블로그소개", example = "블로그소개", required = true)
    String description;

    @NotNull
    @ApiModelProperty(name = "소셜링크", example = "소셜링크", required = true)
    List<String> social;
}
