import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from '@/app/providers/ErrorBoundary';
import { Page } from '@/widgets/Page/Page';

interface MainPageProps {
  className?: string
}

const MainPage = memo(({ className }: MainPageProps) => {
  const { t } = useTranslation();
  return (
    <Page>
      <BugButton />
      {t('MainPage')}
    </Page>
  );
});

export default MainPage;
