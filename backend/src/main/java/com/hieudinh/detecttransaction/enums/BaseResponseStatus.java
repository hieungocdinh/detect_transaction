package com.hieudinh.detecttransaction.enums;

public enum BaseResponseStatus {
    SUCCESS("success"),
    ERROR("error");

    private final String label;

    BaseResponseStatus(String label){
        this.label = label;
    }

    public String getLabel(){
        return this.label;
    }
}
