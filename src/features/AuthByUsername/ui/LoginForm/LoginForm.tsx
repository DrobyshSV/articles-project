import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { getLoginState } from '../../model/selectors/getLoginState/getLoginState';
import { loginActions } from '../../model/slice/loginSlices';
import styles from './LoginForm.module.scss';

interface LoginFormProps {
  className?: string;
}

export const LoginForm = memo(({ className }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const {
    username, password, error, isLoading,
  } = useSelector(getLoginState);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(() => {
    dispatch(loginByUsername({ username, password }));
  }, [dispatch, password, username]);

  return (
    <div className={classNames(styles.LoginForm, {}, [className])}>
      <Text title={t('Auth form')} />
      {error && <Text text={t('Wrong password or login')} theme={TextTheme.ERROR} />}
      <Input
        autofocus
        type="text"
        className={styles.input}
        placeholder={t('Add username')}
        onChange={onChangeUsername}
        value={username}
      />
      <Input
        type="text"
        className={styles.input}
        placeholder={t('Add password')}
        onChange={onChangePassword}
        value={password}
      />
      <Button
        theme={ThemeButton.OUTLINE}
        className={styles.loginBtn}
        onClick={onLoginClick}
        disabled={isLoading}
      >
        {t('Sign in')}
      </Button>
    </div>
  );
});
