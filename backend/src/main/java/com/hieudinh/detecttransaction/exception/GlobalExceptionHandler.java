package com.hieudinh.detecttransaction.exception;

import com.hieudinh.detecttransaction.common.BaseResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {
    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<BaseResponse> handleNotFoundException(NotFoundException e){
        e.printStackTrace();
        return ResponseEntity.status(404).body(BaseResponse.error(e.getMessage()));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<BaseResponse> handleUnwantedException(Exception e){
        e.printStackTrace();
        return ResponseEntity.status(500).body(BaseResponse.error("Internal server error"));
    }
}