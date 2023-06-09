import { memo, MutableRefObject, ReactNode, useRef, UIEvent } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { StateSchema } from '@/app/providers/StoreProvider';
import { getScrollByPath, scrollSaveActions } from '@/features/scrollSave';
import { useAppDispatch } from '@/shared/config/hooks/useAppDispatch/useAppDispatch';
import { useInfiniteScroll } from '@/shared/config/hooks/useInfiniteScroll/useInfiniteScroll';
import { useInitialEffect } from '@/shared/config/hooks/useInitialEffect/useInitialEffect';
import { useThrottle } from '@/shared/config/hooks/useThrottle/useThrottle';
import { classNames } from '@/shared/lib/classNames/classNames';
import { toggleFeatures } from '@/shared/lib/features';
import { TestProps } from '@/shared/types/tests';

import styles from './Page.module.scss';

interface PageProps extends TestProps {
  className?: string;
  children: ReactNode;
  onScrollEnd?: () => void;
}

export const PAGE_ID = 'PAGE_ID';

export const Page = memo((props: PageProps) => {
  const { className, children, onScrollEnd } = props;
  const wrapperRef = useRef() as MutableRefObject<HTMLDivElement>;
  const triggerRef = useRef() as MutableRefObject<HTMLDivElement>;
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const scrollPosition = useSelector((state: StateSchema) =>
    getScrollByPath(state, pathname),
  );

  useInfiniteScroll({
    triggerRef,
    wrapperRef: toggleFeatures({
      name: 'isAppRedesigned',
      on: () => undefined,
      off: () => wrapperRef,
    }),
    callback: onScrollEnd,
  });

  useInitialEffect(() => {
    wrapperRef.current.scrollTop = scrollPosition;
  });

  const onScroll = useThrottle((e: UIEvent<HTMLDivElement>) => {
    dispatch(
      scrollSaveActions.setScrollPosition({
        position: e.currentTarget.scrollTop,
        path: pathname,
      }),
    );
  }, 500);

  return (
    <main
      ref={wrapperRef}
      className={classNames(
        toggleFeatures({
          name: 'isAppRedesigned',
          on: () => styles.PageRedesigned,
          off: () => styles.Page,
        }),
        {},
        [className],
      )}
      onScroll={onScroll}
      id={PAGE_ID}
      data-testid={props['data-testid'] ?? 'Page'}
    >
      {children}
      {onScrollEnd ? <div className={styles.trigger} ref={triggerRef} /> : null}
    </main>
  );
});
