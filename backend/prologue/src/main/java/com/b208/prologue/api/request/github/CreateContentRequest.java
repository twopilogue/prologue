package com.b208.prologue.api.request.github;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CreateContentRequest {
    String message;
    String content;
}
