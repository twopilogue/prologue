package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class GetRepoContentResponse {

    @JsonProperty("sha")
    String sha;

    @JsonProperty("content")
    String content;

    @JsonProperty("path")
    String path;

}
