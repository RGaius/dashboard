<script setup>
  import { ref } from 'vue';
  import { useVueFlow, VueFlow } from '@vue-flow/core';
  import { MiniMap } from '@vue-flow/minimap';
  import { Controls } from '@vue-flow/controls';
  import DropzoneBackground from './DropzoneBackground.vue';
  import Sidebar from './Sidebar.vue';
  import Node from './node/Index.vue';
  import useDragAndDrop from './useDnD.ts';
  import { useDrawer } from '@/components/Drawer';

  const [result, { openDrawer: openResultDrawer }] = useDrawer();

  const { onConnect, addEdges, onNodeDoubleClick } = useVueFlow();

  const { onDragOver, onDrop, onDragLeave, isDragOver } = useDragAndDrop();

  const nodes = ref([]);

  onConnect(addEdges);

  onNodeDoubleClick((event) => {
    console.log('Node drag started', event);
    const { node } = event;
    const { data } = node;
    openResultDrawer(true, {
      title: data.name,
      schema: data.schema,
    });
  });
</script>

<template>
  <div class="dnd-flow" @drop="onDrop">
    <Sidebar />
    <VueFlow :nodes="nodes" @dragover="onDragOver" @dragleave="onDragLeave">
      <MiniMap pannable zoomable />
      <Controls position="top-right" />
      <DropzoneBackground
        :style="{
          backgroundColor: isDragOver ? '#e7f3ff' : 'transparent',
          transition: 'background-color 0.2s ease',
        }"
      />
    </VueFlow>
    <Node @register="result" />
  </div>
</template>
<style>
  .dnd-flow {
    flex-direction: column;
    display: flex;
    height: 100%;
  }

  .dnd-flow .vue-flow-wrapper {
    flex-grow: 1;
    height: 100%;
  }

  @media screen and (min-width: 640px) {
    .dnd-flow {
      flex-direction: row;
    }

    .dnd-flow aside {
      min-width: 10%;
    }
  }

  @media screen and (max-width: 639px) {
    .dnd-flow aside .nodes {
      display: flex;
      flex-direction: row;
      gap: 5px;
    }
  }
</style>
