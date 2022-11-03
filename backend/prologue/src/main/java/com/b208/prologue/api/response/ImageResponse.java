package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ImageResponse {

    @ApiModelProperty(name = "이미지명")
    String name;
    @ApiModelProperty(name = "이미지 url")
    String url;
}
