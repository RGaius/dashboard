<template>
  <div :class="`${prefixCls}__content`">
    <List>
      <Row :gutter="8" style="margin-bottom: 2.5rem">
        <template v-for="item in typeList" :key="item.title">
          <Col xs="12" sm="8" md="6" lg="6" :xxl="4">
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
    <!-- 设置固定footer -->
    <Row :class="`${prefixCls}__footer`">
      <Col :span="23" style="text-align: right">
        <Button type="primary" :disabled="!selectedItem.title" @click="onNext">下一步</Button>
      </Col>
    </Row>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import Icon from '@/components/Icon/Icon.vue';
  import { getTypeList, DatasourceType } from './data';
  import { EllipsisText } from '@/components/EllipsisText';
  import { Card, Row, Col, List, Button } from 'ant-design-vue';

  const defaultSelectedItem: DatasourceType = {
    title: '',
    icon: '',
    description: '',
  };
  const emit = defineEmits(['next']);
  // 数据源类型列表
  const typeList = ref<DatasourceType[]>([]);
  const selectedItem = ref<DatasourceType>(defaultSelectedItem);

  // 获取数据源类型
  onMounted(async () => {
    try {
      const response = getTypeList();
      typeList.value = response;
    } catch (error) {
      console.error(error);
    }
  });

  // 设置选中项，若选中项一致，则设置为默认值
  function onTypeClick(item: DatasourceType) {
    if (item.title === selectedItem.value.title) {
      selectedItem.value = defaultSelectedItem;
      return;
    }
    selectedItem.value = item;
  }

  async function onNext() {
    emit('next', selectedItem);
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
      max-width: 334px;
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
