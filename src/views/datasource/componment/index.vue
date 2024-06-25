<template>
  <PageWrapper :title="getTitle" contentBackground contentClass="p-4">
    <DatasourceDetail :id="id" :type="datasourceType" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import DatasourceDetail from './DatasourceDetail.vue';

  import { PageWrapper } from '@/components/Page';

  const route = useRoute();
  const query = route.query;

  // 初始化 datasourceType 和 isUpdate， 并通过 watch 监控 query 的变化
  let datasourceType = (query?.type ?? 'HTTP') as string;
  const isUpdate = !!query?.id;
  const id = query?.id as string | undefined;

  watch(
    () => route.query,
    (val) => {
      datasourceType = (val?.type ?? 'HTTP') as string;
    },
  );

  const getTitle = computed(() =>
    !unref(isUpdate) ? `新增${datasourceType}数据源` : `更新${datasourceType}数据源`,
  );
</script>
<style lang="less" scoped></style>
