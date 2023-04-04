import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = ({ className }: LoginFormProps) => {
  const { t } = useTranslation();

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Input
        autofocus
        type="text"
        className={styles.input}
        placeholder={t('Add username')}
      />
      <Input
        type="text"
        className={styles.input}
        placeholder={t('Add password')}
      />
      <Button
        className={styles.loginBtn}
      >
        {t('Sign in')}
      </Button>
    </div>
  );
};
