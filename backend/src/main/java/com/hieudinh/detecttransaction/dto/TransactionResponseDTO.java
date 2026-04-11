package com.hieudinh.detecttransaction.dto;

import com.hieudinh.detecttransaction.entity.Transaction;
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

    public TransactionResponseDTO(Transaction entity){
        this.id = entity.getId();
        this.title = entity.getTitle();
        this.amount = entity.getAmount();
        this.category = entity.getCategory();
        this.date = entity.getDate();
        this.createdAt = entity.getCreatedAt();
        this.updatedAt = entity.getUpdatedAt();
    }
}
