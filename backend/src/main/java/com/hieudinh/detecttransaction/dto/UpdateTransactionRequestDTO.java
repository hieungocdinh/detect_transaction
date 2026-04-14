package com.hieudinh.detecttransaction.dto;

import com.hieudinh.detecttransaction.enums.TransactionCategory;
import jakarta.validation.constraints.Min;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class UpdateTransactionRequestDTO {
    private String title;
    @Min(value = 0, message = "Amount must be a positive number")
    private Float amount;
    private TransactionCategory category;
    private LocalDate date;
}
