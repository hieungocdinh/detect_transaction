package com.hieudinh.detecttransaction.service;

import com.hieudinh.detecttransaction.common.BaseResponse;
import com.hieudinh.detecttransaction.dto.CreateTransactionRequestDTO;
import com.hieudinh.detecttransaction.dto.TransactionResponseDTO;

import java.util.List;
import java.util.UUID;

public interface TransactionService {
    BaseResponse<List<TransactionResponseDTO>> getListTransaction();
    BaseResponse<TransactionResponseDTO> getTransaction(UUID id);
    BaseResponse<TransactionResponseDTO> createTransaction(CreateTransactionRequestDTO request);
    void deleteTransaction(UUID id);
}
