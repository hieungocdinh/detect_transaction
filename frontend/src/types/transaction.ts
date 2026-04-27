export type TransactionCategory =
  | 'FOOD'
  | 'HOUSING'
  | 'ELECTRICITY'
  | 'WATER'
  | 'FUEL'
  | 'MUST_HAVE'
  | 'NICE_TO_HAVE'
  | 'SAVING'
  | 'DATE'
  | 'PARTY'
  | 'WASTE';

export interface Transaction {
  id: string;
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
  createdAt: string;
  updatedAt: string;
}

export interface TransactionPayload {
  title: string;
  amount: number;
  category: TransactionCategory;
  date: string;
}

export interface TransactionFormValues {
  title: string;
  amount: string;
  category: TransactionCategory;
  date: string;
}

export interface DetectTransactionDraft {
  formValues: TransactionFormValues;
  confidence: number;
  sourceFileName: string;
  note: string;
  isMock: boolean;
}

export interface FlashMessage {
  type: 'success' | 'error' | 'info';
  text: string;
}
