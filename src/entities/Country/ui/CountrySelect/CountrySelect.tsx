import { useTranslation } from 'react-i18next';
import { memo, useCallback } from 'react';
import { ListBox } from 'shared/ui/Popups/ui/ListBox/ListBox';
import { Country } from '../../model/types/country';

interface CountrySelectProps {
  className?: string;
  value?: Country;
  onChange?: (value: Country) => void;
  readonly?: boolean;
}

const options = [
  { value: Country.Belarus, content: Country.Belarus },
  { value: Country.Ukraine, content: Country.Ukraine },
  { value: Country.Lithuania, content: Country.Lithuania },
  { value: Country.Latvia, content: Country.Latvia },
  { value: Country.Poland, content: Country.Poland },
];

export const CountrySelect = memo(({
  className, value, onChange, readonly,
}: CountrySelectProps) => {
  const { t } = useTranslation();

  const onChangeHandler = useCallback((value: string) => {
    onChange?.(value as Country);
  }, [onChange]);

  return (
    <ListBox
      className={className}
      onChange={onChangeHandler}
      value={value}
      defaultValue={t('Point to the country')}
      label={t('Point to the country')}
      items={options}
      readonly={readonly}
      direction="top right"
    />
  );
});
