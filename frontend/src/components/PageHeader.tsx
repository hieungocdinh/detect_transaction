import type { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  actions?: ReactNode;
}

function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <section className="page-header card">
      <div>
        <p className="eyebrow">Workspace</p>
        <h2>{title}</h2>
        {description ? <p className="page-header__description">{description}</p> : null}
      </div>

      {actions ? <div className="page-header__actions">{actions}</div> : null}
    </section>
  );
}

export default PageHeader;
