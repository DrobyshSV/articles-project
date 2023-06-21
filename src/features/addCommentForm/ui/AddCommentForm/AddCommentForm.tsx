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
import {
  Button as ButtonDeprecated,
  ThemeButton,
} from '@/shared/ui/deprecated/Button';
import { Input as InputDeprecated } from '@/shared/ui/deprecated/Input';
import { Button } from '@/shared/ui/redesigned/Button';
import { Card } from '@/shared/ui/redesigned/Card';
import { Input } from '@/shared/ui/redesigned/Input';
import { HStack } from '@/shared/ui/redesigned/Stack';

import {
  getAddCommentFormError,
  getAddCommentFormText,
} from '../../model/selectors/addCommentFormSelectors';
import {
  addCommentFormActions,
  addCommentFormReducer,
} from '../../model/slice/addCommentFormSlice';

import styles from './AddCommentForm.module.scss';

export interface AddCommentFormProps {
  className?: string;
  onSendComment: (text: string) => void;
}

const reducers: ReducersList = {
  addCommentForm: addCommentFormReducer,
};

const AddCommentForm = memo((props: AddCommentFormProps) => {
  const { className, onSendComment } = props;
  const { t } = useTranslation();
  const text = useSelector(getAddCommentFormText);
  const error = useSelector(getAddCommentFormError);
  const dispatch = useAppDispatch();

  const onCommentTextChange = useCallback(
    (value: string) => {
      dispatch(addCommentFormActions.setText(value));
    },
    [dispatch],
  );

  const onSendHandler = useCallback(() => {
    onSendComment(text || '');
    onCommentTextChange('');
  }, [onCommentTextChange, onSendComment, text]);

  return (
    <DynamicModuleLoader reducers={reducers}>
      <ToggleFeatures
        feature="isAppRedesigned"
        on={
          <Card padding="24" border="partial" max>
            <HStack
              data-testid="AddCommentForm"
              justify="between"
              max
              gap="16"
              className={classNames(styles.AddCommentFormRedesigned, {}, [
                className,
              ])}
            >
              <Input
                data-testid="AddCommentForm.Input"
                className={styles.input}
                placeholder={t('Add comment')}
                value={text}
                onChange={onCommentTextChange}
              />
              <Button
                data-testid="AddCommentForm.Button"
                onClick={onSendHandler}
              >
                {t('Send')}
              </Button>
            </HStack>
          </Card>
        }
        off={
          <HStack
            data-testid="AddCommentForm"
            justify="between"
            max
            className={classNames(styles.AddCommentForm, {}, [className])}
          >
            <InputDeprecated
              data-testid="AddCommentForm.Input"
              className={styles.input}
              placeholder={t('Add comment')}
              value={text}
              onChange={onCommentTextChange}
            />
            <ButtonDeprecated
              data-testid="AddCommentForm.Button"
              theme={ThemeButton.OUTLINE}
              onClick={onSendHandler}
            >
              {t('Send')}
            </ButtonDeprecated>
          </HStack>
        }
      />
    </DynamicModuleLoader>
  );
});

export default AddCommentForm;
