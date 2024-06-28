<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="控制台"
    :closable="false"
    placement="bottom"
    :footerHeight="60"
  >
    <CodeEditor v-model:value="result" />
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';
  import { CodeEditor } from '@/components/CodeEditor';

  const result = ref(null);

  const [register] = useDrawerInner((data) => {
    result.value = data;
  });
</script>
