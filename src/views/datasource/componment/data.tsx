// 定义类型
export type DatasourceType = {
  title: string;
  icon: string;
  description: string;
};

const typeList = [
  {
    title: 'HTTP',
    icon: 'http|svg',
    description: 'HTTP是互联网上应用最为广泛的一种网络协议。',
  },
  {
    title: 'MySQL',
    icon: 'mysql|svg',
    description: 'MySQL是使用最广泛的关系型数据库管理系统之一。',
  },
  {
    title: 'MariaDB',
    icon: 'mariadb|svg',
    description: 'MariaDB是MySQL的分支，由瑞典MySQL AB开发，目前属于非营利组织。',
  },
  {
    title: 'Oracle',
    icon: 'oracle|svg',
    description:
      'Oracle数据库（Oracle Database）是甲骨文（Oracle）公司的一套关系型数据库管理系统，目前是甲骨文公司产品线中最高级别的数据库管理系统。',
  },
  {
    title: 'PostgreSQL',
    icon: 'postgresql|svg',
    description: 'PostgreSQL（Postgres）是一个开放源码、功能强大的对象关系数据库管理系统。',
  },
  {
    title: 'MSSQL',
    icon: 'mssql|svg',
    description:
      'Microsoft SQL Server（简称为MSSQL）是微软的专有关系型数据库管理系统，是微软公司推出的一款关系型数据库管理系统。',
  },
  {
    title: 'DB2',
    icon: 'db2|svg',
    description:
      'DB2（DataBase II）是IBM公司的一款关系型数据库管理系统，DB2是IBM公司推出的一款关系型数据库管理系统。',
  },
  {
    title: '达梦',
    icon: 'dameng|svg',
    description: '达梦数据库（DAMENG）是达梦技术股份有限公司推出的一款关系型数据库管理系统。',
  },
  {
    title: 'GussDB',
    icon: 'gussdb|svg',
    description: 'GaussDB是基于华为20余年战略投入、软硬全栈协同所创新研发的分布式关系型数据库。',
  },
  {
    title: 'TiDB',
    icon: 'tidb|svg',
    description:
      'TiDB（TimeScaleDB）是TiDB技术股份有限公司推出的一款开源的分布式关系型数据库管理系统。',
  },
  {
    title: 'Clickhouse',
    icon: 'clickhouse|svg',
    description:
      'ClickHouse（ClickHouse）是ClickHouse技术股份有限公司推出的一款开源的列式数据库管理系统。',
  },
  {
    title: 'Gbase',
    icon: 'gbase|svg',
    description: 'GBase（GBase）是中科金信（中科金信）推出的一款关系型数据库管理系统。',
  },
  {
    title: 'Redis',
    icon: 'redis|svg',
    description: 'Redis（Remote Dictionary Server）是Redis技术股份有限公司推出的一款内存数据库。',
  },
  {
    title: 'Elasticsearch',
    icon: 'elasticsearch|svg',
    description:
      'Elasticsearch（Elasticsearch）是Elasticsearch技术股份有限公司推出的一款开源的分布式全文搜索引擎。',
  },
  {
    title: 'MongoDB',
    icon: 'mongodb|svg',
    description: 'MongoDB（MongoDB）是MongoDB技术股份有限公司推出的一款面向文档型数据库管理系统。',
  },
  {
    title: 'Kafka',
    icon: 'kafka|svg',
    description: 'Kafka（Kafka）是Apache软件基金会推出的一款开源的分布式消息系统。',
  },
  {
    title: 'RocketMQ',
    icon: 'rocketmq|svg',
    description: 'RocketMQ（RocketMQ）是Apache软件基金会推出的一款开源的分布式消息系统。',
  },
  {
    title: 'gRpc',
    icon: 'grpc|svg',
    description: 'gRPC（gRPC）是Google开源的高性能、通用的RPC框架。',
  },
  {
    title: 'Dubbo',
    icon: 'dubbo|svg',
    description: 'Dubbo（Dubbo）是Apache软件基金会推出的一款开源的轻量级开源分布式RPC框架。',
  },
  {
    title: 'Prometheus',
    icon: 'prometheus|svg',
    description:
      'Prometheus（Prometheus）是Prometheus技术股份有限公司推出的一款开源的监控报警系统。',
  },
  {
    title: 'Zabbix',
    icon: 'zabbix|svg',
    description: 'Zabbix（Zabbix）是Zabbix技术股份有限公司推出的一款开源的监控报警系统。',
  },
];

export const getTypeList = (() => {
  return () => {
    return typeList;
  };
})();
