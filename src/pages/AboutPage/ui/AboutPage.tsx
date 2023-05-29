import React from 'react';
import { useTranslation } from 'react-i18next';

import { Page } from '@/widgets/Page';

interface AboutPageProps {
  className?: string;
}

const AboutPage = ({ className }: AboutPageProps) => {
  const { t } = useTranslation();
  return (
    <Page data-testid="AboutPage" className={className}>
      {t('AboutPage')}
    </Page>
  );
};

export default AboutPage;
