package com.b208.prologue.api.response;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BlogCategoryResponse")
public class BlogCategoryResponse extends BaseResponseBody {

    @ApiModelProperty(name = "블로그 카테고리 목록")
    String[] category;

    public static BlogCategoryResponse of(String[] category, Integer statusCode, String message) {
        BlogCategoryResponse res = new BlogCategoryResponse();
        res.setCategory(category);
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

