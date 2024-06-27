<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="控制台"
    placement="bottom"
    :footerHeight="40"
    :closable="false"
  >
    <div> {{ result.message }}</div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';

  const result = ref({ message: '' });

  const [register] = useDrawerInner((data) => {
    result.value = data;
  });
</script>
