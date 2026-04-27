import { EMPTY_TRANSACTION_FORM_VALUES } from '../constants/transaction';
import type { Transaction, TransactionFormValues, TransactionPayload } from '../types/transaction';

export function transactionToFormValues(transaction: Pick<Transaction, 'title' | 'amount' | 'category' | 'date'>): TransactionFormValues {
  return {
    title: transaction.title,
    amount: String(transaction.amount),
    category: transaction.category,
    date: transaction.date,
  };
}

export function createTodayTransactionValues(): TransactionFormValues {
  return {
    ...EMPTY_TRANSACTION_FORM_VALUES,
    date: new Date().toISOString().slice(0, 10),
  };
}

export function validateTransactionForm(values: TransactionFormValues) {
  if (!values.title.trim()) {
    return 'Vui lòng nhập tiêu đề giao dịch.';
  }

  if (values.amount.trim() === '') {
    return 'Vui lòng nhập số tiền.';
  }

  const parsedAmount = Number(values.amount);
  if (Number.isNaN(parsedAmount)) {
    return 'Số tiền không hợp lệ.';
  }

  if (parsedAmount < 0) {
    return 'Số tiền phải lớn hơn hoặc bằng 0.';
  }

  if (!values.category) {
    return 'Vui lòng chọn danh mục.';
  }

  if (!values.date) {
    return 'Vui lòng chọn ngày giao dịch.';
  }

  return null;
}

export function formValuesToPayload(values: TransactionFormValues): TransactionPayload {
  return {
    title: values.title.trim(),
    amount: Number(values.amount),
    category: values.category,
    date: values.date,
  };
}
