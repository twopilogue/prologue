package com.b208.prologue.api.request;


import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.io.File;

@Getter
@Data
@ApiModel("TempImageUploadRequest")
public class TempImageUploadRequest {

    @NotBlank
    @ApiModelProperty(name = "엑세스 토큰", example = "Qdsfhdf...", required = true)
    String accessToken;

    @NotBlank
    @ApiModelProperty(name = "깃허브 아이디", example = "test1234", required = true)
    String githubId;

}
