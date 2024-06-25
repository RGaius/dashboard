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
        <Field
          name="type"
          title="数据源类型"
          :decorator="[FormItem]"
          :component="[Input]"
          :hidden="true"
        />
        <ObjectField name="content">
          <SchemaField :schema="getSchema" :scope="{ formCollapse, formTab }" />
        </ObjectField>
        <Row justify="end">
          <Col :span="2">
            <Submit @submit="handleValidate">验证</Submit>
          </Col>
          <Col :span="3">
            <Submit @submit="handleSubmit">提交</Submit>
          </Col>
        </Row>
      </FormLayout>
    </FormProvider>
    <Result @register="result" />
  </div>
</template>
<script lang="ts" setup>
  import { computed, watch } from 'vue';

  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider, ObjectField, Field } from '@formily/vue';
  import { Row, Col } from 'ant-design-vue';
  import {
    saveDatasource,
    updateDatasource,
    getDatasourceDetail,
    testDatasource,
  } from '@/api/datasource/datasource';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGo } from '@/hooks/web/usePage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import { useLoading } from '@/components/Loading';
  import { useDrawer } from '@/components/Drawer';
  import Result from './Result.vue';
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
  const { createMessage } = useMessage();
  const [result, { openDrawer: openResultDrawer }] = useDrawer();

  const go = useGo();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });

  // 从父组件中获取id和type
  const props = defineProps({
    id: String,
    type: {
      type: String,
      required: true, // 如果这个prop是必须的，可以设置required为true
    },
  });

  let datasourceType = props.type;
  const isUpdate = !!props.id;
  const id = props?.id as string | undefined;

  // 定义获取详情并填充表单的函数
  async function fetchAndUpdateFormData() {
    if (!isUpdate || !id) return;
    try {
      const res = await getDatasourceDetail(id);
      form.setInitialValues(res);
    } catch (error) {
      createMessage.error('获取数据源详情时出错');
    }
  }
  const { getDataSourceSchema } = useDatasource(props.type);

  // 使用 watch 监听 datasourceType 的变化，并在需要时获取数据源详情
  watch(
    () => datasourceType,
    async (newVal) => {
      if (!newVal) return;
      form.reset();
      form.setInitialValues({ type: newVal });
      await fetchAndUpdateFormData(); // 在类型变化后尝试获取详情
    },
    { immediate: true },
  ); // 立即执行以处理初始设置

  const getSchema = computed(() => {
    return getDataSourceSchema();
  });

  // 优化 handleSubmit 函数
  async function handleSubmit(values) {
    try {
      openFullLoading();
      if (isUpdate) {
        values.id = id;
        await updateDatasource(values);
        createMessage.success('数据源更新成功');
      } else {
        await saveDatasource(values);
        createMessage.success('数据源保存成功');
      }
      go('/datasource/index');
    } catch (error) {
      createMessage.error('保存数据源时发生错误，请稍后重试');
    } finally {
      closeFullLoading();
    }
  }

  // 调用数据源验证结果
  async function handleValidate(values) {
    try {
      openFullLoading();
      values.id = undefined;
      const res = await testDatasource(values);
      openResult(res);
    } catch (error) {
      createMessage.error('验证数据源时发生错误，请稍后重试');
    } finally {
      closeFullLoading();
    }
  }

  // 展示数据源验证结果
  function openResult(result) {
    openResultDrawer(true, result);
  }
</script>
