package com.hieudinh.detecttransaction.scheduler;

import com.hieudinh.detecttransaction.constant.DateFormatConstants;
import com.hieudinh.detecttransaction.repository.TransactionRepository;
import org.slf4j.LoggerFactory;
import org.slf4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.Instant;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
public class CleanDatabaseScheduler {
    private final Logger log = LoggerFactory.getLogger(CleanDatabaseScheduler.class);
    private final DateTimeFormatter FORMATTER = DateTimeFormatter.ofPattern(DateFormatConstants.DATE_TIME).withZone(ZoneId.systemDefault());
    private final TransactionRepository transactionRepository;
    @Value("${app.soft-delete.ttl-days}")
    private int softDeleteTtlDays;

    public CleanDatabaseScheduler(TransactionRepository transactionRepository) {
        this.transactionRepository = transactionRepository;
    }

    //NOTE: Runs at 00:00:00 on the first day of every month
    @Scheduled(cron = "0 0 0 1 * *")
    public void reportCurrentTime() {
        Instant now = Instant.now();
        log.info("Clean database in : {}", FORMATTER.format(now));
        Instant threshold = now.minus(softDeleteTtlDays, ChronoUnit.DAYS);
        transactionRepository.deleteSoftDeleteTransaction(threshold);
    }
}
