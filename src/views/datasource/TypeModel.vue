<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="数据源类型"
    @ok="handleSubmit"
    width="80%"
  >
    <div :class="`${prefixCls}__content`">
      <List>
        <Row :gutter="8">
          <template v-for="item in typeList" :key="item.title">
            <Col xs="24" sm="12" lg="8" :xxl="6">
              <List.Item>
                <Card
                  :hoverable="true"
                  :class="`${prefixCls}__card ${item.title === selectedItem.title ? 'selected' : ''}`"
                  @click="onTypeClick(item)"
                >
                  <!--实现图标悬浮于右上侧  -->
                  <div :class="`${prefixCls}__card-icon`" v-if="item.title === selectedItem.title">
                    <Icon
                      class="icon"
                      icon="material-symbols:check-circle-outline-rounded"
                      size="24"
                      color="#0960bd"
                    />
                  </div>
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon" v-if="item.icon" :icon="item.icon" size="50" />
                    {{ item.title }}
                  </div>
                  <div :class="`${prefixCls}__card-detail`">
                    <EllipsisText :line="3">
                      {{ item.description }}
                    </EllipsisText>
                  </div>
                </Card>
              </List.Item>
            </Col>
          </template>
        </Row>
      </List>
    </div>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, unref, onMounted } from 'vue';
  import { Card, Row, Col, List } from 'ant-design-vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import Icon from '@/components/Icon/Icon.vue';
  import { EllipsisText } from '@/components/EllipsisText';

  defineOptions({ name: 'DatasourceTypeModal' });

  const emit = defineEmits(['success', 'register']);

  const { createMessage } = useMessage();
  const { getDataSourceTypeList } = useDatasource();

  const defaultSelectedItem = {
    title: '',
    icon: '',
    description: '',
  };

  // 数据源类型列表
  const typeList = ref<any[]>([]);
  const selectedItem = ref(defaultSelectedItem);

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async () => {
    setModalProps({ confirmLoading: false });
  });

  // 设置选中项，若选中项一致，则设置为默认值
  function onTypeClick(item) {
    if (item.title === selectedItem.value.title) {
      selectedItem.value = defaultSelectedItem;
      return;
    }
    selectedItem.value = item;
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

  async function handleSubmit() {
    try {
      if (!selectedItem.value.title) {
        createMessage.error({ content: '请选择数据源类型！' });
        return;
      }
      setModalProps({ confirmLoading: true });
      await closeModal(); // 确保closeModal的异步操作完成
      emit('success', unref(selectedItem));
    } catch (error) {
      console.error(error);
      createMessage.error({ content: '处理数据源类型选择时发生错误！' });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }

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
      width: 100%;
      max-width: 275px;
      margin-bottom: -8px;

      &-icon {
        // icon图标悬浮于右上侧
        position: absolute;
        top: 8px; /* 调整此值以适应您的需求 */
        right: 8px; /* 调整此值以适应您的需求 */
      }

      &.selected {
        border-color: @primary-color; // 当被选中时，改变边框颜色
        box-shadow:
          0 2px 4px rgba(0, 0, 0, 0.12),
          0 0 6px rgba(0, 0, 0, 0.04); // 添加阴影效果
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
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        color: @text-color-secondary;
        font-size: 14px;
        height: 66px;
      }
    }

    // 固定为最下方
    &__footer {
      position: fixed;
      padding: 12px 24px;
      width: 100%;
      bottom: 0;
      text-align: right;
      background: #fff;
      border-top: 1px solid rgba(0, 0, 0, 0.06);
    }
  }
</style>
