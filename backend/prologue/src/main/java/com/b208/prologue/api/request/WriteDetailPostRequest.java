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
@ApiModel("WriteDetailPostRequest")
public class WriteDetailPostRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "블로그테마 타입", example = "0", required = true)
    Integer blogType;

    @NotNull
    @ApiModelProperty(name = "게시글 내용", example = "md파일 내용...", required = true)
    String content;

    @ApiModelProperty(name = "이미지 url, 상대경로", example = "이미지 url, 상대경로")
    List<ImageResponse> images;

}
