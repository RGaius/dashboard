// http数据源配置
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
    basicCredentials: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          title: 'Basic认证',
          'x-decorator': 'FormItem',
          'x-component': 'FormCollapse',
          'x-component-props': {
            formCollapse: '{{formCollapse}}',
            bordered: false,
          },
          'x-reactions': {
            dependencies: ['content.credentialModel'],
            fulfill: {
              schema: {
                'x-visible': "{{$deps[0] === 'basic'}}",
              },
            },
          },
          properties: {
            tab1: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: '账号信息',
              },
              properties: {
                username: {
                  type: 'string',
                  title: '用户名',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  required: true,
                  'x-component': 'Input',
                },
                password: {
                  type: 'string',
                  title: '密码',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  required: true,
                  'x-component': 'Password',
                },
              },
            },
          },
        },
      },
    },
    customCredentials: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          title: '自定义认证',
          'x-decorator': 'FormItem',
          'x-component': 'FormCollapse',
          'x-component-props': {
            formCollapse: '{{formCollapse}}',
            bordered: false,
          },
          'x-reactions': {
            dependencies: ['content.credentialModel'],
            fulfill: {
              schema: {
                'x-visible': "{{$deps[0] === 'custom'}}",
              },
            },
          },
          properties: {
            tab1: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: '认证信息',
              },
              properties: {
                path: {
                  type: 'string',
                  title: '认证接口',
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  required: true,
                  'x-component': 'Input',
                },
                method: {
                  type: 'string',
                  title: '请求方式',
                  required: true,
                  default: 'POST',
                  enum: [
                    {
                      label: 'GET',
                      value: 'GET',
                    },
                    {
                      label: 'POST',
                      value: 'POST',
                    },
                  ],
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  'x-component': 'Select',
                },
                contentType: {
                  type: 'string',
                  title: '数据格式',
                  required: true,
                  default: 'application/json',
                  'x-reactions': {
                    dependencies: ['content.customCredentials.method'],
                    fulfill: {
                      schema: {
                        'x-visible': "{{$deps[0] != 'GET'}}",
                      },
                    },
                  },
                  enum: [
                    {
                      label: 'application/json',
                      value: 'application/json',
                    },
                    {
                      label: 'application/x-www-form-urlencoded',
                      value: 'application/x-www-form-urlencoded',
                    },
                    {
                      label: 'multipart/form-data',
                      value: 'multipart/form-data',
                    },
                  ],
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  'x-component': 'Select',
                },
                collapse: {
                  type: 'void',
                  title: '参数配置',
                  'x-decorator': 'FormItem',
                  'x-component': 'FormTab',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  'x-component-props': {
                    formTab: '{{formTab}}',
                  },
                  properties: {
                    tab1: {
                      type: 'void',
                      'x-component': 'FormTab.TabPane',
                      'x-component-props': {
                        tab: '请求头',
                      },
                      properties: {
                        headers: {
                          type: 'array',
                          title: '',
                          'x-decorator': 'FormItem',
                          'x-component': 'ArrayTable',
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
                      },
                    },
                    tab2: {
                      type: 'void',
                      'x-component': 'FormTab.TabPane',
                      'x-component-props': {
                        tab: '请求参数',
                      },
                      properties: {
                        params: {
                          type: 'array',
                          title: '',
                          'x-decorator': 'FormItem',
                          'x-component': 'ArrayTable',
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
                      },
                    },
                    tab3: {
                      type: 'void',
                      'x-component': 'FormTab.TabPane',
                      'x-component-props': {
                        tab: 'Body',
                      },
                      properties: {
                        body: {
                          type: 'string',
                          title: '',
                          'x-decorator': 'FormItem',
                          'x-component': 'Input.TextArea',
                          'x-component-props': {
                            rows: '5',
                          },
                        },
                      },
                    },
                  },
                },
                extract: {
                  type: 'array',
                  title: '结果提取',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    labelCol: '3',
                  },
                  'x-component': 'ArrayTable',
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
                        'x-component-props': { title: '提取规则' },
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
                        'x-component-props': { title: '描述' },
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
              },
            },
          },
        },
      },
    },
  },
};

// http数据源接口配置
export const Interface = {
  type: 'object',
  properties: {
    path: {
      type: 'string',
      title: '接口路径',
      'x-decorator': 'FormItem',
      required: true,
      'x-component': 'Input',
    },
    method: {
      type: 'string',
      title: '请求方式',
      required: true,
      default: 'POST',
      enum: [
        {
          label: 'GET',
          value: 'GET',
        },
        {
          label: 'POST',
          value: 'POST',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    contentType: {
      type: 'string',
      title: '数据格式',
      required: true,
      default: 'application/json',
      'x-reactions': {
        dependencies: ['content.method'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] != 'GET'}}",
          },
        },
      },
      enum: [
        {
          label: 'application/json',
          value: 'application/json',
        },
        {
          label: 'application/x-www-form-urlencoded',
          value: 'application/x-www-form-urlencoded',
        },
        {
          label: 'multipart/form-data',
          value: 'multipart/form-data',
        },
      ],
      'x-decorator': 'FormItem',
      'x-component': 'Select',
    },
    collapse: {
      type: 'void',
      title: '参数配置',
      'x-decorator': 'FormItem',
      'x-component': 'FormTab',
      'x-component-props': {
        formTab: '{{formTab}}',
      },
      properties: {
        tab1: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: '请求头',
          },
          properties: {
            headers: {
              type: 'array',
              title: '',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayTable',
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
          },
        },
        tab2: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: '请求参数',
          },
          properties: {
            params: {
              type: 'array',
              title: '',
              'x-decorator': 'FormItem',
              'x-component': 'ArrayTable',
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
          },
        },
        tab3: {
          type: 'void',
          'x-component': 'FormTab.TabPane',
          'x-component-props': {
            tab: 'Body',
          },
          properties: {
            body: {
              type: 'string',
              title: '',
              'x-decorator': 'FormItem',
              'x-component': 'Input.TextArea',
              'x-component-props': {
                rows: '5',
              },
            },
          },
        },
      },
    },
    extract: {
      type: 'string',
      title: '结果提取',
      default: '$',
      'x-decorator': 'FormItem',
      required: true,
      'x-component': 'Input',
    },
  },
};
