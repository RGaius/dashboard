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
          :component="[
            Input.TextArea,
            {
              rows: 3,
            },
          ]"
        />
        <ObjectField name="content">
          <SchemaField :schema="getSchema" :scope="{ formCollapse, formTab }" />
        </ObjectField>
        <Row justify="end">
          <Col :span="2">
            <Button @click="onPrev">上一步</Button>
          </Col>
          <Col :span="3">
            <Submit @submit="handleSubmit">提交</Submit>
          </Col>
        </Row>
      </FormLayout>
    </FormProvider>
  </div>
</template>
<script lang="ts" setup>
  import { computed } from 'vue';
  import { propTypes } from '@/utils/propTypes';
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider, ObjectField, Field } from '@formily/vue';
  import { Row, Col, Button } from 'ant-design-vue';
  import { datasourceTypeMap } from './schema/index';

  import {
    FormLayout,
    FormItem,
    Input,
    Password,
    InputNumber,
    Radio,
    Submit,
    Select,
    ArrayTable,
    Editable,
    FormCollapse,
    FormTab,
  } from '@formily/antdv';

  const props = defineProps({
    selected: propTypes.object,
  });

  const emit = defineEmits(['prev']);

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
  const form = createForm();
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();

  // 基于选中类型获取数据源schema
  const getSchema = computed(() => {
    form.reset();
    const { selected } = props;
    const datasourceType = selected.title;
    return datasourceTypeMap[datasourceType];
  });

  async function handleSubmit(values) {
    console.log(values);
  }

  async function onPrev() {
    emit('prev');
  }
</script>
