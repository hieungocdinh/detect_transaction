package com.hieudinh.detecttransaction.dto;

import com.hieudinh.detecttransaction.enums.TransactionCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;
import java.time.LocalDate;
import java.util.UUID;

@Getter
@Setter
public class TransactionResponseDTO {
    private UUID id;
    private String title;
    private Float amount;
    private TransactionCategory category;
    private LocalDate date;
    private Instant createdAt;
    private Instant updatedAt;
}
