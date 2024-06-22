interface DatasourceModule {
  Datasource: object;
  Interface: object;
}

const modules = import.meta.glob('./modules/*.tsx', { eager: true });

const datasourceTypeMap: Record<string, DatasourceModule['Datasource']> = {};
const interfaceTypeMap: Record<string, DatasourceModule['Interface']> = {};
// 遍历数据源文件， 获取每个模块的Datasource属性
// 模块文件名作为key，Datasource属性作为value
Object.keys(modules).forEach((key) => {
  const moduleInstance = modules[key];
  if (moduleInstance && typeof moduleInstance === 'object') {
    // 这里假设key是模块文件名，为了使映射更清晰，我们可能只取文件名不带路径和后缀
    const datsourceType = key.replace(/^\.\/modules\//, '').replace(/\.tsx$/, '');
    const dataSourceSchema = (moduleInstance as DatasourceModule).Datasource;
    const interfaceSchema = (moduleInstance as DatasourceModule).Interface;
    datasourceTypeMap[datsourceType] = dataSourceSchema;
    interfaceTypeMap[datsourceType] = interfaceSchema;
  }
});

export { interfaceTypeMap, datasourceTypeMap };
