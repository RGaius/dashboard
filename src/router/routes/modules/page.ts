import type { AppRouteModule } from '@/router/types';

import { getParentLayout, LAYOUT } from '@/router/constant';
import { t } from '@/hooks/web/useI18n';

const page: AppRouteModule = {
  path: '/page-demo',
  name: 'PageDemo',
  component: LAYOUT,
  redirect: '/page-demo/form/basic',
  meta: {
    orderNo: 20,
    icon: 'ion:aperture-outline',
    title: t('routes.demo.page.page'),
  },
  children: [
    // =============================form start=============================
    {
      path: 'form',
      name: 'FormPage',
      redirect: '/page-demo/form/basic',
      component: getParentLayout('FormPage'),
      meta: {
        title: t('routes.demo.page.form'),
      },
      children: [
        {
          path: 'basic',
          name: 'FormBasicPage',
          component: () => import('@/views/demo/page/form/basic/index.vue'),
          meta: {
            title: t('routes.demo.page.formBasic'),
          },
        },
        {
          path: 'step',
          name: 'FormStepPage',
          component: () => import('@/views/demo/page/form/step/index.vue'),
          meta: {
            title: t('routes.demo.page.formStep'),
          },
        },
        {
          path: 'high',
          name: 'FormHightPage',
          component: () => import('@/views/demo/page/form/high/index.vue'),
          meta: {
            title: t('routes.demo.page.formHigh'),
          },
        },
      ],
    },
    // =============================form end=============================
    // =============================list start=============================
    {
      path: 'list',
      name: 'ListPage',
      component: getParentLayout('ListPage'),
      redirect: '/page-demo/list/card',
      meta: {
        title: t('routes.demo.page.list'),
      },
      children: [
        {
          path: 'basic',
          name: 'ListBasicPage',
          component: () => import('@/views/demo/page/list/basic/index.vue'),
          meta: {
            title: t('routes.demo.page.listBasic'),
          },
        },
        {
          path: 'card',
          name: 'ListCardPage',
          component: () => import('@/views/demo/page/list/card/index.vue'),
          meta: {
            title: t('routes.demo.page.listCard'),
          },
        },
        {
          path: 'search',
          name: 'ListSearchPage',
          component: () => import('@/views/demo/page/list/search/index.vue'),
          meta: {
            title: t('routes.demo.page.listSearch'),
          },
        },
      ],
    },
    // =============================list end=============================
  ],
};

export default page;
