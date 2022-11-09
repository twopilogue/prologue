package com.b208.prologue.api.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PostRequest {
    String title;
    String date;
    String content;
    String directory;
    String imgUrl;
}
