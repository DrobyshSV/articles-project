import { ChangeEvent, memo, useMemo } from 'react';

import { classNames, Mods } from '@/shared/lib/classNames/classNames';

import styles from './Select.module.scss';

export interface SelectOption<T extends string> {
  value: T;
  content: string;
}

interface SelectProps<T extends string> {
  className?: string;
  label?: string;
  options?: SelectOption<T>[];
  value?: string;
  onChange?: (value: T) => void;
  readonly?: boolean;
}
export const typedMemo: <T>(c: T) => T = memo;

/**
 * Deprecated, use new components from the redesigned folder
 * @deprecated
 */
export const Select = typedMemo(<T extends string>(props: SelectProps<T>) => {
  const { className, label, options, onChange, value, readonly } = props;

  const onChangeHandler = (e: ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value as T);
  };

  const optionsList = useMemo(
    () =>
      options?.map((opt) => (
        <option className={styles.option} value={opt.value} key={opt.value}>
          {opt.content}
        </option>
      )),
    [options],
  );

  const mods: Mods = {};

  return (
    <div className={classNames(styles.Wrapper, mods, [className])}>
      {label && <span className={styles.label}>{`${label}>`}</span>}
      <select
        disabled={readonly}
        className={styles.select}
        value={value}
        onChange={onChangeHandler}
      >
        {optionsList}
      </select>
    </div>
  );
});
