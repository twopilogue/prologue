package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@Setter
@ApiModel("GetAutoSavePostResponse")
public class GetAutoSavePostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "자동 저장 게시글 제목")
    String title;

    @ApiModelProperty(name = "자동 저장 게시글 설명")
    String description;

    @ApiModelProperty(name = "자동 저장 게시글 카테고리")
    String category;

    @ApiModelProperty(name = "자동 저장 게시글 태그")
    List<String> tags;

    @ApiModelProperty(name = "자동 저장 게시글 내용")
    String content;

    @ApiModelProperty(name = "게시글 자동 저장 시간")
    LocalDateTime updatedAt;

    public static GetAutoSavePostResponse of(Map<String, Object> result, Integer statusCode, String message) {
        GetAutoSavePostResponse res = new GetAutoSavePostResponse();
        res.setTitle((String) result.get("title"));
        res.setDescription((String) result.get("description"));
        res.setCategory((String) result.get("category"));
        res.setTags((List<String>) result.get("tags"));
        res.setContent((String) result.get("content"));
        res.setUpdatedAt((LocalDateTime) result.get("updatedAt"));
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
