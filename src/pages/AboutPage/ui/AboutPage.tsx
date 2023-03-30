import React from 'react';
import { useTranslation } from 'react-i18next';

interface AboutPageProps {
  className?: string
}

const AboutPage = ({ className }: AboutPageProps) => {
  const { t } = useTranslation();
  return (
    <div>
      {t('AboutPage')}
    </div>
  );
};

export default AboutPage;
