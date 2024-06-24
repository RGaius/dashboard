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
                icon: 'clarity:note-edit-line',
                tooltip: '创建接口',
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
    <TypeModel @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useModal } from '@/components/Modal';
  import { useGo } from '@/hooks/web/usePage';
  import { getDatasourcePage } from '@/api/datasource/datasource';
  import { PageWrapper } from '@/components/Page';
  import TypeModel from './TypeModel.vue';

  import { columns, searchFormSchema } from './datasource.data';

  defineOptions({ name: 'DatasourceManagement' });
  const [registerModal, { openModal }] = useModal();
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const [registerTable] = useTable({
    title: '数据源列表',
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
    openModal(true);
  }

  function handleInterfaceCreate(record: Recordable) {
    console.log(record);
    go(`/interface/detail?datasourceId=${record.id}&type=${record.type}&name=${record.name}`);
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    go(`/datasource/detail?id=${record.id}&type=${record.type}`);
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess(values) {
    console.log(values);
    go(`/datasource/detail?type=${values.title}`);
  }
</script>
