export const Datasource = {
  type: 'object',
  properties: {
    host: {
      type: 'string',
      title: '地址',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    port: {
      type: 'number',
      title: '端口',
      default: 3306,
      required: true,
      minimum: 1,
      maximum: 65535,
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    user: {
      type: 'string',
      title: '用户名',
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
    database: {
      type: 'string',
      title: '数据库',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    driverClass: {
      type: 'string',
      title: '驱动类',
      required: true,
      default: 'com.mysql.cj.jdbc.Driver',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-hidden': true,
    },
    urlFormat: {
      type: 'string',
      title: 'URL格式',
      required: true,
      default:
        'jdbc:mysql://${host}:${port}/${database}?useUnicode=true&characterEncoding=utf-8&useSSL=false&serverTimezone=Asia/Shanghai&allowPublicKeyRetrieval=true',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-hidden': true,
    },
    pool: {
      type: 'boolean',
      title: '连接池',
      required: true,
      default: false,
      enum: [
        {
          label: '启用',
          value: true,
        },
        {
          label: '禁用',
          value: false,
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Radio.Group',
      'x-component-props': {
        optionType: 'button',
      },
    },
    advanced: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          title: '高级配置',
          'x-decorator': 'FormItem',
          'x-component': 'FormCollapse',
          'x-component-props': {
            formCollapse: '{{formCollapse}}',
            bordered: false,
          },
          'x-reactions': {
            dependencies: ['content.pool'],
            fulfill: {
              schema: {
                'x-visible': '{{$deps[0] === true}}',
              },
            },
          },
          properties: {
            tab1: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: '配置信息',
              },
              properties: {
                maxPoolSize: {
                  type: 'number',
                  title: '最大连接数',
                  required: true,
                  default: 10,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
                minIdle: {
                  type: 'number',
                  title: '最小空闲连接数',
                  required: true,
                  default: 1,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
                maxLifetime: {
                  type: 'number',
                  title: '连接最大存活时间（毫秒）',
                  required: true,
                  default: 1800000,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
                connectionTimeout: {
                  type: 'number',
                  title: '连接超时时间（毫秒）',
                  required: true,
                  default: 30000,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
                idleTimeout: {
                  type: 'number',
                  title: '连接空闲时间（毫秒）',
                  required: true,
                  default: 600000,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
                keepAliveTime: {
                  type: 'number',
                  title: '连接保活时间（毫秒）',
                  required: true,
                  default: 300000,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

// mysql接口配置
export const Interface = {
  type: 'object',
  properties: {
    sql: {
      type: 'string',
      title: 'SQL语句',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        rows: 5,
      },
    },
  },
};
