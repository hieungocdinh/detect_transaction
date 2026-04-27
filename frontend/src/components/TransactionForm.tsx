import type { ChangeEvent, FormEvent, ReactNode } from 'react';
import { TRANSACTION_CATEGORY_OPTIONS } from '../constants/transaction';
import type { TransactionFormValues } from '../types/transaction';

interface TransactionFormProps {
  value: TransactionFormValues;
  onChange: (nextValue: TransactionFormValues) => void;
  onSubmit?: (event: FormEvent<HTMLFormElement>) => void;
  disabled?: boolean;
  loading?: boolean;
  submitLabel?: string;
  showSubmit?: boolean;
  secondaryAction?: ReactNode;
}

function TransactionForm({
  value,
  onChange,
  onSubmit,
  disabled = false,
  loading = false,
  submitLabel = 'Lưu giao dịch',
  showSubmit = true,
  secondaryAction,
}: TransactionFormProps) {
  const handleFieldChange = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value: nextValue } = event.target;

    onChange({
      ...value,
      [name]: nextValue,
    });
  };

  return (
    <form className="card transaction-form" onSubmit={onSubmit}>
      <div className="form-grid">
        <label className="field">
          <span className="field__label">Tiêu đề giao dịch</span>
          <input
            name="title"
            value={value.title}
            onChange={handleFieldChange}
            placeholder="Ví dụ: Chuyển tiền nhà trọ"
            disabled={disabled || loading}
            required={!disabled}
          />
        </label>

        <label className="field">
          <span className="field__label">Số tiền</span>
          <input
            type="number"
            name="amount"
            value={value.amount}
            onChange={handleFieldChange}
            placeholder="125000"
            min="0"
            step="0.01"
            inputMode="decimal"
            disabled={disabled || loading}
            required={!disabled}
          />
        </label>

        <label className="field">
          <span className="field__label">Danh mục</span>
          <select
            name="category"
            value={value.category}
            onChange={handleFieldChange}
            disabled={disabled || loading}
          >
            {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>

        <label className="field">
          <span className="field__label">Ngày giao dịch</span>
          <input
            type="date"
            name="date"
            value={value.date}
            onChange={handleFieldChange}
            disabled={disabled || loading}
            required={!disabled}
          />
        </label>
      </div>

      <section className="category-guide">
        <p className="category-guide__title">Gợi ý danh mục</p>
        <div className="category-guide__list">
          {TRANSACTION_CATEGORY_OPTIONS.map((option) => (
            <article key={option.value} className="category-guide__item">
              <strong>{option.label}</strong>
              <span>{option.hint}</span>
            </article>
          ))}
        </div>
      </section>

      {(showSubmit || secondaryAction) && (
        <div className="form-actions">
          {secondaryAction}
          {showSubmit ? (
            <button type="submit" className="button button--primary" disabled={loading || disabled}>
              {loading ? 'Đang lưu...' : submitLabel}
            </button>
          ) : null}
        </div>
      )}
    </form>
  );
}

export default TransactionForm;
