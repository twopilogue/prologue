package com.b208.prologue.api.request;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class PostRequest {
    String title;
    String date;
    String description;
    String category;
    String[] tag;
    String directory;
    String imgUrl;
}
