package com.hieudinh.detecttransaction.exception;

import com.hieudinh.detecttransaction.common.BaseResponse;
import org.springframework.context.MessageSourceResolvable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<BaseResponse> handleNotFoundException(NotFoundException e){
        e.printStackTrace();
        return ResponseEntity.status(404).body(BaseResponse.error(e.getMessage()));
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<BaseResponse> handleMethodArgumentNotValidException(MethodArgumentNotValidException e){
        // NOTE: Validation messages are stored in BindingResult, not in the exception message
        List<String> errorMessages = e.getBindingResult().getFieldErrors()
                .stream().map(MessageSourceResolvable::getDefaultMessage)
                .toList();

        e.printStackTrace();
        return ResponseEntity.status(400).body(BaseResponse.error(errorMessages.get(0)));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleUnwantedException(Exception e){
        e.printStackTrace();
        return ResponseEntity.status(500).body(BaseResponse.error("Internal server error"));
    }
}