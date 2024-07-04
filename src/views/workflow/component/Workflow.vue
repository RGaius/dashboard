<template>
  <div class="stencil-app">
    <div id="app-stencil" class="app-stencil"></div>
    <div id="container" class="app-content"></div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { initGraph } from '@/views/workflow/graph';
  import { registerNode } from '@/views/workflow/graph/node';
  import { registerEdge } from '@/views/workflow/graph/edge';
  import { registerConnector } from '@/views/workflow/graph/connector';
  import { registerStencil } from '@/views/workflow/graph/stencil';
  import cells from './cells.json';

  onMounted(() => {
    const container = document.getElementById('container')!;
    const graphObj = initGraph(container);
    registerNode();
    registerConnector();
    registerEdge();
    const refStencil = document.getElementById('app-stencil')!;
    registerStencil(refStencil, graphObj);
    graphObj.fromJSON(cells);
  });
</script>

<style lang="css" scoped>
  .stencil-app {
    display: flex;
    padding: 0;
    font-family: sans-serif;

    .app-stencil {
      position: relative;
      width: 200px;
      border: 1px solid #f0f0f0;
    }

    .app-content {
      flex: 1;
      height: 380px;
      margin-right: 8px;
      margin-left: 8px;
      box-shadow: 0 0 10px 1px #e9e9e9;
    }
  }
</style>
