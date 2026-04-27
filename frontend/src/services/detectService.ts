import type { DetectTransactionDraft } from '../types/transaction';

const STORAGE_KEY = 'detect-transaction:ai-draft';

function sleep(timeoutMs: number) {
  return new Promise((resolve) => window.setTimeout(resolve, timeoutMs));
}

function buildTitleFromFileName(fileName: string) {
  const nameWithoutExtension = fileName.replace(/\.[^.]+$/, '');
  const readableName = nameWithoutExtension.replace(/[-_]+/g, ' ').trim();

  if (!readableName) {
    return 'Giao dịch từ biên lai';
  }

  return `Giao dịch từ ${readableName}`;
}

export async function detectTransactionFromImage(file: File): Promise<DetectTransactionDraft> {
  await sleep(1000);

  // TODO: Thay phan mock nay bang API detect that khi backend san sang.
  return {
    formValues: {
      title: buildTitleFromFileName(file.name),
      amount: '125000',
      category: 'MUST_HAVE',
      date: new Date().toISOString().slice(0, 10),
    },
    confidence: 0.82,
    sourceFileName: file.name,
    note: 'Đang dùng dữ liệu mock để hoàn thiện luồng UI cho bước detect giao dịch.',
    isMock: true,
  };
}

export function saveDetectDraft(draft: DetectTransactionDraft) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(draft));
}

export function readDetectDraft() {
  const raw = sessionStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw) as DetectTransactionDraft;
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function clearDetectDraft() {
  sessionStorage.removeItem(STORAGE_KEY);
}
