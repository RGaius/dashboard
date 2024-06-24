import { InterfaceModel, InterfaceParams, InterfaceSaveModel } from './model/interfaceModel';
import { defHttp } from '@/utils/http/axios';

enum Api {
  BASE = '/api/interface/v1',
  LIST = '/api/interface/v1/page',
  SAVE = '/api/interface/v1/save',
  UPDATE = '/api/interface/v1/update',
  TESE = '/api/interface/v1/test',
}

// 获取数据源列表
export const getInterfaceList = (params: InterfaceParams) =>
  defHttp.get<InterfaceModel>({ url: Api.LIST, params });

// 保存数据
export const saveInterface = (data: InterfaceSaveModel) =>
  defHttp.post<InterfaceModel>({ url: Api.SAVE, data });

// 更新数据源
export const updateInterface = (data: InterfaceSaveModel) =>
  defHttp.post<InterfaceModel>({ url: Api.UPDATE, data });

// 获取数据源详情
export const getInterfaceDetail = (id: string) =>
  defHttp.get<InterfaceModel>({ url: `${Api.BASE}/${id}` });

// 测试数据源
export const testInterface = (data: InterfaceSaveModel) =>
  defHttp.post<InterfaceModel>({ url: Api.TESE, data });
