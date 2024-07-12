<script setup>
  import useDragAndDrop from './useDnD';

  import { schema } from './node/schema';

  const { onDragStart } = useDragAndDrop();
</script>

<template>
  <aside>
    <div class="nodes" v-for="(node, key) in schema" :key="key">
      <div
        :class="`vue-flow__node-${node.type}`"
        :draggable="true"
        @dragstart="onDragStart($event, node)"
        >{{ node.name }}
      </div>
    </div>
  </aside>
</template>
<style lang="css">
  .dnd-flow aside {
    color: #fff;
    font-weight: 700;
    border-right: 1px solid #eee;
    padding: 15px 10px;
    font-size: 12px;
    -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.3);
    box-shadow: 0 5px 10px #0000004d;
  }

  .dnd-flow aside .nodes > * {
    margin-bottom: 10px;
    cursor: grab;
    font-weight: 500;
    -webkit-box-shadow: 5px 5px 10px 2px rgba(0, 0, 0, 0.25);
    box-shadow: 5px 5px 10px 2px #00000040;
  }
</style>
