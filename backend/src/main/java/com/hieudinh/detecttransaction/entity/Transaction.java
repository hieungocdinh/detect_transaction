package com.hieudinh.detecttransaction.entity;

import com.hieudinh.detecttransaction.enums.TransactionCategory;
import jakarta.persistence.Entity;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@Entity
public class Transaction extends BaseEntity{
    private String title = "title unknown";
    private Float amount = 0.0F;
    private TransactionCategory category = TransactionCategory.MUST_HAVE;
    private LocalDate date = LocalDate.now();
}
