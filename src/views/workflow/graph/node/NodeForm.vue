<template>
  <BasicDrawer v-bind="$attrs" @register="register" :title="title" height="550px">
    <div>
      <FormProvider :form="form">
        <FormLayout :labelCol="6" :wrapperCol="16">
          <SchemaField :schema="schema" :scope="{ formCollapse, formTab }" />
        </FormLayout>
      </FormProvider>
    </div>
  </BasicDrawer>
</template>
<script lang="ts" setup>
  import { ref } from 'vue';
  import { BasicDrawer, useDrawerInner } from '@/components/Drawer';
  import {
    ArrayTable,
    Editable,
    FormCollapse,
    FormItem,
    FormLayout,
    FormTab,
    Input,
    InputNumber,
    Password,
    Radio,
    Select,
  } from '@formily/antdv';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { createForm } from '@formily/core';

  const { SchemaField } = createSchemaField({
    components: {
      Input,
      InputNumber,
      Radio,
      Select,
      Password,
      FormItem,
      FormLayout,
      ArrayTable,
      Editable,
      FormCollapse,
      FormTab,
    },
  });

  const title = ref('');
  const schema = ref('');

  const form = createForm();
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();

  const [register] = useDrawerInner((data) => {
    schema.value = data.schema;
    title.value = data.title;
  });
</script>
<style lang="less"></style>
