export const Datasource = {
  type: 'object',
  properties: {
    bootstrapServer: {
      type: 'string',
      title: 'Kafka服务器和端口',
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: 'bootstrap.server',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入Kafka服务器和端口，如：localhost:9092',
      },
    },
    requestTimeout: {
      type: 'number',
      title: '请求超时时间',
      default: 3000,
      required: true,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        addonAfter: '毫秒',
      },
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入请求超时时间',
      },
    },
    producer: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          title: '生产者配置',
          'x-decorator': 'FormItem',
          'x-component': 'FormCollapse',
          'x-component-props': {
            formCollapse: '{{formCollapse}}',
            bordered: false,
          },
          properties: {
            tab1: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: '',
              },
              properties: {
                acks: {
                  type: 'string',
                  title: '确认机制',
                  required: true,
                  default: 'all',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请输入确认机制',
                  },
                  enum: [
                    {
                      label: '全部(all)',
                      value: 'all',
                    },
                    {
                      label: '主节点(1)',
                      value: '1',
                    },
                    {
                      label: '无(0)',
                      value: '0',
                    },
                  ],
                },
                bufferMemory: {
                  type: 'number',
                  title: '缓冲区大小',
                  default: 33554432,
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-component-props': {
                    placeholder: '请输入缓冲区大小',
                  },
                },
                retries: {
                  type: 'number',
                  title: '重试次数',
                  default: 3,
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'InputNumber',
                  'x-component-props': {
                    placeholder: '请输入重试次数',
                  },
                },
                keySerializer: {
                  type: 'string',
                  title: '键序列化器',
                  required: true,
                  default: 'org.apache.kafka.common.serialization.StringSerializer',
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请输入键序列化器',
                  },
                  enum: [
                    {
                      label: '字符串(org.apache.kafka.common.serialization.StringSerializer)',
                      value: 'org.apache.kafka.common.serialization.StringSerializer',
                    },
                  ],
                },
                valueSerializer: {
                  type: 'string',
                  title: '值序列化器',
                  default: 'org.apache.kafka.common.serialization.StringSerializer',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请输入值序列化器',
                  },
                  enum: [
                    {
                      label: '字符串(org.apache.kafka.common.serialization.StringSerializer)',
                      value: 'org.apache.kafka.common.serialization.StringSerializer',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
    comsumer: {
      type: 'object',
      properties: {
        collapse: {
          type: 'void',
          title: '消费者配置',
          'x-decorator': 'FormItem',
          'x-component': 'FormCollapse',
          'x-component-props': {
            formCollapse: '{{formCollapse}}',
            bordered: false,
          },
          properties: {
            tab1: {
              type: 'void',
              'x-component': 'FormCollapse.CollapsePanel',
              'x-component-props': {
                header: '',
              },
              properties: {
                maxPollRecords: {
                  type: 'number',
                  title: '最大拉取记录数',
                  default: 500,
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: '请输入最大拉取记录数',
                  },
                },
                fetchMaxWait: {
                  type: 'number',
                  title: '拉取最大等待时间',
                  default: 500,
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-decorator-props': {
                    addonAfter: '毫秒',
                  },
                  'x-component': 'Input',
                  'x-component-props': {
                    placeholder: '请输入拉取最大等待时间',
                  },
                },
                enableAutoCommit: {
                  type: 'boolean',
                  title: '是否自动提交',
                  default: false,
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择是否自动提交',
                  },
                  enum: [
                    {
                      label: '自动提交',
                      value: true,
                    },
                    {
                      label: '数据消费完毕后提交',
                      value: false,
                    },
                  ],
                },
                ketDeserializer: {
                  type: 'string',
                  title: '键反序列化类',
                  default: 'org.apache.kafka.common.serialization.StringDeserializer',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择键反序列化',
                  },
                  enum: [
                    {
                      label: '字符串(org.apache.kafka.common.serialization.StringDeserializer)',
                      value: 'org.apache.kafka.common.serialization.StringDeserializer',
                    },
                    {
                      label:
                        'JSON(org.gaius.octopus.plugin.postgresql.serialization.JsonDeserializer)',
                      value: 'org.gaius.octopus.plugin.postgresql.serialization.JsonDeserializer',
                    },
                  ],
                },
                vlueDeserializer: {
                  type: 'string',
                  title: '值反序列化类',
                  default: 'org.apache.kafka.common.serialization.StringDeserializer',
                  required: true,
                  'x-decorator': 'FormItem',
                  'x-component': 'Select',
                  'x-component-props': {
                    placeholder: '请选择值反序列化',
                  },
                  enum: [
                    {
                      label: '字符串(org.apache.kafka.common.serialization.StringDeserializer)',
                      value: 'org.apache.kafka.common.serialization.StringDeserializer',
                    },
                    {
                      label:
                        'JSON(org.gaius.octopus.plugin.postgresql.serialization.JsonDeserializer)',
                      value: 'org.gaius.octopus.plugin.postgresql.serialization.JsonDeserializer',
                    },
                  ],
                },
              },
            },
          },
        },
      },
    },
  },
};

// 接口配置
export const Interface = {
  type: 'object',
  properties: {
    key: {
      type: 'string',
      title: 'Key',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入Key',
      },
    },
    topic: {
      type: 'string',
      title: 'Topic',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入Topic',
      },
    },
    partition: {
      type: 'number',
      title: '分区',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
      'x-component-props': {
        placeholder: '请输入分区',
      },
    },
    value: {
      type: 'string',
      title: 'Value',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入Value',
        autoSize: {
          minRows: 3,
          maxRows: 6,
        },
      },
    },
  },
};
