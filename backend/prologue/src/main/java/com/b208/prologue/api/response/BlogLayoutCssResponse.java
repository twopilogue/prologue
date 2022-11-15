package com.b208.prologue.api.response;

import com.b208.prologue.api.response.github.GetBlogLayoutCss;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@ApiModel("BlogLayoutCssResponse")
public class BlogLayoutCssResponse extends BaseResponseBody {

    @ApiModelProperty(name = "레이아웃 세부 설정 내용")
    String css;

    @ApiModelProperty(name = "로고 텍스트")
    String logoText;

    public static BlogLayoutCssResponse of(GetBlogLayoutCss getBlogLayoutCss, Integer statusCode, String message) {
        BlogLayoutCssResponse res = new BlogLayoutCssResponse();
        res.setCss(getBlogLayoutCss.getCss());
        res.setLogoText(getBlogLayoutCss.getLogoText());
        res.setStatusCode(statusCode);
        res.setMessage(message);
        return res;
    }
}

