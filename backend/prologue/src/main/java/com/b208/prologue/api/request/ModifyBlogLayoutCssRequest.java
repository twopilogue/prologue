package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@Data
@ApiModel("ModifyBlogLayoutCssRequest")
public class ModifyBlogLayoutCssRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "수정한 레이아웃 세부 설정 내용", example = "레이아웃", required = true)
    String css;

    @NotNull
    @ApiModelProperty(name = "수정한 로고 텍스트", example = "로고텍스트", required = true)
    String logoText;

    @NotNull
    @ApiModelProperty(name = "수정한 타이틀 텍스트", example = "타이틀텍스트", required = true)
    String titleText;

    @NotNull
    @ApiModelProperty(name = "타이틀 색상 선택 여부", example = "true", required = true)
    boolean titleColor;

}
