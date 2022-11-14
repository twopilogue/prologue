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
    @ApiModelProperty(name = "수정된 제목", example = "수정된 제목", required = true)
    String title;

    @NotNull
    @ApiModelProperty(name = "수정된 요약", example = "수정된 요약", required = true)
    String summary;

    @NotNull
    @ApiModelProperty(name = "수정된 이름", example = "수정된 이름", required = true)
    String nickName;

    @NotNull
    @ApiModelProperty(name = "수정된 설명", example = "수정된 설명", required = true)
    String description;

    @NotNull
    @ApiModelProperty(name = "소셜", example = "소셜", required = true)
    Map<String, String> social;

}
