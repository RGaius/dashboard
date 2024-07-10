<template>
  <div>
    <Tooltip :title="12" placement="right">
      <div class="menu-wrap">
        <div class="menu-icon">
          <div style="padding: 9px 9px"></div>
        </div>
        <div class="menu-label">{{ name }}</div>
      </div>
    </Tooltip>
  </div>
</template>

<script setup lang="ts">
  import { inject, onMounted, ref } from 'vue';
  import { Tooltip } from 'ant-design-vue';

  const getNodeData = inject('getNode', Function, true);

  const name = ref('');

  onMounted(() => {
    const currentNode = getNodeData();
    const { data } = currentNode;
    name.value = data.label;
  });
</script>

<style lang="less" scoped>
  .menu-wrap {
    border: 1px solid #d8d8d8;
    width: 100%;
    height: 100%;
    display: flex;
    cursor: pointer;
    transition: all 0.3s;

    &:hover {
      border: 1px solid @primary-color;
    }

    .menu-icon {
      width: 38px;
      height: 100%;
    }

    .menu-label {
      font-size: 12px;
      color: rgba(0, 0, 0, 0.65);
      line-height: 38px;
      word-break: break-all;
      overflow: hidden;
    }
  }
</style>
