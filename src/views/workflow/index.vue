<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增工作流</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑工作流信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此工作流',
                popConfirm: {
                  title: '是否确认工作流',
                  placement: 'left',
                  confirm: handleDelete.bind(null, record),
                },
              },
            ]"
          />
        </template>
      </template>
    </BasicTable>
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { getInterfaceList } from '@/api/interface/interface';
  import { PageWrapper } from '@/components/Page';
  import { useGo } from '@/hooks/web/usePage';

  import { columns, searchFormSchema } from './workflow.data';

  defineOptions({ name: 'InterfaceManagement' });
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
    title: '工作流列表',
    api: getInterfaceList,
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
      console.log('handleSearchInfoFn', info);
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
    go('/workflow/create');
  }

  function handleEdit(record: Recordable) {}

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    reload();
  }
</script>
