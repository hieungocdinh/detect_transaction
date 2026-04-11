package com.hieudinh.detecttransaction.dto;

import com.hieudinh.detecttransaction.enums.TransactionCategory;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTransactionRequestDTO {
    private String title;
    private Float amount;
    private TransactionCategory category;
    private LocalDate date;
}
