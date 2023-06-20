import { toggleFeatures } from '@/shared/lib/features';
import { Skeleton as SkeletonDeprecated } from '@/shared/ui/deprecated/Skeleton';
import { Skeleton as SkeletonRedesigned } from '@/shared/ui/redesigned/Skeleton';
import { VStack } from '@/shared/ui/redesigned/Stack';

import styles from './ArticleDetails.module.scss';

export const ArticleDetailsSkeleton = () => {
  const Skeleton = toggleFeatures({
    name: 'isAppRedesigned',
    on: () => SkeletonRedesigned,
    off: () => SkeletonDeprecated,
  });
  return (
    <VStack gap="16" max>
      <Skeleton
        className={styles.avatar}
        width={200}
        height={200}
        border="50%"
      />
      <Skeleton width={300} height={32} />
      <Skeleton width={600} height={24} />
      <Skeleton width="100%" height={200} />
      <Skeleton width="100%" height={200} />
    </VStack>
  );
};
