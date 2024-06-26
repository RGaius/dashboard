<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :canFullscreen="false"
    :centered="true"
    :useWrapper="false"
    :maskClosable="false"
    :showCancelBtn="false"
    :showOkBtn="false"
    width="1080px"
    :minHeight="500"
    :closeFunc="initSelectedItem"
  >
    <DatasourceType v-if="!selectedItem.type" @selected="onTypeClick" />
    <DatasourceForm
      v-else-if="selectedItem.type"
      :type="selectedItem.type"
      :id="selectedItem.id"
      @submit-after="onSuccess"
    />
    <!--  定义title区域，当选择类型时，显示字符串 选择数据源类型 当前有数据源类型时，显示回退按钮 -->
    <template #title>
      <div v-if="!selectedItem.type">选择数据源类型</div>
      <div v-else>
        <div @click="onBackClick" class="back-btn">
          <LeftOutlined />
          <span>返回</span>
        </div>
      </div>
    </template>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { computed, onMounted, ref, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import DatasourceType from './DatasourceType.vue';
  import DatasourceForm from './DatasourceForm.vue';
  import { LeftOutlined } from '@ant-design/icons-vue';

  defineOptions({ name: 'DatasourceTypeModal' });

  const emit = defineEmits(['success', 'register']);

  const { createMessage } = useMessage();
  const { getDataSourceTypeList } = useDatasource();

  const defaultSelectedItem = {
    type: undefined,
    id: undefined,
  };

  // 数据源类型列表
  const typeList = ref<any[]>([]);
  const selectedItem = ref(defaultSelectedItem);

  function initSelectedItem(defaultValue?: any) {
    selectedItem.value = !defaultValue ? defaultSelectedItem : defaultValue;
    return Promise.resolve(true);
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    await initSelectedItem(data);
    setModalProps({ confirmLoading: false });
  });

  // 设置选中项，若选中项一致，则设置为默认值
  function onTypeClick(item) {
    selectedItem.value = item;
  }

  const getTitle = computed(() => {
    return unref(selectedItem).type ? '' : '选择数据源类型';
  });

  function onBackClick() {
    if (selectedItem.value.id) {
      closeModal();
    } else {
      selectedItem.value = defaultSelectedItem;
    }
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

  async function onSuccess() {
    setModalProps({ confirmLoading: true });
    closeModal();
    setModalProps({ confirmLoading: false });
    emit('success');
  }
</script>

<style lang="less" scoped>
  .list-card {
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
          font-size: 38px !important;
        }
      }

      &-detail {
        color: @text-color-secondary;
        font-size: 14px;
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

  .back-btn {
    cursor: pointer;
    font-size: 16px;
  }
</style>
