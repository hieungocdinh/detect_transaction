package com.hieudinh.detecttransaction.controller;

import com.hieudinh.detecttransaction.common.BaseResponse;
import com.hieudinh.detecttransaction.dto.CreateTransactionRequestDTO;
import com.hieudinh.detecttransaction.dto.TransactionResponseDTO;
import com.hieudinh.detecttransaction.service.TransactionService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/v1/transactions")
@RequiredArgsConstructor
public class TransactionController {
    private final TransactionService transactionService;

    @GetMapping("/{transaction-id}")
    public BaseResponse<TransactionResponseDTO> get(@PathVariable("transaction-id") UUID transactionId){
        return transactionService.getTransaction(transactionId);
    }

    @GetMapping("")
    public BaseResponse<List<TransactionResponseDTO>> getListTransaction(){
        return transactionService.getListTransaction();
    }

    @PostMapping("")
    public BaseResponse<TransactionResponseDTO> create(@RequestBody CreateTransactionRequestDTO request){
        return transactionService.createTransaction(request);
    }

    @DeleteMapping("/{transaction-id}")
    public void delete(@PathVariable UUID transactionId){
        transactionService.deleteTransaction(transactionId);
    }
}
