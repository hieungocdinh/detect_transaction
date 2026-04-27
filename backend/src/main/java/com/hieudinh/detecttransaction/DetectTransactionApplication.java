package com.hieudinh.detecttransaction;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
public class DetectTransactionApplication {

    public static void main(String[] args) {
        SpringApplication.run(DetectTransactionApplication.class, args);
    }

}
