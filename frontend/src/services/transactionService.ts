import { request } from '../lib/http';
import type { Transaction, TransactionPayload } from '../types/transaction';

const BASE_PATH = '/api/v1/transactions';

export async function getTransactions() {
  const response = await request<Transaction[]>(BASE_PATH);
  return response.data ?? [];
}

export async function getTransaction(transactionId: string) {
  const response = await request<Transaction>(`${BASE_PATH}/${transactionId}`);
  return response.data;
}

export async function createTransaction(payload: TransactionPayload) {
  const response = await request<Transaction>(BASE_PATH, {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function updateTransaction(transactionId: string, payload: TransactionPayload) {
  const response = await request<Transaction>(`${BASE_PATH}/${transactionId}`, {
    method: 'PUT',
    body: JSON.stringify(payload),
  });

  return response.data;
}

export async function deleteTransaction(transactionId: string) {
  await request<void>(`${BASE_PATH}/${transactionId}`, {
    method: 'DELETE',
  });
}
