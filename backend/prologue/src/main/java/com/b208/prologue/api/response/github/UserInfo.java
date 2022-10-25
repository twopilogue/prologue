package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UserInfo {
    @JsonProperty("login")
    private String githubId;
    @JsonProperty("avatar_url")
    private String githubImage;
    @JsonProperty("name")
    private String githubName;
}