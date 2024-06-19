import { DatasourceModel, DatasourceParams } from './model/datasourceModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  LIST = '/datasource/list',
}

// 获取数据源列表

export const getDatasourceList = (params: DatasourceParams) =>
  defHttp.get<DatasourceModel>({ url: Api.LIST, params });
