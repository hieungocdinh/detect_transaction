import { useEffect, useState, type FormEvent } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DetectStepper from '../components/DetectStepper';
import EmptyState from '../components/EmptyState';
import PageHeader from '../components/PageHeader';
import StatusBanner from '../components/StatusBanner';
import TransactionForm from '../components/TransactionForm';
import { clearDetectDraft, readDetectDraft } from '../services/detectService';
import { createTransaction } from '../services/transactionService';
import { formValuesToPayload, validateTransactionForm } from '../lib/transaction';
import type { DetectTransactionDraft, TransactionFormValues } from '../types/transaction';

function DetectReviewPage() {
  const location = useLocation();
  const navigate = useNavigate();

  const [draft, setDraft] = useState<DetectTransactionDraft | null>(null);
  const [formValues, setFormValues] = useState<TransactionFormValues | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedDraft = readDetectDraft();
    setDraft(storedDraft);
    setFormValues(storedDraft?.formValues ?? null);
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!formValues) {
      setErrorMessage('Không còn dữ liệu detect để lưu.');
      return;
    }

    const validationMessage = validateTransactionForm(formValues);
    if (validationMessage) {
      setErrorMessage(validationMessage);
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      await createTransaction(formValuesToPayload(formValues));
      clearDetectDraft();
      navigate('/transactions', {
        state: {
          flash: {
            type: 'success',
              text: 'Đã lưu giao dịch mới từ luồng AI detect.',
          },
        },
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể lưu giao dịch detect.');
    } finally {
      setLoading(false);
    }
  }

  const previewUrl = (location.state as { previewUrl?: string } | null)?.previewUrl;

  if (!draft || !formValues) {
    return (
      <EmptyState
        title="Không có dữ liệu detect"
        description="Bạn cần upload ảnh ở bước 1 để tạo draft giao dịch trước khi review."
        action={
          <Link to="/detect/upload" className="button button--primary">
            Quay lại bước upload
          </Link>
        }
      />
    );
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Review kết quả detect"
        description="Đây là bước người dùng kiểm tra lại thông tin mà AI trả về, sửa field sai và lưu thành transaction mới."
        actions={
          <Link to="/detect/upload" className="button button--ghost">
            Quay lại bước 1
          </Link>
        }
      />

      <DetectStepper currentStep={2} />

      {errorMessage ? <StatusBanner tone="error" message={errorMessage} /> : null}

      <section className="review-grid">
        <div className="page-stack">
          <section className="card detect-note">
            <p className="eyebrow">Kết quả detect</p>
            <h3>{draft.isMock ? 'Đang dùng dữ liệu mock' : 'Kết quả từ backend AI'}</h3>
            <p>{draft.note}</p>
            <dl className="detect-note__meta">
              <div>
                <dt>File nguồn</dt>
                <dd>{draft.sourceFileName}</dd>
              </div>
              <div>
                <dt>Độ tin cậy</dt>
                <dd>{Math.round(draft.confidence * 100)}%</dd>
              </div>
            </dl>
          </section>

          <TransactionForm
            value={formValues}
            onChange={setFormValues}
            onSubmit={handleSubmit}
            loading={loading}
            submitLabel="Lưu giao dịch mới"
            secondaryAction={
              <button type="button" className="button button--ghost" onClick={() => setFormValues(draft.formValues)}>
                Đặt lại theo AI detect
              </button>
            }
          />
        </div>

        <aside className="card preview-panel preview-panel--sticky">
          <p className="eyebrow">Ảnh biên lai</p>
          {previewUrl ? <img src={previewUrl} alt="Ảnh biên lai đã upload" className="preview-image" /> : null}
          {!previewUrl ? <p>Không có preview ảnh trong lần truy cập này, nhưng draft detect vẫn đang được giữ tạm trong sessionStorage.</p> : null}
        </aside>
      </section>
    </div>
  );
}

export default DetectReviewPage;
