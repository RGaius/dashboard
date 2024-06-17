import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/datasource',
  name: 'Datasource',
  component: LAYOUT,
  redirect: '/datasource/index',
  meta: {
    orderNo: 10,
    icon: 'ion:grid-outline',
    hideChildrenInMenu: true,
    title: t('routes.datasource.datasource'),
  },
  children: [
    {
      path: '/index',
      name: 'Datasource',
      component: () => import('@/views/datasource/index.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.datasource.datasource'),
      },
    },
  ],
};

export default dashboard;
