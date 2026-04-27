package com.hieudinh.detecttransaction.scheduler;

import com.hieudinh.detecttransaction.service.NotificationService;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
@AllArgsConstructor
public class NotifyScheduler {
    private final NotificationService notificationService;

    public void runJob(){
        notificationService.sendNotification("Send notify at " + LocalDateTime.now());
    }
}
