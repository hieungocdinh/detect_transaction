package com.hieudinh.detecttransaction.service;

public interface CronConfigService {
    String getCron();
    void updateCron(String cron);
}
