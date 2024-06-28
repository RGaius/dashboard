import { BasicPageListResult } from '@/api/model/baseModel';

export interface DatasourceModel {
  id: string;
  name: string;
  type: string;
  interfaceNumber: number;
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;

  [key: string]: string | number;
}

export interface DatasourceParams {
  name?: string;
  type?: string;
  current?: number;
  size?: number;
}

export interface DatasourceSaveModel {
  id: string | null;
  name: string;
  description: string;
  content: object;
}

export type DatasourcePageListModel = BasicPageListResult<DatasourceModel>;
