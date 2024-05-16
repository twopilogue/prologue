package com.b208.prologue.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TempPostsResponse {
    Long tempPostId;
    String title;
    String summary;
    LocalDateTime updatedAt;
}
