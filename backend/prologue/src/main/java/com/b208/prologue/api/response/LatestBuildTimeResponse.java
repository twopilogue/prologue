package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("LatestBuildTimeResponse")
public class LatestBuildTimeResponse extends BaseResponseBody {

    @ApiModelProperty(name = "최근 빌드 시간")
    String latestBuildTime;

    public static LatestBuildTimeResponse of(String latestBuildTime, Integer statusCode, String message) {
        LatestBuildTimeResponse res = new LatestBuildTimeResponse();
        res.setLatestBuildTime(latestBuildTime);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
