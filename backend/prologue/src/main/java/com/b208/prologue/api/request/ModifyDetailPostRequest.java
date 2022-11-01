package com.b208.prologue.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
@ApiModel("ModifyDetailPostRequest")
public class ModifyDetailPostRequest {

    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...")
    String accessToken;

    @ApiModelProperty(name = "깃허브 아이디", example = "test1234")
    String githubId;

    @ApiModelProperty(name = "게시글이 저장된 폴더", example = "1666319753")
    String directory;

    @ApiModelProperty(name = "게시글 내용", example = "md파일 내용...")
    String content;

    @ApiModelProperty(name = "sha", example = "95b966ae1c166bd92f8ae7d1c313e738c731dfc3")
    String sha;

}
