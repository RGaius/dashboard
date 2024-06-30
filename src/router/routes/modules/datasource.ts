import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/datasource',
  name: 'Datasource',
  component: LAYOUT,
  redirect: '/datasource/index',
  meta: {
    orderNo: 11,
    icon: 'mdi:database-outline',
    hideChildrenInMenu: true,
    title: t('routes.datasource.datasource'),
  },
  children: [
    {
      path: 'index',
      name: 'DatasourceIndex',
      component: () => import('@/views/datasource/index.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.datasource.datasource'),
      },
    },
    {
      path: 'info',
      name: 'DatasourceInfo',
      component: () => import('@/views/datasource/component/DatasourceInfo.vue'),
      meta: {
        title: t('routes.datasource.type'),
        hideMenu: true,
      },
    },
  ],
};

export default dashboard;
