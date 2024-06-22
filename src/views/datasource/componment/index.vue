<template>
  <PageWrapper
    title="创建数据源"
    contentBackground
    content=" 选择数据源类型，然后填写数据源信息。"
    contentClass="p-4"
  >
    <div class="step-form-form">
      <Steps :current="current">
        <Steps.Step title="选择数据源类型" />
        <Steps.Step :title="`完成${selected.title}数据源配置`" />
      </Steps>
    </div>
    <div class="mt-5">
      <Step1 @next="handleStep1Next" v-show="current === 0" />
      <Step2
        @prev="handleStepPrev"
        @next="handleStep2Next"
        :selected="selected"
        v-show="current === 1"
        v-if="state.initStep2"
      />
    </div>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { ref, reactive } from 'vue';
  import Step1 from './DatasourceType.vue';
  import Step2 from './DatasourceDetail.vue';
  import { PageWrapper } from '@/components/Page';
  import { Steps } from 'ant-design-vue';

  defineOptions({ name: 'FormStepPage' });

  const defaultSelectedItem = {
    title: '',
    icon: '',
    description: '',
  };

  const current = ref(0);
  const selected = ref(defaultSelectedItem);

  const state = reactive({
    initStep2: false,
  });

  function handleStep1Next(step1Values: any) {
    current.value++;
    state.initStep2 = true;
    selected.value = step1Values;
  }

  function handleStepPrev() {
    current.value--;
    selected.value = defaultSelectedItem;
  }

  function handleStep2Next(step2Values: any) {
    current.value++;
    console.log(step2Values);
  }
</script>
<style lang="less" scoped>
  .step-form-content {
    padding: 24px;
    background-color: @component-background;
  }

  .step-form-form {
    width: 750px;
    margin: 0 auto;
  }
</style>
