package com.hieudinh.detecttransaction.mapper;

import com.hieudinh.detecttransaction.dto.CreateTransactionRequestDTO;
import com.hieudinh.detecttransaction.dto.TransactionResponseDTO;
import com.hieudinh.detecttransaction.dto.UpdateTransactionRequestDTO;
import com.hieudinh.detecttransaction.entity.Transaction;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface TransactionMapper {
    Transaction toEntity(CreateTransactionRequestDTO dto);

    TransactionResponseDTO toDTO(Transaction entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateTransactionFromDTO(UpdateTransactionRequestDTO dto, @MappingTarget Transaction entity);
}
