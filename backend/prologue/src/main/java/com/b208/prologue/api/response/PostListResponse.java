package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("PostListResponse")
public class PostListResponse extends BaseResponseBody {

    @ApiModelProperty(name = "게시글 리스트")
    List<String> contents;
}
