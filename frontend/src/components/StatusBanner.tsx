interface StatusBannerProps {
  tone: 'success' | 'error' | 'info';
  message: string;
}

function StatusBanner({ tone, message }: StatusBannerProps) {
  return (
    <div className={`status-banner status-banner--${tone}`} role="alert">
      {message}
    </div>
  );
}

export default StatusBanner;
