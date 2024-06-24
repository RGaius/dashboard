export interface InterfaceModel {
  id: string;
  name: string;
  datasourceId: string;
  datasourceName: string;
  type: string;
  createTime: string;
  updateTime: string;
  createBy: string;
  updateBy: string;
  [key: string]: string | number;
}

export interface InterfaceParams {
  name: string;
  type: string;
}

export interface InterfaceSaveModel {
  id: string | null;
  name: string;
  description: string;
  content: object;
}
