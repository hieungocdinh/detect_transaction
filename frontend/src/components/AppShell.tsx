import type { PropsWithChildren } from 'react';
import { NavLink } from 'react-router-dom';

function AppShell({ children }: PropsWithChildren) {
  return (
    <div className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">React + TypeScript frontend</p>
          <h1>Detect Transaction</h1>
          <p className="topbar__subtitle">
            Quản lý giao dịch thủ công và sẵn sàng cho luồng AI detect từ ảnh biên lai.
          </p>
        </div>

        <nav className="topbar__nav" aria-label="Điều hướng chính">
          <NavLink
            to="/transactions"
            className={({ isActive }) => `topbar__link${isActive ? ' topbar__link--active' : ''}`}
          >
            Danh sách giao dịch
          </NavLink>
          <NavLink
            to="/detect/upload"
            className={({ isActive }) => `topbar__link${isActive ? ' topbar__link--active' : ''}`}
          >
            AI detect từ ảnh
          </NavLink>
        </nav>
      </header>

      <main className="page-container">{children}</main>
    </div>
  );
}

export default AppShell;
