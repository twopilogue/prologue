package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("SaveTempPostResponse")
public class SaveTempPostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "게시글 임시 저장 ID")
    Long tempPostId;

    public static SaveTempPostResponse of(Long tempPostId, Integer statusCode, String message){
        SaveTempPostResponse res = new SaveTempPostResponse();
        res.setTempPostId(tempPostId);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
