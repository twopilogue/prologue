package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetTotalCountResponse")
public class GetTotalCountResponse extends BaseResponseBody {

    @ApiModelProperty(name = "디렉토리별 이미지")
    Integer total;

    public static GetTotalCountResponse of(Integer total, Integer statusCode, String message){
        GetTotalCountResponse res = new GetTotalCountResponse();
        res.setTotal(total);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
