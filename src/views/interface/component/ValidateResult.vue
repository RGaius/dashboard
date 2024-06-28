<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    :title="title"
    :placement="placement"
    height="550px"
  >
    <CodeEditor v-model:value="result" :height="550" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';
  import { CodeEditor } from '@/components/CodeEditor';

  const result = ref(null);
  const placement = ref('bottom');
  const title = ref('控制台');

  const [register] = useDrawerInner((data) => {
    result.value = data.value;
    placement.value = data.placement;
    title.value = data.title;
  });
</script>
<style lang="less" scoped>
  .CodeMirror {
    height: 500px;
  }

  .codemirror-container {
    height: 400px; /* 你可以根据需要调整这个值 */
  }
</style>
