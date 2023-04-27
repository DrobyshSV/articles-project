import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { memo } from 'react';
import { Page } from 'widgets/Page/Page';
import { useParams } from 'react-router-dom';
import styles from './ArticleEditPage.module.scss';

interface ArticleEditPageProps {
  className?: string;
}

const ArticleEditPage = memo((props: ArticleEditPageProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const { id } = useParams<{id: string}>();
  const isEdit = Boolean(id);

  return (
    <Page className={classNames(styles.ArticleEditPage, {}, [className])}>
      {isEdit
        ? t('Edit article with ID = ') + id
        : t('Create new article')}
    </Page>
  );
});

export default ArticleEditPage;
