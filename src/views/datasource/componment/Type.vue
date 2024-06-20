<template>
  <PageWrapper :class="prefixCls" title="选择数据源">
    <div :class="`${prefixCls}__content`">
      <List>
        <Row :gutter="16">
          <template v-for="item in getTypeList" :key="item.title">
            <Col :span="6">
              <List.Item>
                <Card
                  :hoverable="true"
                  :class="`${prefixCls}__card`"
                  @click="onTypeClick(item.title)"
                >
                  <div :class="`${prefixCls}__card-title`">
                    <Icon class="icon" v-if="item.icon" :icon="item.icon" size="50" />
                    {{ item.title }}
                  </div>
                  <!-- 设置固定高度，超过部分自定省略 -->
                  <div :class="`${prefixCls}__card-detail`">
                    <EllipsisText :line="3">
                      {{ item.description }}
                    </EllipsisText>
                  </div>
                </Card>
              </List.Item>
            </Col>
          </template>
        </Row>
      </List>
    </div>
    <DatasourceModel @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import Icon from '@/components/Icon/Icon.vue';
  import { getTypeList } from './data';
  import { PageWrapper } from '@/components/Page';
  import { EllipsisText } from '@/components/EllipsisText';
  import { Card, Row, Col, List } from 'ant-design-vue';
  import { useModal } from '@/components/Modal';
  import DatasourceModel from './DatasourceModel.vue';
  import { useGo } from '@/hooks/web/usePage';

  const [registerModal, { openModal }] = useModal();
  const go = useGo();

  function onTypeClick(type: string) {
    openModal(true, {
      isUpdate: false,
      type,
    });
  }

  function handleSuccess({ isUpdate }) {
    if (isUpdate) {
      go('/datasource/index');
    }
  }

  const prefixCls = 'list-card';
</script>
<style lang="less" scoped>
  .list-card {
    &__link {
      margin-top: 10px;
      font-size: 14px;

      a {
        margin-right: 30px;
      }

      span {
        margin-left: 5px;
      }
    }

    &__card {
      width: 100%;
      margin-bottom: -8px;

      .ant-card-body {
        padding: 16px;
      }

      &-title {
        margin-bottom: 5px;
        color: @text-color-base;
        font-size: 16px;
        font-weight: 500;

        .icon {
          margin-top: -5px;
          margin-right: 10px;
          font-size: 38px !important;
        }
      }

      &-detail {
        padding-top: 10px;
        padding-left: 30px;
        color: @text-color-secondary;
        font-size: 14px;
        height: 66px;
      }
    }
  }
</style>
