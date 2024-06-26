<template>
  <PageWrapper :title="getTitle" contentBackground contentClass="p-4">
    <InterfaceDetail
      :id="state.id"
      :type="state.type"
      :datasourceId="state.datasourceId"
      :datasourceName="state.datasourceName"
    />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, reactive, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import InterfaceDetail from './InterfaceDetail.vue';
  import { PageWrapper } from '@/components/Page';

  const route = useRoute();

  // 定义一个类型来描述可能的查询参数
  type QueryParams = {
    id?: string;
    type: string;
    name: string;
    datasourceId: string;
  };

  // 初始化为响应式引用
  const state = reactive({
    type: 'HTTP' as string,
    isUpdate: false,
    id: undefined as string | undefined,
    datasourceId: undefined as string | undefined,
    datasourceName: undefined as string | undefined,
  });

  // 解析查询参数并更新state
  function parseQuery(query: QueryParams) {
    state.type = query.type ?? state.type;
    state.isUpdate = !!query.id;
    state.id = query.id;
    state.datasourceId = query.datasourceId;
    state.datasourceName = query.name;
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
    !unref(state.isUpdate) ? `新增${state.type}接口` : `更新${state.type}接口`,
  );
</script>
<style lang="less" scoped></style>
parseQuery(val)
