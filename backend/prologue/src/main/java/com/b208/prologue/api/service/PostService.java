package com.b208.prologue.api.service;

import java.util.List;

public interface PostService {

    List<String> getList(String accessToken, String gitId);
}
