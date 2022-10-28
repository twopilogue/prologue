package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("CheckRepositoryResponse")
public class CheckRepositoryResponse extends BaseResponseBody {

    @ApiModelProperty(name = "GitHub 연동을 위한 uri")
    boolean checkRepository;

    public static CheckRepositoryResponse of(boolean checkRepository, Integer statusCode, String message) {
        CheckRepositoryResponse res = new CheckRepositoryResponse();
        res.setCheckRepository(checkRepository);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
