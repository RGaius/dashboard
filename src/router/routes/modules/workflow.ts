import type { AppRouteModule } from '@/router/types';
import { LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/workflow',
  name: 'Workflow',
  component: LAYOUT,
  redirect: '/workflow/index',
  meta: {
    orderNo: 11,
    icon: 'mdi:workflow-outline',
    hideChildrenInMenu: true,
    title: t('routes.workflow.name'),
  },
  children: [
    {
      path: 'index',
      name: 'WorkflowIndex',
      component: () => import('@/views/workflow/index.vue'),
      meta: {
        // affix: true,
        hideMenu: true,
        title: t('routes.workflow.name'),
      },
    },
    {
      path: 'create',
      name: 'WorkflowInfo',
      component: () => import('@/views/workflow/component/Workflow.vue'),
      meta: {
        title: t('routes.workflow.name'),
        hideMenu: true,
      },
    }
  ],
};

export default dashboard;
