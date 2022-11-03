package com.b208.prologue.api.service;

import java.util.List;

public interface CommonService {

    void multiFileCommit(String accessToken, String githubId, List treeRequestList, String commitMsg);
}
