import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import ConfirmModal from '../components/ConfirmModal';
import EmptyState from '../components/EmptyState';
import LoadingBlock from '../components/LoadingBlock';
import PageHeader from '../components/PageHeader';
import StatusBanner from '../components/StatusBanner';
import { TRANSACTION_CATEGORY_OPTIONS } from '../constants/transaction';
import { formatCurrency, formatDate, formatDateTime } from '../lib/format';
import { deleteTransaction, getTransactions } from '../services/transactionService';
import type { FlashMessage, Transaction } from '../types/transaction';

function getCategoryLabel(category: Transaction['category']) {
  return TRANSACTION_CATEGORY_OPTIONS.find((option) => option.value === category)?.label ?? category;
}

function TransactionListPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [flashMessage, setFlashMessage] = useState<FlashMessage | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Transaction | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const state = location.state as { flash?: FlashMessage } | null;
    if (state?.flash) {
      setFlashMessage(state.flash);
      navigate(location.pathname, { replace: true, state: null });
    }
  }, [location.pathname, location.state, navigate]);

  useEffect(() => {
    void loadTransactions();
  }, []);

  async function loadTransactions() {
    setLoading(true);
    setErrorMessage(null);

    try {
      const response = await getTransactions();
      const sorted = [...response].sort((left, right) => {
        const dateCompare = right.date.localeCompare(left.date);
        if (dateCompare !== 0) {
          return dateCompare;
        }

        return right.updatedAt.localeCompare(left.updatedAt);
      });

      setTransactions(sorted);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể tải danh sách giao dịch.');
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteTarget) {
      return;
    }

    setIsDeleting(true);

    try {
      await deleteTransaction(deleteTarget.id);
      setTransactions((current) => current.filter((item) => item.id !== deleteTarget.id));
      setFlashMessage({ type: 'success', text: `Đã xóa giao dịch "${deleteTarget.title}".` });
      setDeleteTarget(null);
    } catch (error) {
      setFlashMessage({
        type: 'error',
        text: error instanceof Error ? error.message : 'Không thể xóa giao dịch.',
      });
    } finally {
      setIsDeleting(false);
    }
  }

  const totalAmount = transactions.reduce((sum, transaction) => sum + transaction.amount, 0);
  const newestTransaction = transactions[0];

  return (
    <div className="page-stack">
      <PageHeader
        title="Danh sách giao dịch"
        description="Từ đây bạn có thể quản lý giao dịch thủ công hoặc đi vào luồng detect từ ảnh biên lai."
        actions={
          <>
            <Link to="/detect/upload" className="button button--ghost">
              AI detect từ ảnh
            </Link>
            <Link to="/transactions/new" className="button button--primary">
              Thêm thủ công
            </Link>
          </>
        }
      />

      {flashMessage ? <StatusBanner tone={flashMessage.type} message={flashMessage.text} /> : null}
      {errorMessage ? <StatusBanner tone="error" message={errorMessage} /> : null}

      <section className="stats-grid">
        <article className="card stat-card">
          <p className="eyebrow">Tổng số</p>
          <strong>{transactions.length}</strong>
          <span>giao dịch đang có trong hệ thống</span>
        </article>
        <article className="card stat-card">
          <p className="eyebrow">Tổng chi tiêu</p>
          <strong>{formatCurrency(totalAmount)}</strong>
          <span>tổng giá trị đang được lưu</span>
        </article>
        <article className="card stat-card">
          <p className="eyebrow">Mới nhất</p>
          <strong>{newestTransaction ? formatDate(newestTransaction.date) : '--/--/----'}</strong>
          <span>{newestTransaction ? newestTransaction.title : 'Chưa có giao dịch nào'}</span>
        </article>
      </section>

      {loading ? <LoadingBlock message="Đang tải danh sách giao dịch..." /> : null}

      {!loading && transactions.length === 0 ? (
        <EmptyState
          title="Chưa có giao dịch nào"
          description="Bạn có thể thêm thủ công hoặc đi theo luồng upload ảnh để mô phỏng bước AI detect."
          action={
            <div className="inline-actions">
              <Link to="/transactions/new" className="button button--primary">
                Thêm giao dịch đầu tiên
              </Link>
              <Link to="/detect/upload" className="button button--ghost">
                Thử luồng AI detect
              </Link>
            </div>
          }
        />
      ) : null}

      {!loading && transactions.length > 0 ? (
        <section className="transaction-grid">
          {transactions.map((transaction) => (
            <article key={transaction.id} className="card transaction-card">
              <div className="transaction-card__header">
                <div>
                  <p className="eyebrow">{getCategoryLabel(transaction.category)}</p>
                  <h3>{transaction.title}</h3>
                </div>
                <strong className="transaction-card__amount">{formatCurrency(transaction.amount)}</strong>
              </div>

              <dl className="transaction-card__meta">
                <div>
                  <dt>Ngày giao dịch</dt>
                  <dd>{formatDate(transaction.date)}</dd>
                </div>
                <div>
                  <dt>Cập nhật lần cuối</dt>
                  <dd>{formatDateTime(transaction.updatedAt)}</dd>
                </div>
              </dl>

              <div className="inline-actions">
                <Link to={`/transactions/${transaction.id}`} className="button button--ghost">
                  Xem chi tiết
                </Link>
                <Link to={`/transactions/${transaction.id}/edit`} className="button button--secondary">
                  Chỉnh sửa
                </Link>
                <button
                  type="button"
                  className="button button--danger"
                  onClick={() => setDeleteTarget(transaction)}
                >
                  Xóa
                </button>
              </div>
            </article>
          ))}
        </section>
      ) : null}

      <ConfirmModal
        open={Boolean(deleteTarget)}
        title="Xóa giao dịch"
        description={
          <p>
            Bạn chắc chắn muốn xóa giao dịch <strong>{deleteTarget?.title}</strong>? Hành động này sẽ gọi API
            delete của backend ngay lập tức.
          </p>
        }
        confirmLabel="Xóa giao dịch"
        loading={isDeleting}
        onCancel={() => {
          if (!isDeleting) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleDelete}
      />
    </div>
  );
}

export default TransactionListPage;
