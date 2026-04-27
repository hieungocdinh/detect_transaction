import type { TransactionCategory, TransactionFormValues } from '../types/transaction';

export const TRANSACTION_CATEGORY_OPTIONS: Array<{
  value: TransactionCategory;
  label: string;
  hint: string;
}> = [
  { value: 'FOOD', label: 'Ăn uống', hint: 'Chi phí đồ ăn, cà phê, quán ăn' },
  { value: 'HOUSING', label: 'Nhà ở', hint: 'Tiền nhà, chi phí sinh hoạt cố định' },
  { value: 'ELECTRICITY', label: 'Tiền điện', hint: 'Hóa đơn điện hằng tháng' },
  { value: 'WATER', label: 'Tiền nước', hint: 'Hóa đơn nước hằng tháng' },
  { value: 'FUEL', label: 'Xăng xe', hint: 'Đổ xăng, gửi xe, di chuyển' },
  { value: 'MUST_HAVE', label: 'Thiết yếu', hint: 'Khoản chi cần có trong tháng' },
  { value: 'NICE_TO_HAVE', label: 'Hưởng thụ', hint: 'Mua sắm, giải trí, tự thưởng' },
  { value: 'SAVING', label: 'Tiết kiệm', hint: 'Để dành, gửi tiết kiệm, đầu tư' },
  { value: 'DATE', label: 'Hẹn hò', hint: 'Chi phí cho các buổi đi chơi đôi cặp' },
  { value: 'PARTY', label: 'Tiệc tùng', hint: 'Ăn nhậu, sinh nhật, liên hoan' },
  { value: 'WASTE', label: 'Lãng phí', hint: 'Khoản chi không cần thiết, mua theo cảm xúc' },
];

export const EMPTY_TRANSACTION_FORM_VALUES: TransactionFormValues = {
  title: '',
  amount: '',
  category: 'MUST_HAVE',
  date: '',
};
