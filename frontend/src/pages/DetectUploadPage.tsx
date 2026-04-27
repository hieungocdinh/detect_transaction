import { useState, type ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import DetectStepper from '../components/DetectStepper';
import PageHeader from '../components/PageHeader';
import StatusBanner from '../components/StatusBanner';
import { detectTransactionFromImage, saveDetectDraft } from '../services/detectService';

function readFileAsDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = () => reject(new Error('Không thể đọc file ảnh.'));
    reader.readAsDataURL(file);
  });
}

function DetectUploadPage() {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const nextFile = event.target.files?.[0] ?? null;
    setErrorMessage(null);

    if (!nextFile) {
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    if (!nextFile.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn đúng file ảnh biên lai.');
      setSelectedFile(null);
      setPreviewUrl(null);
      return;
    }

    try {
      const nextPreview = await readFileAsDataUrl(nextFile);
      setSelectedFile(nextFile);
      setPreviewUrl(nextPreview);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể đọc file vừa chọn.');
    }
  }

  async function handleNext() {
    if (!selectedFile) {
      setErrorMessage('Bạn cần chọn 1 ảnh biên lai trước khi sang bước tiếp theo.');
      return;
    }

    setLoading(true);
    setErrorMessage(null);

    try {
      const draft = await detectTransactionFromImage(selectedFile);
      saveDetectDraft(draft);
      navigate('/detect/review', {
        state: {
          previewUrl,
        },
      });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Không thể xử lý ảnh biên lai.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="page-stack">
      <PageHeader
        title="Upload ảnh biên lai"
        description="Bước này đã được code sẵn để frontend hoàn chỉnh luồng detect, hiện tại đang sử dụng mock service trong lúc chờ backend AI."
      />

      <DetectStepper currentStep={1} />

      {errorMessage ? <StatusBanner tone="error" message={errorMessage} /> : null}

      <section className="card upload-layout">
        <div className="upload-panel">
          <p className="eyebrow">Bước 1</p>
          <h3>Chọn 1 ảnh biên lai thanh toán</h3>
          <p>
            Sau khi chọn file, nút Next sẽ gọi mock detect service. Khi backend AI sẵn sàng, chỉ cần thay
            implementation trong `detectService.ts`.
          </p>

          <label className="upload-dropzone">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            <strong>{selectedFile ? selectedFile.name : 'Bấm để chọn ảnh'}</strong>
            <span>Chấp nhận 1 file ảnh duy nhất, ưu tiên ảnh chụp rõ thông tin giao dịch.</span>
          </label>

          <div className="inline-actions">
            <button type="button" className="button button--primary" onClick={handleNext} disabled={loading}>
              {loading ? 'Đang detect...' : 'Next'}
            </button>
          </div>
        </div>

        <div className="preview-panel">
          {previewUrl ? <img src={previewUrl} alt="Xem trước biên lai" className="preview-image" /> : null}
          {!previewUrl ? <p>Chưa có ảnh được chọn. Vùng preview sẽ hiện ảnh sau khi user upload.</p> : null}
        </div>
      </section>
    </div>
  );
}

export default DetectUploadPage;
