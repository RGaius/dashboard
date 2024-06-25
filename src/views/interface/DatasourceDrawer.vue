<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    title="数据源详情"
    width="30%"
    placement="right"
  >
    <div>
      <!-- <DatasourceDetail :id="id" :type="type" /> -->
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import { ref } from 'vue';

  const id = ref('');
  const type = ref('');

  const [register] = useDrawerInner((data) => {
    id.value = data.id;
    type.value = data.type;
  });
</script>
