import { Stencil } from '@antv/x6-plugin-stencil';
import { type Graph } from '@antv/x6';

export const registerStencil = (container: HTMLElement, graph: Graph) => {
  const stencil = new Stencil({
    title: '节点列表',
    target: graph,
    stencilGraphHeight: 0,
    groups: [
      {
        name: 'group1',
        title: '流程控制',
        collapsable: true,
      },
      {
        name: 'group2',
        title: '业务节点',
        collapsable: true,
      },
    ],
  });
  container.appendChild(stencil.container);
  return stencil;
};
