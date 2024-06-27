<template>
  <div>
    <FormProvider :form="form">
      <FormLayout :labelCol="6" :wrapperCol="16">
        <div class="icon-box">
          <Icon class="icon" :icon="getLogo" size="32" />
          <div class="title">{{ type }}</div>
        </div>
        <Divider orientation="left" :plain="true">基础信息</Divider>
        <Field
          name="name"
          title="名称"
          :decorator="[FormItem]"
          :component="[Input]"
          :required="true"
        />
        <Field
          name="type"
          title="数据源类型"
          :decorator="[FormItem]"
          :component="[Input]"
          :hidden="true"
        />
        <Divider orientation="left" :plain="true">连接信息</Divider>
        <ObjectField name="content">
          <SchemaField :schema="schema" :scope="{ formCollapse, formTab }" />
        </ObjectField>
      </FormLayout>
    </FormProvider>
    <ValidateResult @register="result" />
  </div>
</template>
<script lang="ts" setup>
  import { computed, ref, unref, watch } from 'vue';
  import { createForm } from '@formily/core';
  import { createSchemaField, Field, FormProvider, ObjectField } from '@formily/vue';

  import { useMessage } from '@/hooks/web/useMessage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';

  import {
    getDatasourceDetail,
    saveDatasource,
    testDatasource,
    updateDatasource,
  } from '@/api/datasource/datasource';
  import { useLoading } from '@/components/Loading';
  import { useDrawer } from '@/components/Drawer';
  import ValidateResult from './ValidateResult.vue';
  import { Divider } from 'ant-design-vue';
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
  import Icon from '@/components/Icon/Icon.vue';

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
  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  const { getDataSourceSchema } = useDatasource();

  // 从父组件中获取id和type
  const props = defineProps({
    id: String,
    type: {
      type: String,
      required: true,
    },
  });

  // 暴露提交和测试连接的函数
  defineExpose({
    handleSubmit,
    handleValidate,
  });

  const schema = ref({});
  const isUpdate = computed(() => !!props.id);

  const getLogo = computed(() => {
    return `${props.type.toLowerCase()}|svg`;
  });

  // 定义获取详情并填充表单的函数
  async function fetchAndUpdateFormData() {
    const idVal = props.id;
    if (!idVal) return;
    try {
      const res = await getDatasourceDetail(idVal);
      form.setInitialValues(res);
    } catch (error) {
      createMessage.error('获取数据源详情时出错');
    }
  }

  // 使用 watch 监听 datasourceType 的变化，并在需要时获取数据源详情
  watch(
    () => props.type,
    async (newVal) => {
      if (!newVal) return;
      form.reset();
      form.setInitialValues({ type: newVal });
      schema.value = getDataSourceSchema(newVal);
      await fetchAndUpdateFormData(); // 在类型变化后尝试获取详情
    },
    { immediate: true },
  );

  // 优化 handleSubmit 函数
  async function handleSubmit() {
    try {
      openFullLoading();
      const values = await form.submit();
      if (unref(isUpdate)) {
        values.id = props.id;
        await updateDatasource(values);
        createMessage.success('数据源更新成功');
      } else {
        await saveDatasource(values);
        createMessage.success('数据源保存成功');
      }
    } finally {
      closeFullLoading();
    }
  }

  // 调用数据源验证结果
  async function handleValidate() {
    try {
      openFullLoading();
      const values = await form.submit();
      values.id = undefined;
      const res = await testDatasource(values);
      openResult(res);
      return Promise.resolve(res);
    } catch (error) {
      return Promise.reject(error);
    } finally {
      closeFullLoading();
    }
  }

  // 展示数据源验证结果
  function openResult(result) {
    openResultDrawer(true, result);
  }
</script>
<style lang="less" scoped>
  .icon-box {
    display: flex;
    align-items: center;
    padding: 0 1em;
  }

  .icon-box::before {
    position: relative;
    width: 5%;
    transform: translateY(50%);
    content: '';
  }

  .title {
    height: 32px;
    line-height: 32px;
    font-size: 16px;
    font-weight: 500;
    color: rgb(29, 33, 41);
    margin-left: 8px;
    padding: 0;
  }
</style>
