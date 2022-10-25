package com.b208.prologue.api.response.github;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;

@Data
@Getter
@AllArgsConstructor
@NoArgsConstructor
public class AuthAccessTokenRespense {
    @JsonProperty("access_token")
    String accessToken;
    @JsonProperty("scope")
    String scope;
    @JsonProperty("token_type")
    String tokenType;
}
