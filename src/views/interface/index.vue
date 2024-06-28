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
    <InterfaceModel @register="register" @success="handleSuccess" />
  </PageWrapper>
</template>
<script lang="ts" setup>
  import { reactive } from 'vue';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { getInterfaceList } from '@/api/interface/interface';
  import { PageWrapper } from '@/components/Page';

  import { columns, searchFormSchema } from './interface.data';
  import InterfaceModel from '@/views/interface/component/InterfaceModel.vue';
  import { useModal } from '@/components/Modal';

  defineOptions({ name: 'InterfaceManagement' });
  const searchInfo = reactive<Recordable>({});
  const [registerTable, { reload }] = useTable({
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
  const [register, { openModal }] = useModal();

  function handleCreate() {
    openModal(true, { type: undefined, id: undefined });
  }

  function handleEdit(record: Recordable) {
    openModal(true, {
      type: record.type,
      id: record.id,
      datasourceName: record.datasourceName,
      datasourceId: record.datasourceId,
    });
  }

  function handleDelete(record: Recordable) {
    console.log(record);
  }

  function handleSuccess() {
    reload();
  }
</script>
