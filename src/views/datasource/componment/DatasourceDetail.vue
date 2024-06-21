<template>
  <div>
    <FormProvider :form="form">
      <FormLayout :labelCol="6" :wrapperCol="16">
        <Field
          name="name"
          title="名称"
          :decorator="[FormItem]"
          :component="[Input]"
          :required="true"
        />
        <Field
          name="description"
          title="描述"
          :decorator="[FormItem]"
          :component="[Input.TextArea]"
        />
        <ObjectField name="content">
          <SchemaField :schema="Datasource" />
        </ObjectField>
        <Row>
          <Col :span="23" style="text-align: right">
            <Submit @submit="handleSubmit">提交</Submit>
          </Col>
        </Row>
      </FormLayout>
    </FormProvider>
  </div>
</template>
<script lang="ts" setup>
  import { ref, unref } from 'vue';
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider, ObjectField, Field } from '@formily/vue';
  import { Row, Col } from 'ant-design-vue';

  import {
    FormLayout,
    FormItem,
    Input,
    Password,
    Submit,
    Select,
    ArrayTable,
    Editable,
  } from '@formily/antdv';

  import { Datasource } from './schema/http';

  const { SchemaField } = createSchemaField({
    components: {
      Input,
      Select,
      Password,
      FormItem,
      FormLayout,
      ArrayTable,
      Editable,
    },
  });
  const form = createForm();

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const rowId = ref('');

  async function handleSubmit(values) {
    console.log(values);
    emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
  }
</script>
