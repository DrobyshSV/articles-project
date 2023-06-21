import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

interface AdminPanelPageProps {
  className?: string;
}

const AdminPanelPage = ({ className }: AdminPanelPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid="AdminPanelPage" className={className}>
      {t('AdminPanelPage')}
    </Page>
  );
};

export default AdminPanelPage;
