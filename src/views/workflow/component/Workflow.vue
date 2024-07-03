<template>
  <div id="container" style="min-width: 400px; min-height: 600px"></div>
</template>

<script setup lang="ts">
  import { onMounted } from 'vue';
  import { initGraph } from '@/views/workflow/graph';
  import { initNode } from '@/views/workflow/graph/node';
  import { initEdge } from '@/views/workflow/graph/edge';
  import { initConnector } from '@/views/workflow/graph/connector';
  import cells from './cells.json';

  onMounted(() => {
    const container = document.getElementById('container')!;
    const graphObj = initGraph(container);
    initNode();
    initConnector();
    initEdge();
    graphObj.fromJSON(cells);
  });
</script>

<style lang="css" scoped></style>
