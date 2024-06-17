import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/interface',
  name: 'Interface',
  component: LAYOUT,
  redirect: '/interface/index',
  meta: {
    orderNo: 11,
    icon: 'carbon:interface-usage',
    hideChildrenInMenu: true,
    title: t('routes.interface.interface'),
  },
  children: [
    {
      path: 'index',
      name: 'Interface',
      component: () => import('@/views/interface/index.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.interface.interface'),
      },
    },
  ],
};

export default dashboard;
