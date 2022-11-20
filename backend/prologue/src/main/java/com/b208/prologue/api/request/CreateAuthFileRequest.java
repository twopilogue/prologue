package com.b208.prologue.api.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Getter
@Data
@ApiModel("ModifyDetailPostRequest")
public class CreateAuthFileRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

    @NotNull
    @ApiModelProperty(name = "블로그 타입", example = "0", required = true)
    int blogType;

    @NotNull
    @ApiModelProperty(name = "블로그 템플릿", example = "prologue-template", required = true)
    String template;
}
