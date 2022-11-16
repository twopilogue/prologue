package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Data
@ApiModel("ModifyBlogLayoutRequest")
public class ModifyBlogLayoutRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "수정한 레이아웃 설정 내용", example = "레이아웃", required = true)
    String layout;

    @NotNull
    @ApiModelProperty(name = "json파일 레이아웃 설정 내용", example = "json형식 내용", required = true)
    String layoutJson;

}
