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
@ApiModel("GetTempPostResponse")
public class GetTempPostResponse extends BaseResponseBody {

    @ApiModelProperty(name = "임시 저장 게시글 아이디")
    Long tempPostId;

    @ApiModelProperty(name = "임시 저장 게시글 제목")
    String title;

    @ApiModelProperty(name = "임시 저장 게시글 설명")
    String description;

    @ApiModelProperty(name = "임시 저장 게시글 카테고리")
    String category;

    @ApiModelProperty(name = "임시 저장 게시글 태그")
    List<String> tags;

    @ApiModelProperty(name = "임시 저장 게시글 내용")
    String content;

    @ApiModelProperty(name = "게시글 임시 저장 생성 시간")
    LocalDateTime createdAt;

    @ApiModelProperty(name = "게시글 임시 저장 변경 시간")
    LocalDateTime updatedAt;

    public static GetTempPostResponse of(Map<String, Object> result, Integer statusCode, String message) {
        GetTempPostResponse res = new GetTempPostResponse();
        res.setTempPostId((Long) result.get("tempPostId"));
        res.setTitle((String) result.get("title"));
        res.setDescription((String) result.get("description"));
        res.setCategory((String) result.get("category"));
        res.setTags((List<String>) result.get("tags"));
        res.setContent((String) result.get("content"));
        res.setCreatedAt((LocalDateTime) result.get("createdAt"));
        res.setUpdatedAt((LocalDateTime) result.get("updatedAt"));
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}
