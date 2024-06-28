<template>
  <List
    :grid="{ gutter: 16, xs: 1, sm: 2, md: 4, lg: 6 }"
    :data-source="data"
    :pagination="paginationProp"
  >
    <template #renderItem="{ item }">
      <List.Item>
        <Card :hoverable="true" :class="`${prefixCls}__card`" @click="onDatasourceClick(item)">
          <div :class="`${prefixCls}__card-title`">
            <Icon
              class="icon"
              v-if="item.type"
              :icon="`${item.type.toLowerCase()}|svg`"
              size="34"
            />
            <div :class="`${prefixCls}__card-name`">
              {{ item.name }}
            </div>
          </div>
        </Card>
      </List.Item>
    </template>
  </List>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Card, List } from 'ant-design-vue';
  import { getDatasourcePage } from '@/api/datasource/datasource';
  import { DatasourceModel } from '@/api/datasource/model/datasourceModel';
  import Icon from '@/components/Icon/Icon.vue';

  //数据
  const data = ref<DatasourceModel[]>([]);
  const prefixCls = 'list-card';
  //分页相关
  const current = ref(1);
  const size = ref(36);
  const total = ref(0);
  const paginationProp = ref({
    showSizeChanger: false,
    showQuickJumper: true,
    pageSize: size,
    current,
    total,
    showTotal: (total: number) => `总 ${total} 条`,
    onChange: pageChange,
    onShowSizeChange: pageSizeChange,
  });
  const emits = defineEmits(['selected']);
  onMounted(() => {
    fetch();
  });

  function pageChange(p: number, pz: number) {
    current.value = p;
    size.value = pz;
    fetch();
  }

  function pageSizeChange(_current, targetSize: number) {
    size.value = targetSize;
    fetch();
  }

  async function fetch(p = {}) {
    const res = await getDatasourcePage({ current: current.value, size: size.value, ...p });
    data.value = res.records;
    total.value = res.total;
  }

  // 选择类型回调
  function onDatasourceClick(item) {
    const { id, type, name } = item;
    emits('selected', { type, name, datasourceId: id });
  }
</script>
<style lang="less" scoped>
  .list-card {
    &__card {
      display: inline-block;
      vertical-align: top;
      width: 192px;
      height: 80px;

      &-icon {
        // icon图标悬浮于右上侧
        position: absolute;
        top: 8px; /* 调整此值以适应您的需求 */
        right: 8px; /* 调整此值以适应您的需求 */
      }

      &-title {
        display: flex;
        align-items: center;
        margin-bottom: 5px;
        color: @text-color-base;
        font-size: 16px;

        .icon {
          font-size: 38px !important;
        }
      }

      &-name {
        height: 34px;
        line-height: 34px;
        font-size: 16px;
        color: rgb(29, 33, 41);
        margin-left: 8px;
      }
    }
  }
</style>
