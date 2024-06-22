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
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';

  import { BasicTable, useTable, TableAction } from '@/components/Table';
  import { useGo } from '@/hooks/web/usePage';
  import { getDatasourceList } from '@/api/datasource/datasource';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './datasource.data';

  defineOptions({ name: 'DatasourceManagement' });
  const go = useGo();
  const searchInfo = reactive<Recordable>({});
  const [registerTable] = useTable({
    title: '数据源列表',
    api: getDatasourceList,
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
    go('/datasource/create');
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    go(`/datasource/detail?id=${record.id}&type=${record.type}`);
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }
</script>
