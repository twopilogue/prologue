package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;
import java.util.Map;

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
    @ApiModelProperty(name = "수정된 내용", example = "수정된 내용", required = true)
    String modified;

    @NotNull
    @ApiModelProperty(name = "프로필 이미지 경로", example = "프로필 이미지 경로", required = true)
    String imgPath;

}
