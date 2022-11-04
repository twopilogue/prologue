package com.b208.prologue.api.response.github;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepositoryPublicKeyResponse {

    @ApiModelProperty(name = "key_id")
    String key_id;
    @ApiModelProperty(name = "key")
    String key;
}