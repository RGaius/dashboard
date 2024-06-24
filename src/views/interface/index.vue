<template>
  <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
    <BasicTable @register="registerTable" :searchInfo="searchInfo">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">新增接口</a-button>
      </template>
      <template #bodyCell="{ column, record }">
        <template v-if="column.key === 'action'">
          <TableAction
            :actions="[
              {
                icon: 'clarity:note-edit-line',
                tooltip: '编辑接口信息',
                onClick: handleEdit.bind(null, record),
              },
              {
                icon: 'ant-design:delete-outlined',
                color: 'error',
                tooltip: '删除此接口',
                popConfirm: {
                  title: '是否确认接口',
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
  import { getInterfaceList } from '@/api/interface/interface';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './interface.data';
  import { useGo } from '@/hooks/web/usePage';

  defineOptions({ name: 'InterfaceManagement' });
  const searchInfo = reactive<Recordable>({});
  const go = useGo();
  const [registerTable] = useTable({
    title: '接口列表',
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
    go(`/interface/detail?&type=HTTP`);
  }

  function handleEdit(record: Recordable) {
    console.log(record);
    go(`/interface/detail?id=${record.id}&type=${record.type}`);
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }
</script>
