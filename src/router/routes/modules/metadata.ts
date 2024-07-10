import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/metadata',
  name: 'Metadata',
  component: LAYOUT,
  redirect: '/metadata/datasource',
  meta: {
    orderNo: 11,
    icon: 'solar:box-bold',
    title: t('routes.metadata.name'),
  },
  children: [
    {
      path: 'datasource',
      name: 'DatasourceIndex',
      component: () => import('@/views/datasource/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.metadata.datasource'),
      },
    },
    {
      path: 'interface',
      name: 'InterfaceIndex',
      component: () => import('@/views/interface/index.vue'),
      meta: {
        // affix: true,
        title: t('routes.metadata.interface'),
      },
    },
  ],
};

export default dashboard;
