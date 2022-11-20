package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("GetCheckUpdateResponse")
public class GetCheckUpdateResponse extends BaseResponseBody {

    @ApiModelProperty(name = "변경 사항 여부")
    boolean checkUpdate;

    public static GetCheckUpdateResponse of(boolean checkUpdate, Integer statusCode, String message){
        GetCheckUpdateResponse res = new GetCheckUpdateResponse();
        res.setCheckUpdate(checkUpdate);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
