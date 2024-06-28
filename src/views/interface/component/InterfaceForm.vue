<template>
  <div>
    <FormProvider :form="form">
      <FormLayout :labelCol="6" :wrapperCol="16">
        <Row justify="space-between">
          <Col :span="4">
            <div class="icon-box">
              <Icon class="icon" :icon="getLogo" size="32" />
              <div class="title">{{ type }}</div>
            </div>
          </Col>
          <Col :span="6">
            <div class="btn-group">
              <a-button @click="setReqParam">测试参数</a-button>
              <a-button @click="handleValidate">测试接口</a-button>
              <a-button type="primary" @click="handleSubmit">提交</a-button>
            </div>
          </Col>
        </Row>
        <Divider orientation="left" :plain="true">基础信息</Divider>
        <Field
          name="name"
          title="名称"
          :decorator="[FormItem]"
          :component="[Input]"
          :required="true"
        />
        <Divider orientation="left" :plain="true">接口信息</Divider>
        <Field
          name="datasourceId"
          title="数据源ID"
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
  import { Col, Divider, Row } from 'ant-design-vue';
  import {
    getInterfaceDetail,
    saveInterface,
    testInterface,
    updateInterface,
  } from '@/api/interface/interface';

  import { useMessage } from '@/hooks/web/useMessage';
  import { useDatasource } from '@/hooks/datasource/useDatasource';
  import { useLoading } from '@/components/Loading';
  import Icon from '@/components/Icon/Icon.vue';
  import ValidateResult from './ValidateResult.vue';
  import { useDrawer } from '@/components/Drawer';

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
  import { useModal } from '@/components/Modal';

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
  const [register, { openModal }] = useModal();
  const { getInterfaceSchema } = useDatasource();
  const emits = defineEmits(['submitAfter']);
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
  const isUpdate = computed(() => !!props.id);
  const schema = ref({});

  const getLogo = computed(() => {
    return `${props.type.toLowerCase()}|svg`;
  });

  // 定义获取详情并填充表单的函数
  async function fetchAndUpdateFormData() {
    const idVal = props.id;
    if (!idVal) return;
    try {
      const res = await getInterfaceDetail(idVal);
      form.setInitialValues(res);
    } catch (error) {
      createMessage.error('获取接口详情时出错');
    }
  }

  // 使用 watch 监听 datasourceType 的变化，并在需要时获取接口详情
  watch(
    () => props.type,
    async (newVal) => {
      if (!newVal) return;
      await form.reset();
      form.setInitialValues({
        type: newVal,
        datasourceName: props.datasourceName,
        datasourceId: props.datasourceId,
      });
      schema.value = getInterfaceSchema(props.type);
      await fetchAndUpdateFormData();
    },
    { immediate: true },
  ); // 立即执行以处理初始设置

  // 优化 handleSubmit 函数
  async function handleSubmit() {
    try {
      openFullLoading();
      const values = await form.submit();
      if (unref(isUpdate)) {
        values.id = props.id;
        await updateInterface(values);
        createMessage.success('接口更新成功');
      } else {
        await saveInterface(values);
        createMessage.success('接口保存成功');
      }
      emits('submitAfter', values);
    } finally {
      closeFullLoading();
    }
  }

  // 调用接口验证结果
  async function handleValidate() {
    try {
      openFullLoading();
      const values = await form.submit();
      values.id = undefined;
      const res = await testInterface(values);
      openResult(res);
    } finally {
      closeFullLoading();
    }
  }

  // 展示数据源验证结果
  function openResult(result) {
    openResultDrawer(true, { value: result, placement: 'bottom', title: '控制台' });
  }

  function setReqParam() {
    openResultDrawer(true, { value: {}, placement: 'bottom', title: '测试参数' });
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
    width: 32%;
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

  .btn-group {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
</style>
