package com.b208.prologue.api.request.request;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class AuthAccessTokenRequest {
    String client_id;
    String client_secret;
    String code;

    @Override
    public String toString() {
        return "{" +
                "\"client_id\":\"" + client_id +
                "\", \"client_secret\":\"" + client_secret +
                "\", \"code\":\"" + code + "\"}";
    }
}
