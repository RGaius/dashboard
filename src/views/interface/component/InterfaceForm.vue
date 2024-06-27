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
          name="datasourceId"
          title="数据源"
          :decorator="[FormItem]"
          :component="[Input]"
          :hidden="true"
        />
        <Field
          name="datasourceName"
          title="数据源"
          :decorator="[FormItem]"
          :component="[
            Input,
            {
              disabled: true,
            },
          ]"
        />
        <Field
          name="type"
          title="接口类型"
          :decorator="[FormItem]"
          :component="[Input]"
          :hidden="true"
        />
        <Divider />
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
  </div>
</template>
<script lang="ts" setup>
  import { computed, watch } from 'vue';

  import { createForm } from '@formily/core';
  import { createSchemaField, Field, FormProvider, ObjectField } from '@formily/vue';
  import { Col, Divider, Row } from 'ant-design-vue';
  import {
    getInterfaceDetail,
    saveInterface,
    testInterface,
    updateInterface,
  } from '@/api/interface/interface';

  import { useMessage } from '@/hooks/web/useMessage';
  import { useGo } from '@/hooks/web/usePage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import { useLoading } from '@/components/Loading';

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
    Submit,
  } from '@formily/antdv';

  import EncryptedPassword from '@/formily/encrypted-password';

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
      EncryptedPassword,
    },
  });
  const form = createForm();
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();
  const { createMessage } = useMessage();
  const go = useGo();

  const [openFullLoading, closeFullLoading] = useLoading({
    tip: '加载中...',
  });
  // 从父组件中获取id和type
  const props = defineProps({
    id: String,
    type: {
      type: String,
      required: true,
    },
    datasourceName: String,
    datasourceId: String,
  });

  // 初始化 datasourceType 和 isUpdate， 并通过 watch 监控 query 的变化
  const datasourceType = props.type;
  const isUpdate = !!props.id;
  const id = props?.id as string | undefined;
  const datasourceName = props.datasourceName;
  const datasourceId = props.datasourceId;
  const { getInterfaceSchema } = useDatasource();

  // 定义获取详情并填充表单的函数
  async function fetchAndUpdateFormData() {
    if (!isUpdate || !id) return;
    try {
      const res = await getInterfaceDetail(id);
      form.setInitialValues(res);
    } catch (error) {
      createMessage.error('获取接口详情时出错');
    }
  }

  // 使用 watch 监听 datasourceType 的变化，并在需要时获取接口详情
  watch(
    () => datasourceType,
    async (newVal) => {
      if (!newVal) return;
      form.reset();
      form.setInitialValues({ type: newVal, datasourceName, datasourceId });
      await fetchAndUpdateFormData(); // 在类型变化后尝试获取详情
    },
    { immediate: true },
  ); // 立即执行以处理初始设置

  const getSchema = computed(() => {
    return getInterfaceSchema(datasourceType);
  });

  // 优化 handleSubmit 函数
  async function handleSubmit(values) {
    try {
      openFullLoading();
      if (isUpdate) {
        values.id = id;
        await updateInterface(values);
        createMessage.success('接口更新成功');
      } else {
        await saveInterface(values);
        createMessage.success('接口保存成功');
      }
      go('/interface/index');
    } catch (error) {
      createMessage.error('保存接口时发生错误，请稍后重试');
    } finally {
      closeFullLoading();
    }
  }

  // 调用接口验证结果
  async function handleValidate(values) {
    try {
      openFullLoading();
      values.id = undefined;
      await testInterface(values);
    } catch (error) {
      createMessage.error('验证接口时发生错误，请稍后重试');
    } finally {
      closeFullLoading();
    }
  }
</script>
<style lang="less" scoped></style>
