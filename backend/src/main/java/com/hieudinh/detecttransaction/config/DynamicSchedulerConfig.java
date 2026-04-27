package com.hieudinh.detecttransaction.config;

import com.hieudinh.detecttransaction.scheduler.NotifyScheduler;
import com.hieudinh.detecttransaction.service.CronConfigService;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.SchedulingConfigurer;
import org.springframework.scheduling.config.ScheduledTaskRegistrar;
import org.springframework.scheduling.support.CronTrigger;

import java.util.Date;

@Configuration
@EnableScheduling
@AllArgsConstructor
public class DynamicSchedulerConfig implements SchedulingConfigurer {
    private final NotifyScheduler notifyScheduler;
    private final CronConfigService cronConfigService;

    @Override
    public void configureTasks(ScheduledTaskRegistrar registrar) {
        registrar.addTriggerTask(
                notifyScheduler::runJob,
                triggerContext -> {
                    String cron = cronConfigService.getCron();
                    Date next = new CronTrigger(cron).nextExecutionTime(triggerContext);
                    return next.toInstant();
                }
        );
    }
}
