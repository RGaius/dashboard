import { MockMethod } from 'vite-plugin-mock';
import { resultPageSuccess } from '../_util';

const datasourceList = (() => {
  const result: any[] = [];
  for (let index = 0; index < 20; index++) {
    result.push({
      id: `${index}`,
      name: '@first',
      'type|1': ['mysql', 'http'],
      'interfaceNumber|0-100': 1,
      createTime: '@datetime',
      createBy: '@cname()',
      updateTime: '@datetime',
      updateBy: '@cname()',
    });
  }
  return result;
})();
export default [
  {
    url: '/basic-api/datasource/list',
    timeout: 1000,
    method: 'get',
    response: ({ query }) => {
      const { page = 1, pageSize = 20 } = query;
      return resultPageSuccess(page, pageSize, datasourceList);
    },
  },
] as MockMethod[];
