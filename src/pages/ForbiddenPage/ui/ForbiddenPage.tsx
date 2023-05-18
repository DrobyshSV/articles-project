import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

interface ForbiddenPageProps {
  className?: string
}

const ForbiddenPage = ({ className }: ForbiddenPageProps) => {
  const { t } = useTranslation();
  return (
    <Page className={className}>
      {t('You have no access to this page ')}
    </Page>
  );
};

export default ForbiddenPage;
