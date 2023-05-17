import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Page } from '@/widgets/Page';
import { StarRating } from '@/shared/ui/StarRating';

interface MainPageProps {
  className?: string
}

const MainPage = memo(({ className }: MainPageProps) => {
  const { t } = useTranslation();
  return (
    <Page>
      {t('MainPage')}
      <StarRating />
    </Page>
  );
});

export default MainPage;
