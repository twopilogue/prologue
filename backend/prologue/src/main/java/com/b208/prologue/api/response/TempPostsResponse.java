package com.b208.prologue.api.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TempPostsResponse {
    Long tempPostId;
    String title;
    String summary;
    String updatedAt;
}
