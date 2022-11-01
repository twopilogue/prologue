package com.b208.prologue.api.response.github;

import com.b208.prologue.api.response.BaseResponseBody;
import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class RepositoryListResponse extends BaseResponseBody {

    @JsonProperty("name")
    String name;
}
