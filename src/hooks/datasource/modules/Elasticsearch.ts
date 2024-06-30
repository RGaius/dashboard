export const Datasource = {
  type: 'object',
  properties: {
    host: {
      type: 'string',
      title: '服务地址',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    user: {
      type: 'string',
      title: '账号',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    password: {
      type: 'string',
      title: '密码',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Password',
    },
  },
};

// 接口配置
export const Interface = {
  type: 'object',
  properties: {
    indexName: {
      type: 'string',
      title: '索引名称',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    query: {
      type: 'string',
      title: '查询语句',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        rows: 5,
      },
    },
    extract: {
      type: 'string',
      title: '结果提取',
      default: '$',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '支持JsonPath语法提取查询结果',
      },
      'x-component': 'Input',
    },
  },
};
