package com.b208.prologue.api.response.github;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
public class UserInfo {
    private String login;
    private String avatar_url;
    private String name;
}
