export const schema = [
  {
    name: '接口调用',
    icon: '',
    type: 'default',
    schema: {
      type: 'object',
      properties: {
        nodeId: {
          type: 'string',
          title: '节点编号',
          readOnly: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        name: {
          type: 'string',
          title: '节点名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        interfaceList: {
          type: 'number',
          title: '接口列表',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
      },
    },
  },
  {
    name: '脚本执行',
    icon: '',
    type: 'default',
    schema: {
      type: 'object',
      properties: {
        nodeId: {
          type: 'string',
          title: '节点编号',
          required: true,
          readOnly: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        name: {
          type: 'string',
          title: '节点名称',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        interfaceList: {
          type: 'number',
          title: '接口列表',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input',
        },
        script: {
          type: 'string',
          title: '脚本',
          required: true,
          'x-decorator': 'FormItem',
          'x-component': 'Input.TextArea',
        },
      },
    },
  },
];
