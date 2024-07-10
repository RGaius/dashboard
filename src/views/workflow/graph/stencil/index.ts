import { Stencil } from '@antv/x6-plugin-stencil';
import { InitGraphProps } from '@/views/workflow/graph/interface';

import template from '@/views/workflow/graph/node/template';
import { AttrsCommand, CONFIG_PROCESS_CONTROL } from '@/views/workflow/config';

interface InitPanelComponent extends InitGraphProps {}

export const registerStencil = (props: InitPanelComponent) => {
  const { graph } = props;
  const nodeList = template.map((item) => {
    return {
      shape: 'task_node',
      id: 'public-task-node-' + item.id, // 拖拽时获取到的id 根据id 区分能够显示出来图形
      ...CONFIG_PROCESS_CONTROL,
      data: {
        label: item.name,
        description: item.description,
        icon: item.icon,
        id: item.id,
        nodeType: 'task',
      },
      attrs: AttrsCommand,
    };
  });
  if (graph.value) {
    const stencil = new Stencil({
      title: '节点列表',
      target: graph.value,
      stencilGraphHeight: 0,
      groups: [
        {
          name: 'task_execution',
          title: '任务节点',
          collapsable: true,
          graphWidth: 200,
          graphHeight: nodeList.length * 38 + 8 * (nodeList.length - 2) + 20 + 15 + 40,
          layoutOptions: {
            columns: 1,
            rowHeight: 38 + 10,
            columnWidth: 160 + 15,
            dy: 4,
            dx: 20,
          },
        },
      ],
    });
    (document.getElementById('refStencil') as HTMLElement).appendChild(stencil.container);

    stencil.load(nodeList, 'task_execution');
  }
};
