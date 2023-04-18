import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticleDetailsPageProps {
  className?: string
}

const ArticleDetailsPage = memo(({ className }: ArticleDetailsPageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {t('ArticleDetailsPage')}
    </div>
  );
});

export default memo(ArticleDetailsPage);
