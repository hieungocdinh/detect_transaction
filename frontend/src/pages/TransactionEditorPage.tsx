import { useEffect, useState, type FormEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import EmptyState from '../components/EmptyState';
import LoadingBlock from '../components/LoadingBlock';
import PageHeader from '../components/PageHeader';
import StatusBanner from '../components/StatusBanner';
import TransactionForm from '../components/TransactionForm';
import { formatDateTime } from '../lib/format';
import { createTodayTransactionValues, formValuesToPayload, transactionToFormValues, validateTransactionForm } from '../lib/transaction';
import { createTransaction, getTransaction, updateTransaction } from '../services/transactionService';
import type { Transaction, TransactionFormValues } from '../types/transaction';

interface TransactionEditorPageProps {
  mode: 'create' | 'view' | 'edit';
}

function TransactionEditorPage({ mode }: TransactionEditorPageProps) {
  const navigate = useNavigate();
  const { transactionId } = useParams<{ transactionId: string }>();

  const [formValues, setFormValues] = useState<TransactionFormValues>(createTodayTransactionValues());
  const [transaction, setTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(mode !== 'create');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (mode === 'create') {
      return;
    }

    if (!transactionId) {
      setErrorMessage('Không tìm thấy mã giao dịch trên URL.');
      setLoading(false);
      return;
    }

    void loadTransaction(transactionId);
  }, [mode, transactionId]);

  async function loadTransaction(id: string) {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await getTransaction(id);
      setTransaction(response);
      setFormValues(transactionToFormValues(response));
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải chi tiết giao dịch.');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage(null);

    const validationMessage = validateTransactionForm(formValues);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setSubmitting(true);

    try {
      const payload = formValuesToPayload(formValues);

      if (mode === 'create') {
        await createTransaction(payload);
        navigate('/transactions', {
          state: {
            flash: {
              type: 'success',
              text: 'Đã thêm giao dịch thủ công thành công.',
            },
          },
        });
        return;
      }

      if (!transactionId) {
        throw new Error('Không tìm thấy mã giao dịch để cập nhật.');
      }

      const updatedTransaction = await updateTransaction(transactionId, payload);
      setTransaction(updatedTransaction);
      setFormValues(transactionToFormValues(updatedTransaction));
      navigate('/transactions', {
        state: {
          flash: {
            type: 'success',
              text: 'Đã cập nhật giao dịch thành công.',
          },
        },
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể lưu giao dịch.');
    } finally {
      setSubmitting(false);
    }
  }

  const isReadOnly = mode === 'view';

  if (loading) {
    return <LoadingBlock message="Đang tải thông tin giao dịch..." />;
  }

  if (mode !== 'create' && !transaction && errorMessage) {
    return (
      <EmptyState
        title="Không tải được giao dịch"
        description={errorMessage}
        action={
          <div className="inline-actions">
            <button type="button" className="button button--secondary" onClick={() => transactionId && void loadTransaction(transactionId)}>
              Tải lại
            </button>
            <Link to="/transactions" className="button button--ghost">
              Về danh sách
            </Link>
          </div>
        }
      />
    );
  }

  const titleMap = {
    create: 'Thêm giao dịch thủ công',
    view: 'Xem chi tiết giao dịch',
    edit: 'Cập nhật giao dịch',
  } as const;

  const descriptionMap = {
    create: 'Nhập đầy đủ thông tin để tạo mới transaction thông qua API backend.',
    view: 'Màn hình chi tiết dùng chung với màn cập nhật, hiện tại đang ở chế độ read-only.',
    edit: 'Bạn có thể sửa lại các field và gửi lên API update của backend.',
  } as const;

  return (
    <div className="page-stack">
      <PageHeader
        title={titleMap[mode]}
        description={descriptionMap[mode]}
        actions={
          <div className="inline-actions">
            <Link to="/transactions" className="button button--ghost">
              Về danh sách
            </Link>
            {mode === 'view' && transactionId ? (
              <Link to={`/transactions/${transactionId}/edit`} className="button button--secondary">
                Chuyển sang chỉnh sửa
              </Link>
            ) : null}
          </div>
        }
      />

      {errorMessage ? <StatusBanner tone="error" message={errorMessage} /> : null}

      {transaction ? (
        <section className="metadata-grid">
          <article className="card metadata-card">
            <span>Transaction ID</span>
            <strong>{transaction.id}</strong>
          </article>
          <article className="card metadata-card">
            <span>Tạo lúc</span>
            <strong>{formatDateTime(transaction.createdAt)}</strong>
          </article>
          <article className="card metadata-card">
            <span>Cập nhật lúc</span>
            <strong>{formatDateTime(transaction.updatedAt)}</strong>
          </article>
        </section>
      ) : null}

      <TransactionForm
        value={formValues}
        onChange={setFormValues}
        onSubmit={handleSubmit}
        disabled={isReadOnly}
        loading={submitting}
        submitLabel={mode === 'create' ? 'Tạo giao dịch' : 'Lưu thay đổi'}
        showSubmit={!isReadOnly}
        secondaryAction={
          mode === 'create' ? (
            <button type="button" className="button button--ghost" onClick={() => setFormValues(createTodayTransactionValues())}>
              Đặt lại form
            </button>
          ) : mode === 'edit' ? (
            <button
              type="button"
              className="button button--ghost"
              onClick={() => (transaction ? setFormValues(transactionToFormValues(transaction)) : undefined)}
            >
              Hoàn tác thay đổi
            </button>
          ) : (
            <Link to="/transactions" className="button button--ghost">
              Quay lại
            </Link>
          )
        }
      />
    </div>
  );
}

export default TransactionEditorPage;
