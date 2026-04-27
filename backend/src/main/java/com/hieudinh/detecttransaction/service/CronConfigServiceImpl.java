package com.hieudinh.detecttransaction.service;

import org.springframework.stereotype.Service;

@Service
public class CronConfigServiceImpl implements CronConfigService {
    private String cron = "0/10 * * * * *";

    public String getCron() {
        return cron;
    }

    public void updateCron(String cron) {
        this.cron = cron;
    }
}
