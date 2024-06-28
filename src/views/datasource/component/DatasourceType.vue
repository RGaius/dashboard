<template>
  <div :class="`${prefixCls}__content`">
    <List>
      <Row>
        <template v-for="item in typeList" :key="item.type">
          <Col xs="24" lg="8" :xxl="4">
            <List.Item>
              <Card :hoverable="true" :class="`${prefixCls}__card`" @click="onTypeClick(item)">
                <div :class="`${prefixCls}__card-title`">
                  <Icon class="icon" v-if="item.icon" :icon="item.icon" size="50" />
                </div>
                <div :class="`${prefixCls}__card-detail`">
                  {{ item.type }}
                </div>
              </Card>
            </List.Item>
          </Col>
        </template>
      </Row>
    </List>
  </div>
</template>
<script lang="ts" setup>
  import { onMounted, ref } from 'vue';
  import { Card, Col, List, Row } from 'ant-design-vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import Icon from '@/components/Icon/Icon.vue';

  defineOptions({ name: 'DatasourceType' });

  const emit = defineEmits(['selected']);

  const { createMessage } = useMessage();
  const { getDataSourceTypeList } = useDatasource();

  // 数据源类型列表
  const typeList = ref<any[]>([]);

  // 选择类型回调
  function onTypeClick(item) {
    emit('selected', item);
  }

  // 获取数据源类型
  onMounted(async () => {
    try {
      typeList.value = getDataSourceTypeList();
    } catch (error) {
      console.error(error);
      createMessage.error({ content: '加载数据源类型失败！' });
    }
  });

  const prefixCls = 'list-card';
</script>

<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      display: inline-block;
      vertical-align: top;
      text-align: center;
      width: 140px;
      height: 120px;

      &-icon {
        // icon图标悬浮于右上侧
        position: absolute;
        top: 8px; /* 调整此值以适应您的需求 */
        right: 8px; /* 调整此值以适应您的需求 */
      }

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        color: @text-color-base;
        font-size: 16px;
        font-weight: 500;

        .icon {
          font-size: 38px !important;
        }
      }

      &-detail {
        color: @text-color-secondary;
        font-size: 14px;
      }
    }
  }
</style>
