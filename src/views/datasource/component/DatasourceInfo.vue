<template>
  <PageWrapper :title="getTitle" contentBackground contentClass="p-4">
    <DatasourceForm :id="state.id" :type="state.datasourceType" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import DatasourceForm from './DatasourceForm.vue';

  import { PageWrapper } from '@/components/Page';

  const route = useRoute();

  // 定义一个类型来描述可能的查询参数
  type QueryParams = {
    id?: string;
    type: string;
  };

  // 初始化为响应式引用
  const state = reactive({
    datasourceType: 'HTTP' as string,
    isUpdate: false,
    id: undefined as string | undefined,
  });

  // 解析查询参数并更新state
  function parseQuery(query: QueryParams) {
    state.datasourceType = query.type ?? state.datasourceType;
    state.isUpdate = !!query.id;
    state.id = query.id;
  }

  // 初始解析
  parseQuery(route.query);

  // 监控query的变化，并更新state
  watch(
    () => route.query,
    (val) => {
      parseQuery(val);
    },
    { immediate: true },
  );

  const getTitle = computed(() =>
    !unref(state.isUpdate)
      ? `新增${state.datasourceType}数据源`
      : `更新${state.datasourceType}数据源`,
  );
</script>
<style lang="less" scoped></style>
