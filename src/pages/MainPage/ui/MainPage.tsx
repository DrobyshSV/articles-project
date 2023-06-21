import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

import { StarRating } from '@/shared/ui/redesigned/StarRating';
import { Page } from '@/widgets/Page';

interface MainPageProps {
  className?: string;
}

const MainPage = memo(({ className }: MainPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid="MainPage">
      {t('MainPage')}
      <StarRating />
    </Page>
  );
});

export default MainPage;
