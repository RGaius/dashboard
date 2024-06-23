import { DatasourceModel, DatasourceParams, DatasourceSaveModel } from './model/datasourceModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  BASE = '/api/datasource/v1',
  LIST = '/api/datasource/v1/page',
  SAVE = '/api/datasource/v1/save',
  UPDATE = '/api/datasource/v1/update',
  TESE = '/api/datasource/v1/test',
}

// 获取数据源列表
export const getDatasourceList = (params: DatasourceParams) =>
  defHttp.get<DatasourceModel>({ url: Api.LIST, params });

// 保存数据
export const saveDatasource = (data: DatasourceSaveModel) =>
  defHttp.post<DatasourceModel>({ url: Api.SAVE, data });

// 更新数据源
export const updateDatasource = (data: DatasourceSaveModel) =>
  defHttp.post<DatasourceModel>({ url: Api.UPDATE, data });

// 获取数据源详情
export const getDatasourceDetail = (id: string) =>
  defHttp.get<DatasourceModel>({ url: `${Api.BASE}/${id}` });

// 测试数据源
export const testDatasource = (data: DatasourceSaveModel) =>
  defHttp.post<DatasourceModel>({ url: Api.TESE, data });