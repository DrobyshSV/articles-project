import { memo } from 'react';

import { classNames } from '@/shared/lib/classNames/classNames';

import './Loader.scss';

interface LoaderProps {
  className?: string;
}

/**
 * Deprecated, use new components from the redesigned folder
 * @deprecated
 */
export const Loader = memo(({ className }: LoaderProps) => (
  <div className={classNames('lds-ripple', {}, [className])}>
    <div />
    <div />
  </div>
));
