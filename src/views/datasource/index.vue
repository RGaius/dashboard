<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增数据源</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑数据源信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'carbon:interface-usage',
                tooltip: '新增接口',
                onClick: handleInterfaceCreate.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此数据源',
                popConfirm: {
                  title: '是否确认数据源',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
    <DatasourceModel @register="registerModal" @success="handleSuccess" />
    <InterfaceModel @register="registerInterfaceModal" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { getDatasourcePage } from '@/api/datasource/datasource';
  import { PageWrapper } from '@/components/Page';
  import DatasourceModel from './component/DatasourceModel.vue';
  import InterfaceModel from '@/views/interface/component/InterfaceModel.vue';

  import { columns, searchFormSchema } from './datasource.data';

  defineOptions({ name: 'DatasourceManagement' });
  const [registerModal, { openModal }] = useModal();
  const [registerInterfaceModal, { openModal: openInterfaceModal }] = useModal();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '数据源',
    api: getDatasourcePage,
    rowKey: 'id',
    columns,
    formConfig: {
      labelWidth: 120,
      schemas: searchFormSchema,
      autoSubmitOnEnter: true,
    },
    fetchSetting: {
      pageField: 'current',
      sizeField: 'size',
      totalField: 'total',
      listField: 'records',
    },
    useSearchForm: true,
    showTableSetting: true,
    bordered: true,
    handleSearchInfoFn(info) {
      return info;
    },
    actionColumn: {
      width: 120,
      title: '操作',
      dataIndex: 'action',
      // slots: { customRender: 'action' },
    },
  });

  function handleCreate() {
    openModal(true, { type: undefined });
  }

  function handleInterfaceCreate(record: Recordable) {
    console.log(record);
    openInterfaceModal(true, {
      type: record.type,
      datasourceId: record.id,
      datasourceName: record.name,
    });
  }

  function handleEdit(record: Recordable) {
    openModal(true, { type: record.type, id: record.id });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    reload();
  }
</script>
