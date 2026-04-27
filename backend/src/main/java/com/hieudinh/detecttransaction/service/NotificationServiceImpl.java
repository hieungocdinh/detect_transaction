package com.hieudinh.detecttransaction.service;

import org.springframework.stereotype.Service;

@Service
public class NotificationServiceImpl implements NotificationService{
    public void sendNotification(String message){
        System.out.printf("Notify: %s \n", message);
    }
}
