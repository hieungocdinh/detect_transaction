package com.hieudinh.detecttransaction.enums;

public enum TransactionCategory {
    FOOD("Ăn"),
    HOUSING("Nhà"),
    ELECTRICITY("Điện"),
    WATER("Nước"),
    FUEL("Xăng"),
    MUST_HAVE("Chi tiêu thiết yếu"),
    NICE_TO_HAVE("Chi tiêu hưởng thụ"),
    SAVING("Tiết kiệm"),
    DATE("Date"),
    PARTY("Tiệc tùng"),
    WASTE("Lãng phí");

    private final String label;

    private TransactionCategory(String label){
        this.label = label;
    }

    public String getLabel() {
        return label;
    }
}
