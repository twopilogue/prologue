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
@ApiModel("ModifyDetailPostRequest")
public class ModifyDetailPostRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotBlank
    @ApiModelProperty(name = "게시글이 저장된 폴더", example = "1666319753", required = true)
    String directory;

    @NotNull
    @ApiModelProperty(name = "게시글 내용", example = "md파일 내용...", required = true)
    String content;

    @ApiModelProperty(name = "게시글에서 삭제할 이미지", example = "이미지 파일명")
    List<String> deletedFiles;

}
