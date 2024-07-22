template
<template>
  <BasicDrawer
    v-bind="$attrs"
    @register="register"
    :title="title"
    height="550px"
    :closeFunc="closeFunc"
  >
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
  import { ref, unref } from 'vue';
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
  import { useVueFlow } from '@vue-flow/core';

  const { updateNode } = useVueFlow();

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
  const nodeValue = ref({});

  // 使用ref对象而不是字符串，以便于在更新数据时可以保持数据结构的完整性
  const form = createForm();
  const formCollapse = FormCollapse.createFormCollapse();
  const formTab = FormTab.createFormTab();

  const [register] = useDrawerInner(({ data }) => {
    schema.value = data.schema;
    title.value = data.label;
    // 确保nodeValue是一个对象，以避免潜在的引用问题
    nodeValue.value = { ...nodeValue.value, ...data };
    form.reset();
    form.setInitialValues(data.value);
  });

  // 优化1: 异常处理不足
  // 优化2: 数据校验
  const closeFunc = async () => {
    try {
      const values = await form.submit();
      const { name } = values;
      // 使用unref确保我们获取到的是实际的nodeValue对象
      updateNode(values.nodeId, {
        data: {
          ...unref(nodeValue),
          label: name,
          value: values,
        },
      });
    } catch (error) {
      if (error instanceof Array) {
        const values = form.values;
        const { name } = values;
        // 在更新节点时，确保错误信息被正确处理和展示
        updateNode(values.nodeId, {
          data: {
            ...unref(nodeValue),
            label: name,
            value: values,
            errorCount: error.length, // 优化1的实施
          },
        });
      } else {
        console.error('未知错误:', error);
      }
    }
    // 优化3: 未处理的Promise rejection
    // 显式返回一个解析的Promise，提供错误处理的机会
    return Promise.resolve(true);
  };
</script>
<style lang="less"></style>
