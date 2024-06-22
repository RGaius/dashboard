import { DatasourceModel, DatasourceParams, DatasourceSaveModel } from './model/datasourceModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  LIST = '/api/datasource/v1/page',
  SAVE = '/api/datasource/v1/save',
}

// 获取数据源列表
export const getDatasourceList = (params: DatasourceParams) =>
  defHttp.get<DatasourceModel>({ url: Api.LIST, params });

// 保存数据
export const saveDatasource = (data: DatasourceSaveModel) =>
  defHttp.post<DatasourceModel>({ url: Api.SAVE, data });
