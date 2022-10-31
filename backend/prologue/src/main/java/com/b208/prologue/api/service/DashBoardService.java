package com.b208.prologue.api.service;

import java.util.List;
import java.util.Map;

public interface DashBoardService {
    Map<String, List<String>> getList(String accessToken, String gitId);
}
