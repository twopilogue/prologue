package com.b208.prologue.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import org.springframework.stereotype.Service;

@Getter
@Service
@ApiModel("WriteDetailPostRequest")
public class WriteDetailPostRequest {

    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...")
    String accessToken;

    @ApiModelProperty(name = "깃허브 아이디", example = "test1234")
    String githubId;

    @ApiModelProperty(name = "게시글 내용", example = "md파일 내용...")
    String content;

}
