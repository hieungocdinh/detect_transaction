import { Link } from 'react-router-dom';
import EmptyState from '../components/EmptyState';

function NotFoundPage() {
  return (
    <EmptyState
      title="Không tìm thấy trang"
      description="Route bạn vừa truy cập không tồn tại trong frontend này."
      action={
        <Link to="/transactions" className="button button--primary">
          Về trang danh sách giao dịch
        </Link>
      }
    />
  );
}

export default NotFoundPage;
