package com.hieudinh.detecttransaction.service;

import com.hieudinh.detecttransaction.common.BaseResponse;
import com.hieudinh.detecttransaction.dto.CreateTransactionRequestDTO;
import com.hieudinh.detecttransaction.dto.TransactionResponseDTO;
import com.hieudinh.detecttransaction.entity.Transaction;
import com.hieudinh.detecttransaction.exception.NotFoundException;
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

    public BaseResponse<List<TransactionResponseDTO>> getListTransaction(){
        List<Transaction> transactions = transactionRepository.findAll();
        List<TransactionResponseDTO> response = new ArrayList<>();
        for(Transaction  transaction : transactions){
            response.add(new TransactionResponseDTO(transaction));
        }
         return BaseResponse.success(response);
    }

    public BaseResponse<TransactionResponseDTO> getTransaction(UUID id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isEmpty()){
            throw new NotFoundException("Transaction with id not found");
        }
        return BaseResponse.success(new TransactionResponseDTO(transaction.get()));
    }

    public BaseResponse<TransactionResponseDTO> createTransaction(CreateTransactionRequestDTO request){
        Transaction transaction = new Transaction();
        transaction.setTitle(request.getTitle());
        transaction.setAmount(request.getAmount());
        transaction.setCategory(request.getCategory());
        transaction.setDate(request.getDate());
        transactionRepository.save(transaction);

        return BaseResponse.success(new TransactionResponseDTO(transaction));
    }

    public void deleteTransaction(UUID id){
        Optional<Transaction> transaction = transactionRepository.findById(id);
        if(transaction.isEmpty()){
            throw new NotFoundException("Transaction with id not found");
        }
        transactionRepository.delete(transaction.get());
    }
}
