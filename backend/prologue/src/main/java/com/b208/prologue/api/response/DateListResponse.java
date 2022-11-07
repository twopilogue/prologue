package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;
import org.springframework.http.ResponseEntity;

import java.util.List;

@Getter
@Setter
@ApiModel("DateListResponse")
public class DateListResponse extends BaseResponseBody{

    @ApiModelProperty(name = "날짜 목록")
    List<String> dateList;

    public static DateListResponse of(List<String> dateList, Integer statusCode, String message){
        DateListResponse res = new DateListResponse();
        res.setDateList(dateList);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
