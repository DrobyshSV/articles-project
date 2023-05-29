import { RouteProps } from 'react-router-dom';

// eslint-disable-next-line fsd-imports-checker/imports-between-layers
import { UserRole } from '@/entities/User';

export type AppRoutesProps = RouteProps & {
  authOnly?: boolean;
  roles?: UserRole[];
};
