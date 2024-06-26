<template>
  <div>
    <FormProvider :form="form">
      <FormLayout :labelCol="6" :wrapperCol="16">
        <SchemaField :schema="schema" :scope="{ formCollapse, formTab }" />
      </FormLayout>
    </FormProvider>
  </div>
</template>
<script lang="ts" setup>
  import { createForm, onFormInputChange } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
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
  import { Form } from 'ant-design-vue';

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
  const form = createForm({
    effects() {
      onFormInputChange((form) => {
        triggerChange(form.values);
      });
    },
  });
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();
  const props = defineProps({
    value: { type: Object, isRequired: true },
    schema: { type: Object, isRequired: true },
  });
  const emit = defineEmits(['update:value']);

  const { id, onFieldChange } = Form.useInjectFormItemContext();
  const triggerChange = (changedValue: Object) => {
    emit('update:value', { ...props.value, [id.value]: changedValue });
    onFieldChange();
  };
</script>
