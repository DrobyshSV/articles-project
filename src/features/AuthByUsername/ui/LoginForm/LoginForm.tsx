import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { Input } from 'shared/ui/Input/Input';
import { useDispatch, useSelector } from 'react-redux';
import { memo, useCallback } from 'react';
import { Text, TextTheme } from 'shared/ui/Text/Text';
import { DynamicModuleLoader, ReducersList } from 'shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlices';
import styles from './LoginForm.module.scss';
import {useAppDispatch} from 'shared/config/hooks/useAppDispatch/useAppDispatch';

export interface LoginFormProps {
  className?: string;
  onSuccess: () => void;
}

const initialReducers: ReducersList = {
  loginForm: loginReducer,
};

const LoginForm = memo(({ className, onSuccess }: LoginFormProps) => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  const error = useSelector(getLoginError);
  const isLoading = useSelector(getLoginIsLoading);
  const password = useSelector(getLoginPassword);
  const username = useSelector(getLoginUsername);

  const onChangeUsername = useCallback((value: string) => {
    dispatch(loginActions.setUsername(value));
  }, [dispatch]);

  const onChangePassword = useCallback((value: string) => {
    dispatch(loginActions.setPassword(value));
  }, [dispatch]);

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
    }
  }, [onSuccess, dispatch, password, username]);

  return (
    <DynamicModuleLoader
      removeAfterUnmount
      reducers={initialReducers}
    >
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
    </DynamicModuleLoader>
  );
});

export default LoginForm;
