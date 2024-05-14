package com.b208.prologue.api.service;

import java.util.Map;

public interface TempPostService {
    Map<String, Object> getTempPost(final String githubId, final Long tempPostId);
}
