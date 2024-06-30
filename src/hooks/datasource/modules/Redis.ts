export const Datasource = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      title: '部署类型',
      default: 'single',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      enum: [
        {
          label: '单节点',
          value: 'single',
        },
        {
          label: '集群',
          value: 'cluster',
        },
        {
          label: '哨兵',
          value: 'sentinel',
        },
      ],
    },
    address: {
      type: 'string',
      title: '服务地址',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    masterName: {
      type: 'string',
      title: '主服务器名称',
      default: 'mymaster',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'sentinel'}}",
          },
        },
      },
    },
    username: {
      type: 'string',
      title: '用户名',
      'x-decorator': 'FormItem',
      'x-component': 'Input',
      'x-component-props': {
        placeholder: '请输入账号',
      },
    },
    password: {
      type: 'string',
      title: '密码',
      'x-decorator': 'FormItem',
      'x-component': 'Password',
    },
    readNode: {
      type: 'string',
      title: '读取节点',
      default: 'slave',
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      enum: [
        {
          label: 'master',
          value: 'MASTER',
        },
        {
          label: 'slave',
          value: 'SLAVE',
        },
        {
          label: 'master_slave',
          value: 'MASTER_SLAVE',
        },
      ],
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] != 'single'}}",
          },
        },
      },
    },
    database: {
      type: 'number',
      default: 0,
      title: '数据库编号',
      'x-decorator': 'FormItem',
      'x-component': 'InputNumber',
    },
    timeout: {
      type: 'number',
      title: '超时时间',
      default: 3000,
      'x-decorator': 'FormItem',
      'x-component-props': {
        addonAfter: '毫秒',
      },
      'x-component': 'InputNumber',
    },
  },
};

// 接口配置
export const Interface = {
  type: 'object',
  properties: {
    type: {
      type: 'string',
      title: '数据类型',
      default: 'string',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      enum: [
        {
          label: 'string',
          value: 'string',
        },
        {
          label: 'hash',
          value: 'hash',
        },
        {
          label: 'list',
          value: 'list',
        },
        {
          label: 'set',
          value: 'set',
        },
        {
          label: 'sorted set',
          value: 'sorted set',
        },
      ],
    },
    stringOperation: {
      type: 'string',
      title: '字符串操作类型',
      default: 'get',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'string'}}",
          },
        },
      },
      enum: [
        {
          label: '添加（set）',
          value: 'set',
        },
        {
          label: '获取（get）',
          value: 'get',
        },
        {
          label: '删除（del）',
          value: 'del',
        },
      ],
    },
    hashOperation: {
      type: 'string',
      title: '哈希操作类型',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'hash'}}",
          },
        },
      },
      enum: [
        {
          label: '添加（hset、hmset）',
          value: 'hset',
        },
        {
          label: '获取（hget、hmget、hgetall）',
          value: 'hget',
        },
        {
          label: '删除（hdel）',
          value: 'hdel',
        },
      ],
    },
    listOperation: {
      type: 'string',
      title: '列表操作类型',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      enum: [
        {
          label: '添加（lpush）',
          value: 'lpush',
        },
        {
          label: '获取（lrange）',
          value: 'lrange',
        },
        {
          label: '获取长度（llen）',
          value: 'llen',
        },
        {
          label: '删除（lpop）',
          value: 'lpop',
        },
      ],
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'list'}}",
          },
        },
      },
    },
    setOperation: {
      type: 'string',
      title: '集合操作类型',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'set'}}",
          },
        },
      },
      enum: [
        {
          label: '添加（zadd）',
          value: 'zadd',
        },
        {
          label: '获取（zrange）',
          value: 'zrange',
        },
        {
          label: '通过分数获取（zrangebyscore）',
          value: 'zrangebyscore',
        },
        {
          label: '获取长度（zcard）',
          value: 'zcard',
        },
        {
          label: '删除（zrem）',
          value: 'zrem',
        },
      ],
    },
    sortedSetOperation: {
      type: 'string',
      title: '集合操作类型',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Select',
      'x-component-props': {
        placeholder: '请选择',
      },
      enum: [
        {
          label: '添加（sadd）',
          value: 'sadd',
        },
        {
          label: '获取（smembers）',
          value: 'smembers',
        },
        {
          label: '获取长度（scard）',
          value: 'scard',
        },
        {
          label: '删除（srem）',
          value: 'srem',
        },
      ],
      'x-reactions': {
        dependencies: ['content.type'],
        fulfill: {
          schema: {
            'x-visible': "{{$deps[0] === 'sorted set'}}",
          },
        },
      },
    },
    key: {
      type: 'string',
      title: '对象名称（Key）',
      required: true,
      'x-decorator': 'FormItem',
      'x-component': 'Input',
    },
    value: {
      type: 'string',
      title: '对象值（Value）',
      'x-decorator': 'FormItem',
      'x-component': 'Input.TextArea',
      'x-component-props': {
        placeholder: '请输入',
        autoSize: {
          minRows: 3,
          maxRows: 8,
        },
      },
    },
    expire: {
      type: 'number',
      title: '过期时间',
      default: -1,
      'x-decorator': 'FormItem',
      'x-decorator-props': {
        tooltip: '-1 表示永不过期',
      },
      'x-component': 'InputNumber',
      'x-component-props': {
        addonAfter: '毫秒',
      },
    },
  },
};
