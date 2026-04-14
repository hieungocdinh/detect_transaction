package com.hieudinh.detecttransaction.dto;

import com.hieudinh.detecttransaction.enums.TransactionCategory;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
public class CreateTransactionRequestDTO {
    @NotBlank(message = "Title must not be blank")
    private String title;
    @NotNull(message = "Amount must not be null")
    @Min(value = 0, message = "Amount must be a positive number")
    private Float amount;
    @NotNull(message = "Category must not be null")
    private TransactionCategory category;
    @NotNull(message = "Date must not be null")
    private LocalDate date;
}
