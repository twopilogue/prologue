package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("RepositorySizeResponse")
public class RepositorySizeResponse extends BaseResponseBody {

    @ApiModelProperty(name = "레포지토리 사용량")
    Double size;

    public static RepositorySizeResponse of(Double size, Integer statusCode, String message){
        RepositorySizeResponse res = new RepositorySizeResponse();
        res.setSize(size);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
