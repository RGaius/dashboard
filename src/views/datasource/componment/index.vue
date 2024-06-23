<template>
  <PageWrapper :title="getTitle" contentBackground contentClass="p-4">
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
          hidden="true"
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
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { computed, unref, watch } from 'vue';
  import { useRoute } from 'vue-router';

  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider, ObjectField, Field } from '@formily/vue';
  import { Row, Col } from 'ant-design-vue';
  import { datasourceTypeMap } from './schema/index';
  import {
    saveDatasource,
    updateDatasource,
    getDatasourceDetail,
    testDatasource,
  } from '@/api/datasource/datasource';
  import { useMessage } from '@/hooks/web/useMessage';
  import { useGo } from '@/hooks/web/usePage';
  import { useLoading } from '@/components/Loading';
  import { PageWrapper } from '@/components/Page';
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
  const [result, { openDrawer: openResultDrawer }] = useDrawer();
  const form = createForm();
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();
  const { createMessage } = useMessage();
  const go = useGo();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const route = useRoute();
  const query = route.query;

  // 初始化 datasourceType 和 isUpdate， 并通过 watch 监控 query 的变化
  let datasourceType = (query?.type ?? 'HTTP') as string;
  const isUpdate = !!query?.id;
  const id = query?.id as string | undefined;

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
  watch(
    () => route.query,
    (val) => {
      datasourceType = (val?.type ?? 'HTTP') as string;
    },
  );

  // 对 datasourceType 进行边界条件检查
  if (!datasourceTypeMap[datasourceType]) {
    throw new Error(`Unsupported datasource type: ${datasourceType}`);
  }

  const getTitle = computed(() =>
    !unref(isUpdate) ? `新增${datasourceType}数据源` : `更新${datasourceType}数据源`,
  );

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
    if (!datasourceTypeMap[datasourceType]) {
      // 对于未知的 datasourceType 返回一个空的 schema
      return {};
    }
    return datasourceTypeMap[datasourceType];
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
<style lang="less" scoped></style>
