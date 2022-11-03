package com.b208.prologue.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@Data
@ApiModel("ModifyDetailPostRequest")
public class ModifyDetailPostRequest {

    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @ApiModelProperty(name = "게시글이 저장된 폴더", example = "1666319753", required = true)
    String directory;

    @ApiModelProperty(name = "게시글 내용", example = "md파일 내용...", required = true)
    String content;

    @ApiModelProperty(name = "sha", example = "95b966ae1c166bd92f8ae7d1c313e738c731dfc3", required = true)
    String sha;

    @ApiModelProperty(name = "게시글에 넣는 이미지", example = "이미지 파일")
    List<MultipartFile> files;

}
