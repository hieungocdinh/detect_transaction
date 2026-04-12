package com.hieudinh.detecttransaction.service;

import com.hieudinh.detecttransaction.common.BaseResponse;
import com.hieudinh.detecttransaction.dto.CreateTransactionRequestDTO;
import com.hieudinh.detecttransaction.dto.TransactionResponseDTO;
import com.hieudinh.detecttransaction.dto.UpdateTransactionRequestDTO;
import com.hieudinh.detecttransaction.entity.Transaction;
import com.hieudinh.detecttransaction.exception.NotFoundException;
import com.hieudinh.detecttransaction.mapper.TransactionMapper;
import com.hieudinh.detecttransaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class TransactionServiceImpl implements TransactionService{
    private final TransactionRepository transactionRepository;
    private final TransactionMapper transactionMapper;

    public BaseResponse<List<TransactionResponseDTO>> getListTransaction(){
        List<Transaction> transactions = transactionRepository.findAll();
        List<TransactionResponseDTO> response = new ArrayList<>();
        for(Transaction  transaction : transactions){
            response.add(transactionMapper.toDTO(transaction));
        }
         return BaseResponse.success(response);
    }

    public BaseResponse<TransactionResponseDTO> getTransaction(UUID id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isEmpty()){
            throw new NotFoundException("Transaction with id not found");
        }
        return BaseResponse.success(transactionMapper.toDTO(transaction.get()));
    }

    public BaseResponse<TransactionResponseDTO> createTransaction(CreateTransactionRequestDTO request){
        Transaction transaction = transactionMapper.toEntity(request);
        transactionRepository.save(transaction);
        return BaseResponse.success(transactionMapper.toDTO(transaction));
    }

    public BaseResponse<TransactionResponseDTO> updateTransaction(UUID transactionId, UpdateTransactionRequestDTO request){
        Optional<Transaction> opTransaction = transactionRepository.findById(transactionId);
        if(opTransaction.isEmpty()){
            throw new NotFoundException("Transaction with id not found");
        }
        Transaction transaction = opTransaction.get();
        transactionMapper.updateTransactionFromDTO(request, transaction);
        transactionRepository.save(transaction);
        return BaseResponse.success(transactionMapper.toDTO(transaction));
    }

    public void deleteTransaction(UUID id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isEmpty()){
            throw new NotFoundException("Transaction with id not found");
        }
        transactionRepository.delete(transaction.get());
    }
}
