package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateCommitRequest {
    String tree;
    String message;
    String parents[];
}
