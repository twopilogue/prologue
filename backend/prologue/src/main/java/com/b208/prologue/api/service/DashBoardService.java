package com.b208.prologue.api.service;

import java.util.List;

public interface DashBoardService {
    List<String> getList(String accessToken, String gitId);
    int getListCount(String accessToken, String gitId);
}
