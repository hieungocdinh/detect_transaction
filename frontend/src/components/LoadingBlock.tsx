interface LoadingBlockProps {
  message?: string;
}

function LoadingBlock({ message = 'Đang tải dữ liệu...' }: LoadingBlockProps) {
  return (
    <div className="card loading-block">
      <div className="spinner" aria-hidden="true" />
      <p>{message}</p>
    </div>
  );
}

export default LoadingBlock;
