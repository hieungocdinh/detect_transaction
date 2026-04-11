package com.hieudinh.detecttransaction.common;

import com.hieudinh.detecttransaction.enums.BaseResponseStatus;
import lombok.Getter;

@Getter
public class BaseResponse<T> {
    // Getter
    private BaseResponseStatus status;
    private String message;
    private T data;
    private Object meta;

    // Constructor
    public BaseResponse(BaseResponseStatus status, String message, T data, Object meta){
        this.status = status;
        this.message = message;
        this.data = data;
        this.meta = meta;
    }

    // Static helper methods
    public static <T> BaseResponse<T> success(T data){
        return new BaseResponse<>(BaseResponseStatus.SUCCESS, "OK", data, null);
    }

    public static <T> BaseResponse<T> success(T data, Object meta){
        return new BaseResponse<>(BaseResponseStatus.SUCCESS, "OK", data, meta);
    }

    public static <T> BaseResponse<T> error(String message){
        return new BaseResponse<>(BaseResponseStatus.ERROR, message, null, null);
    }

}
