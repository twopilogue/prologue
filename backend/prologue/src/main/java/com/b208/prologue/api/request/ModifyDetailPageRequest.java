package com.b208.prologue.api.request;

import com.b208.prologue.api.response.ImageResponse;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Data
@ApiModel("ModifyDetailPageRequest")
public class ModifyDetailPageRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotBlank
    @ApiModelProperty(name = "페이지 이름", example = "About", required = true)
    String pageName;

    @NotNull
    @ApiModelProperty(name = "페이지 글 내용", example = "md파일 내용...", required = true)
    String content;

    @ApiModelProperty(name = "이미지 url, 상대경로", example = "이미지 url, 상대경로")
    List<ImageResponse> images;

}