package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class AuthAccessTokenRequest {
    String client_id;
    String client_secret;
    String code;
}
