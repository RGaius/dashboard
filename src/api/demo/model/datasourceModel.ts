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
  name: string;
  type: string;
}
