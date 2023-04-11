import { classNames } from 'shared/lib/classNames/classNames';
import { Text } from 'shared/ui/Text/Text';
import { Button, ThemeButton } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getProfileReadonly, profileActions, updateProfileData } from 'entities/Profile';
import { useCallback } from 'react';
import { useAppDispatch } from 'shared/config/hooks/useAppDispatch/useAppDispatch';
import styles from './ProfilePageHeader.module.scss';

interface ProfilePageHeaderProps {
  className?: string;
}

export const ProfilePageHeader = (props: ProfilePageHeaderProps) => {
  const {
    className,
  } = props;

  const { t } = useTranslation('profile');

  const readonly = useSelector(getProfileReadonly);
  const dispatch = useAppDispatch();

  const onEdit = useCallback(() => {
    dispatch(profileActions.setReadonly(false));
  }, [dispatch]);

  const onCancelEdit = useCallback(() => {
    dispatch(profileActions.cancelEdit());
  }, [dispatch]);

  const onSave = useCallback(() => {
    dispatch(updateProfileData());
  }, [dispatch]);

  return (
    <div className={classNames(styles.ProfilePageHeader, {}, [className])}>
      <Text title={t('Profile')} />
      {readonly
        ? (
          <Button
            className={styles.editBtn}
            theme={ThemeButton.OUTLINE}
            onClick={onEdit}
          >
            {t('Edit')}
          </Button>
        )
        : (
          <>
            <Button
              className={styles.editBtn}
              theme={ThemeButton.OUTLINE_RED}
              onClick={onCancelEdit}
            >
              {t('Cancel')}
            </Button>
            <Button
              className={styles.saveBtn}
              theme={ThemeButton.OUTLINE}
              onClick={onSave}
            >
              {t('Save')}
            </Button>
          </>
        )}
    </div>
  );
};
