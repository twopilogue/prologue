package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class TreeRequest {

    String path;
    String mode;
    String type;
    String sha;

}