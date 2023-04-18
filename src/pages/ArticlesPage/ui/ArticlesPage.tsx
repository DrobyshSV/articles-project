import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';

interface ArticlesPageProps {
  className?: string
}

const ArticlesPage = memo(({ className }: ArticlesPageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {t('ArticlesPage')}
    </div>
  );
});

export default memo(ArticlesPage);
