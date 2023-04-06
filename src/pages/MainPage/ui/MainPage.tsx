import React, {memo} from 'react';
import { useTranslation } from 'react-i18next';
import { BugButton } from 'app/providers/ErrorBoundary';

interface MainPageProps {
  className?: string
}

const MainPage = memo(({ className }: MainPageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      <BugButton />
      {t('MainPage')}
    </div>
  );
});

export default MainPage;
