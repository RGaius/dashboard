<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :canFullscreen="false"
    :centered="true"
    :maskClosable="false"
    :wrapperFooterOffset="100"
    width="1080px"
  >
    <DatasourceType @selected="onTypeClick" v-if="!selectedItem.type" />
    <DatasourceForm
      ref="formRef"
      v-else-if="selectedItem.type"
      :type="selectedItem.type"
      :id="selectedItem.id"
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
    <template #footer>
      <div v-if="showBtn">
        <a-button @click="handleCancel"> 测试连接</a-button>
        <a-button type="primary" @click="handleSubmit"> 提交</a-button>
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
  const formRef = ref(null);

  function initSelectedItem(defaultValue) {
    selectedItem.value = defaultValue;
  }

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    console.log('data', data);
    initSelectedItem(data);
    setModalProps({ confirmLoading: false });
  });

  // 设置选中项，若选中项一致，则设置为默认值
  function onTypeClick(item) {
    selectedItem.value = item;
  }

  const getTitle = computed(() => {
    return unref(selectedItem).type ? '' : '选择数据源类型';
  });

  const showBtn = computed(() => {
    return !!unref(selectedItem).type;
  });

  function onBackClick() {
    selectedItem.value = defaultSelectedItem;
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
    if (formRef.value) {
      setModalProps({ confirmLoading: true });
      await formRef.value.handleSubmit();
      await closeModal(); // 确保closeModal的异步操作完成
      setModalProps({ confirmLoading: false });
      emit('success');
    }
  }

  async function handleCancel() {
    if (formRef.value) {
      setModalProps({ confirmLoading: true });
      await formRef.value.handleValidate();
      setModalProps({ confirmLoading: false });
    }
    return false;
  }
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
    color: @primary-color;
    &:hover {
      color: @primary-color;
    }
  }
</style>
