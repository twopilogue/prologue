package com.b208.prologue.api.response.github;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetBlogLayoutCss {
    String css;
    String logoText;
    String titleText;
    boolean titleColor;
}
