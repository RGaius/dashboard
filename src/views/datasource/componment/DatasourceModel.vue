<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    :canFullscreen="false"
    :showOkBtn="false"
    :showCancelBtn="false"
  >
    <FormProvider :form="form">
      <FormLayout :labelCol="6" :wrapperCol="16">
        <Field
          name="name"
          title="输入框"
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
        <SchemaField :schema="schema" />
        <Row>
          <Col :span="23" style="text-align: right">
            <Submit @submit="handleSubmit">提交</Submit>
          </Col>
        </Row>
      </FormLayout>
    </FormProvider>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import { createForm } from '@formily/core';
  import { createSchemaField, FormProvider } from '@formily/vue';
  import { Row, Col } from 'ant-design-vue';

  import { FormLayout, FormItem, Input, Password, Submit } from '@formily/antdv';

  const { SchemaField } = createSchemaField({
    components: {
      Input,
      Password,
      FormItem,
      FormLayout,
    },
  });
  const form = createForm();
  const schema = {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        title: '名称',
        required: true,
        'x-decorator': 'FormItem',
        'x-component': 'Input',
      },
      description: {
        type: 'string',
        title: '描述',
        'x-decorator': 'FormItem',
        'x-component': 'Input.TextArea',
      },
      content: {
        type: 'object',
        properties: {
          oldPassword: {
            type: 'string',
            title: '原始密码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Password',
          },
          password: {
            type: 'string',
            title: '新密码',
            required: true,
            'x-decorator': 'FormItem',
            'x-component': 'Password',
            'x-component-props': {
              checkStrength: true,
            },
            'x-reactions': [
              {
                dependencies: ['.confirm_password'],
                fulfill: {
                  state: {
                    selfErrors:
                      '{{$deps[0] && $self.value && $self.value !== $deps[0] ? "确认密码不匹配" : ""}}',
                  },
                },
              },
            ],
          },
        },
      },
    },
  };

  defineOptions({ name: 'AccountModal' });

  const emit = defineEmits(['success', 'register']);

  const isUpdate = ref(true);
  const datasourceType = ref('http');
  const rowId = ref('');

  const [registerModal, { setModalProps, closeModal }] = useModalInner(async (data) => {
    setModalProps({ confirmLoading: false });
    isUpdate.value = !!data?.isUpdate;
    datasourceType.value = data?.type;

    if (unref(isUpdate)) {
      rowId.value = data.record.id;
    }
  });

  const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源' : '编辑数据源'));

  async function handleSubmit(values) {
    try {
      // const values = await validate();
      setModalProps({ confirmLoading: true });
      // TODO custom api
      console.log(values);
      closeModal();
      emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
    } finally {
      setModalProps({ confirmLoading: false });
    }
  }
</script>
