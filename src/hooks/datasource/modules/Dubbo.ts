export const Datasource = {
  type: 'object',
  properties: {
    host: {
      type: 'string',
      title: '注册中心',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    namespace: {
      type: 'string',
      title: '命名空间',
      default: 'default',
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
    interfaceName: {
      type: 'string',
      title: '接口类名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    group: {
      type: 'string',
      title: '所属组名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    protocol: {
      type: 'string',
      title: '协议',
      required: true,
      default: 'dubbo',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      enum: [
        {
          label: 'dubbo',
          value: 'dubbo',
        },
      ],
    },
    version: {
      type: 'string',
      title: '版本号',
      default: '1.0.0',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    timeout: {
      type: 'number',
      title: '超时时间',
      default: 3000,
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        addonAfter: '毫秒',
      },
      'x-component': 'InputNumber',
    },
    method: {
      type: 'string',
      title: '方法名',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    paramType: {
      type: 'string',
      title: '参数类型',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip:
          '请输入参数的类型，其格式为JSON数组；如请求方法的第一个参数的类型为PersonRq，那么请输入["com.xxx.PersonRq"]。同时也支持变量替换',
      },
      'x-component': 'Input.TextArea',
      'x-component-props': {
        rows: 4,
      },
    },
    params: {
      type: 'string',
      title: '调用参数',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        rows: 5,
      },
    },
  },
};
