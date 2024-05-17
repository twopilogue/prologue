package com.b208.prologue.api.service;

import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class SchedulerService {

    private final TempPostService tempPostService;
    private final AutoSavePostService autoSavePostService;

    @Transactional
    @Scheduled(cron = "0 30 3 * * *", zone = "Asia/Seoul")
    public void deleteInvalidDateTempPost() {
        tempPostService.deleteInvalidDateTempPost();
    }

    @Transactional
    @Scheduled(cron = "0 0 5 * * *", zone = "Asia/Seoul")
    public void deleteInvalidDateAutoSavePost() {
        autoSavePostService.deleteInvalidDateAutoSavePost();
    }
}
