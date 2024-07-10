<template>
  <div class="x6-container">
    <div class="app-stencil" :ref="refStencil"></div>
    <div style="width: calc(100% - 208px); height: 100%; position: relative">
      <div class="app-content" :ref="refContainer"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, ref } from 'vue';
  import { initGraph } from '@/views/workflow/graph';
  import { registerNode } from '@/views/workflow/graph/node';
  import { registerConnector } from '@/views/workflow/graph/connector';
  import { registerEdge } from '@/views/workflow/graph/edge';

  const refStencil = ref();
  const refContainer = ref();

  onMounted(() => {
    const _graph = initGraph({ x6Container: refContainer, refStencil: refStencil });
    registerNode();
    registerConnector();
    registerEdge();
  });
</script>

<style scoped lang="less">
  .x6-container {
    display: flex;
    padding: 0;
    font-family: sans-serif;
    height: 100%;
    min-height: (100vh - 105px - 48px);
    position: relative;

    .app-stencil {
      position: relative;
      width: 210px;
      min-width: 210px;
      border: 1px solid rgba(0, 0, 0, 0.09);
      background: #fff;
    }

    .app-content-detail {
      height: 100% !important; // calc(100% - 48px - 51px - 42px - 16px);
      width: 100% !important;
    }

    .app-content {
      height: calc(100%) !important; // calc(100% - 48px - 51px - 42px - 16px);
      width: 100% !important;
      //box-shadow: 0 0 10px 1px #e9e9e9;
    }
  }

  :global(.x6-widget-stencil) {
    background-color: #fff;
  }

  :global(.x6-widget-stencil-title) {
    background-color: #fff;
    opacity: 0;
  }

  :global(.x6-widget-stencil-group-title) {
    background-color: #fff !important;
  }

  :global(.x6-widget-transform) {
    margin: -1px 0 0 -1px;
    padding: 0px;
    border: 1px solid #239edd;
  }

  :global(.x6-widget-transform > div) {
    border: 1px solid #239edd;
  }

  :global(.x6-widget-transform > div:hover) {
    background-color: #3dafe4;
  }

  .x6-widget-transform-active-handle {
    background-color: #3dafe4;
  }

  .x6-widget-transform-resize {
    border-radius: 0;
  }

  .x6-widget-selection-inner {
    border: 1px solid #239edd;
  }

  .x6-widget-selection-box {
    opacity: 0;
  }

  .menu {
    position: absolute;
    right: 20px;
    background: #fff;
    box-shadow: 5px 5px 25px -6px #e2e2e2;
    padding: 4px;
    top: 20px;
    padding-bottom: 8px;
    border-radius: 4px;

    .icon {
      padding: 4px;
      border-radius: 2px;
      cursor: pointer;
      height: 24px;
      margin-top: 4px;

      &:hover {
        background: #e2e2e2;
      }
    }
  }
</style>
