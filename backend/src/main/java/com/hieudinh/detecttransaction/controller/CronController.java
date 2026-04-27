package com.hieudinh.detecttransaction.controller;

import com.hieudinh.detecttransaction.service.CronConfigService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/crons")
@AllArgsConstructor
public class CronController {
    private final CronConfigService cronConfigService;

    @PutMapping("")
    public void updateCronjobSchedule(@RequestParam String cron){
        cronConfigService.updateCron(cron);
    }
}
