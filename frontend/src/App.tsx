import { Navigate, Route, Routes } from 'react-router-dom';
import AppShell from './components/AppShell';
import DetectReviewPage from './pages/DetectReviewPage';
import DetectUploadPage from './pages/DetectUploadPage';
import NotFoundPage from './pages/NotFoundPage';
import TransactionEditorPage from './pages/TransactionEditorPage';
import TransactionListPage from './pages/TransactionListPage';

function App() {
  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<Navigate to="/transactions" replace />} />
        <Route path="/transactions" element={<TransactionListPage />} />
        <Route path="/transactions/new" element={<TransactionEditorPage mode="create" />} />
        <Route path="/transactions/:transactionId" element={<TransactionEditorPage mode="view" />} />
        <Route path="/transactions/:transactionId/edit" element={<TransactionEditorPage mode="edit" />} />
        <Route path="/detect/upload" element={<DetectUploadPage />} />
        <Route path="/detect/review" element={<DetectReviewPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </AppShell>
  );
}

export default App;
