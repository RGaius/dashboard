export const Datasource = {
  type: 'object',
  properties: {
    endpoint: {
      type: 'string',
      title: '服务地址',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    headers: {
      type: 'array',
      title: '请求头',
      'x-decorator': 'FormItem',
      'x-component': 'ArrayTable',
      'x-component-props': {
        scroll: { x: 800 },
      },
      items: {
        type: 'object',
        properties: {
          key: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '参数KEY' },
            properties: {
              key: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          value: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '参数VALUE' },
            properties: {
              value: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
          desc: {
            type: 'void',
            'x-component': 'ArrayTable.Column',
            'x-component-props': { title: '参数描述' },
            properties: {
              desc: {
                type: 'string',
                'x-decorator': 'FormItem',
                'x-component': 'Input',
              },
            },
          },
        },
      },
      properties: {
        add: {
          type: 'void',
          'x-component': 'ArrayTable.Addition',
          title: '新增',
        },
      },
    },
    heartbeat: {
      type: 'string',
      title: '心跳地址',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    credentialModel: {
      type: 'string',
      title: '认证模式',
      default: 'none',
      enum: [
        {
          label: '无',
          value: 'none',
        },
        {
          label: 'Basic认证协议',
          value: 'basic',
        },
        {
          label: '自定义',
          value: 'custom',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
  },
};
