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
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { CodeEditor } from '@/components/CodeEditor';
  import { MODE } from '@/components/CodeEditor/src/typing';

  const result = ref(null);
  const placement = ref('bottom');
  const title = ref('控制台');
  const mode = ref('');

  const [register] = useDrawerInner((data) => {
    result.value = data.value;
    placement.value = data.placement;
    title.value = data.title;
    mode.value = data?.mode ? data.mode : MODE.TEXTILE;
  });
</script>
<style lang="less">
</style>
