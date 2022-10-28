package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor
@ToString
@Getter
public class PostGetListResponse {
    @JsonProperty("name")
    String name;

    @JsonProperty("path")
    String path;

}

