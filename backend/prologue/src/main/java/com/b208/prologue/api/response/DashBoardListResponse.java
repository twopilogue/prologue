package com.b208.prologue.api.response;

import com.b208.prologue.api.request.DashBoardPostRequest;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("DashBoardListResponse")
public class DashBoardListResponse extends BaseResponseBody{

    @ApiModelProperty(name = "제목, 날짜, 디렉토리 리스트")
    List<DashBoardPostRequest> currentPosts;

    public static DashBoardListResponse of(List<DashBoardPostRequest> result, Integer statusCode, String message ) {
        DashBoardListResponse res = new DashBoardListResponse();
        res.setCurrentPosts(result);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
