package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RepositoryPublicKeyResponse {

    @JsonProperty("key_id")
    String keyId;
    @JsonProperty("key")
    String key;
}