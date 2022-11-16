package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetBuildStateResponse")
public class GetBuildStateResponse extends BaseResponseBody {

    @ApiModelProperty(name = "빌드 상태")
    String buildState;

    public static GetBuildStateResponse of(String buildState, Integer statusCode, String message){
        GetBuildStateResponse res = new GetBuildStateResponse();
        res.setBuildState(buildState);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
