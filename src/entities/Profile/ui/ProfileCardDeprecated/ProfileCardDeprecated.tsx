import { useTranslation } from 'react-i18next';

import { CountrySelect } from '@/entities/Country';
import { CurrencySelect } from '@/entities/Currency';
import { classNames, Mods } from '@/shared/lib/classNames/classNames';
import { Avatar } from '@/shared/ui/deprecated/Avatar';
import { Input } from '@/shared/ui/deprecated/Input';
import { Loader } from '@/shared/ui/deprecated/Loader';
import {
  AlignText,
  Text as TextDeprecated,
  ThemeText,
} from '@/shared/ui/deprecated/Text';
import { HStack, VStack } from '@/shared/ui/redesigned/Stack';

import { ProfileCardProps } from '../ProfileCard/ProfileCard';

import styles from './ProfileCardDeprecated.module.scss';

export const ProfileCardDeprecatedError = () => {
  const { t } = useTranslation();

  return (
    <HStack
      justify="center"
      max
      className={classNames(styles.ProfileCard, {}, [styles.error])}
    >
      <TextDeprecated
        theme={ThemeText.ERROR}
        title={t('Something has gone wrong')}
        text={t('Try to update')}
        align={AlignText.CENTER}
      />
    </HStack>
  );
};

export const ProfileCardDeprecatedLoader = () => (
  <HStack
    justify="center"
    max
    className={classNames(styles.ProfileCard, { [styles.loading]: true })}
  >
    <Loader />
  </HStack>
);

export const ProfileCardDeprecated = (props: ProfileCardProps) => {
  const {
    className,
    data,
    readonly,
    onChangeFirstname,
    onChangeLastname,
    onChangeAge,
    onChangeCity,
    onChangeAvatar,
    onChangeUsername,
    onChangeCountry,
    onChangeCurrency,
  } = props;

  const { t } = useTranslation();

  const mods: Mods = {
    [styles.editing]: !readonly,
  };

  return (
    <VStack
      gap="8"
      max
      className={classNames(styles.ProfileCard, mods, [className])}
    >
      {data?.avatar && (
        <HStack justify="center" max className={styles.avatarWrapper}>
          <Avatar src={data?.avatar} />
        </HStack>
      )}
      <Input
        value={data?.firstname}
        placeholder={t('Your First Name')}
        className={styles.input}
        onChange={onChangeFirstname}
        readonly={readonly}
        data-testid="ProfileCardDeprecated.firstname"
      />
      <Input
        value={data?.lastname}
        placeholder={t('Your Last Name')}
        className={styles.input}
        onChange={onChangeLastname}
        readonly={readonly}
        data-testid="ProfileCardDeprecated.lastname"
      />
      <Input
        value={data?.age}
        type="number"
        placeholder={t('Your age')}
        className={styles.input}
        onChange={onChangeAge}
        readonly={readonly}
      />
      <Input
        value={data?.city}
        placeholder={t('City')}
        className={styles.input}
        onChange={onChangeCity}
        readonly={readonly}
      />
      <Input
        value={data?.username}
        placeholder={t('Enter your Nickname')}
        className={styles.input}
        onChange={onChangeUsername}
        readonly={readonly}
      />
      <Input
        value={data?.avatar}
        placeholder={t('Add link of avatar')}
        className={styles.input}
        onChange={onChangeAvatar}
        readonly={readonly}
      />
      <CurrencySelect
        className={styles.input}
        value={data?.currency}
        onChange={onChangeCurrency}
        readonly={readonly}
      />
      <CountrySelect
        className={styles.input}
        value={data?.country}
        onChange={onChangeCountry}
        readonly={readonly}
      />
    </VStack>
  );
};
