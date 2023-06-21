import { memo, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { classNames } from '@/shared/lib/classNames/classNames';
import {
  DynamicModuleLoader,
  ReducersList,
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { ToggleFeatures } from '@/shared/lib/features';
import { useForceUpdate } from '@/shared/lib/render/forceUpdate';
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Text as TextDeprecated, ThemeText } from '@/shared/ui/deprecated/Text';
import { Button } from '@/shared/ui/redesigned/Button';
import { Input } from '@/shared/ui/redesigned/Input';
import { VStack } from '@/shared/ui/redesigned/Stack';
import { Text } from '@/shared/ui/redesigned/Text';

import { getLoginError } from '../../model/selectors/getLoginError/getLoginError';
import { getLoginIsLoading } from '../../model/selectors/getLoginIsLoading/getLoginIsLoading';
import { getLoginPassword } from '../../model/selectors/getLoginPassword/getLoginPassword';
import { getLoginUsername } from '../../model/selectors/getLoginUsername/getLoginUsername';
import { loginByUsername } from '../../model/services/loginByUsername/loginByUsername';
import { loginActions, loginReducer } from '../../model/slice/loginSlices';

import styles from './LoginForm.module.scss';

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
  const forceUpdate = useForceUpdate();

  const onChangeUsername = useCallback(
    (value: string) => {
      dispatch(loginActions.setUsername(value));
    },
    [dispatch],
  );

  const onChangePassword = useCallback(
    (value: string) => {
      dispatch(loginActions.setPassword(value));
    },
    [dispatch],
  );

  const onLoginClick = useCallback(async () => {
    const result = await dispatch(loginByUsername({ username, password }));
    if (result.meta.requestStatus === 'fulfilled') {
      onSuccess();
      forceUpdate();
    }
  }, [dispatch, username, password, onSuccess, forceUpdate]);

  return (
    <DynamicModuleLoader removeAfterUnmount reducers={initialReducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <VStack
            gap="16"
            className={classNames(styles.LoginForm, {}, [className])}
          >
            <Text title={t('Auth form')} />
            {error && (
              <Text text={t('Wrong password or login')} variant="error" />
            )}
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
              className={styles.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Sign in')}
            </Button>
          </VStack>
        }
        off={
          <div className={classNames(styles.LoginForm, {}, [className])}>
            <TextDeprecated title={t('Auth form')} />
            {error && (
              <TextDeprecated
                text={t('Wrong password or login')}
                theme={ThemeText.ERROR}
              />
            )}
            <InputDeprecated
              autofocus
              type="text"
              className={styles.input}
              placeholder={t('Add username')}
              onChange={onChangeUsername}
              value={username}
            />
            <InputDeprecated
              type="text"
              className={styles.input}
              placeholder={t('Add password')}
              onChange={onChangePassword}
              value={password}
            />
            <ButtonDeprecated
              theme={ThemeButton.OUTLINE}
              className={styles.loginBtn}
              onClick={onLoginClick}
              disabled={isLoading}
            >
              {t('Sign in')}
            </ButtonDeprecated>
          </div>
        }
      />
    </DynamicModuleLoader>
  );
});

export default LoginForm;
