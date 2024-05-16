package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@ApiModel("GetTempPostsResponse")
public class GetTempPostsResponse extends BaseResponseBody {

    @ApiModelProperty(name = "임시 저장 게시글 목록")
    List<TempPostsResponse> data;

    public static GetTempPostsResponse of(List<TempPostsResponse> data, Integer statusCode, String message) {
        GetTempPostsResponse res = new GetTempPostsResponse();
        res.setData(data);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
