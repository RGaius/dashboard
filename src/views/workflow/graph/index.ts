import { Graph, Shape } from '@antv/x6';
import { InitGraphProps } from '@/views/workflow/graph/interface';
import { registerStencil } from '@/views/workflow/graph/stencil';

import { registerNode } from '@/views/workflow/graph/node';
import { registerEdge } from '@/views/workflow/graph/edge';

export const initGraph = (props: InitGraphProps) => {
  const { graph } = props;
  const initNewGraph = new Graph({
    container: document.getElementById('refContainer') as HTMLElement,
    autoResize: true,
    background: {
      color: 'rgba(0, 0, 0, 0.02)',
    },

    grid: {
      size: 20,
      visible: true,
      type: 'dot',
      args: {
        color: '#BFC2CA',
        thickness: 2,
      },
    },
    panning: {
      enabled: true,
      eventTypes: ['leftMouseDown', 'rightMouseDown', 'mouseWheel'],
    },
    connecting: {
      router: {
        name: 'manhattan',
        // name: 'orth',
        args: {
          padding: 8,
        },
      },
      connector: {
        name: 'rounded',
        args: {
          radius: 8,
        },
      },

      anchor: 'center',
      connectionPoint: 'anchor',
      allowBlank: false,
      allowLoop: false, // 是否允许 循环连线自己连接自己
      allowNode: false, // 是否允许链接到节点
      allowEdge: false, // 是否允许边链接到另一个边
      allowMulti: false, //是否允许在相同的起始节点和终止之间创建多条边
      snap: {
        radius: 20,
      },
      createEdge() {
        return new Shape.Edge({
          shape: 'edge',
          attrs: {
            line: {
              stroke: '#BBBBBB',
              strokeWidth: 1,
              targetMarker: {
                name: 'block',
                width: 9,
                height: 10,
              },
            },
          },

          zIndex: 0,
        });
      },
      validateConnection({ sourceCell, targetCell }) {
        if (sourceCell && targetCell) {
          const sourceCellData = sourceCell.getData();
          const targetCellData = targetCell.getData();
          // 初始化拉出来的时候线已经有了
          if (sourceCellData.nodeType === 'start') {
            const outgoing = initNewGraph.getConnectedEdges(sourceCell, { outgoing: true });
            // 如果开始为开始节点
            if (targetCellData.nodeType === 'start') return false;
            //如果姐结束节点为结束
            if (targetCellData.nodeType === 'end') return false;
            // 如果连接的是并行网关
            // if (targetCellData.nodeType === "parallel") return false;
            // 如果连接的是条件网关
            // if (targetCellData.nodeType === "single") return false;
            // 如果连接的是并行结束
            if (targetCellData.nodeType === 'parallel-end') return false;
            // 如果连接的是单一结束
            if (targetCellData.nodeType === 'single-end') return false;
            // 如果开始节点已经有了一个出线
            if (outgoing.length > 1) return false;
          }

          // 开始为并行网关出线
          if (sourceCellData.nodeType === 'parallel') {
            // 不允许连接开始节点
            if (targetCellData.nodeType === 'start') return false;
            // 不允许连接结束
            if (targetCellData.nodeType === 'end') return false;
            // 不允许连接并行
            if (targetCellData.nodeType === 'parallel') return false;
            // 不允许连接单一
            if (targetCellData.nodeType === 'single') return false;
            // 不允许连接单一结束
            if (targetCellData.nodeType === 'single-end') return false;
            // 不允许并行结束
            if (targetCellData.nodeType === 'parallel-end') return false;
          }
          // 开始为条件网关出线
          if (sourceCellData.nodeType === 'single') {
            const outgoing = initNewGraph.getConnectedEdges(sourceCell, { outgoing: true });
            // 不允许连接开始节点
            if (targetCellData.nodeType === 'start') return false;
            // 不允许连接结束
            if (targetCellData.nodeType === 'end') return false;
            // 不允许连接并行
            if (targetCellData.nodeType === 'parallel') return false;
            // 不允许连接单一
            if (targetCellData.nodeType === 'single') return false;
            // 不允许连接单一结束
            // if (targetCellData.nodeType === "single-end") return false;
            // 不允许并行结束
            if (targetCellData.nodeType === 'parallel-end') return false;
            // 最大连接 10 线条
            if (outgoing.length > 10) return false;
          }

          // 开始为并行结束出线
          if (sourceCellData.nodeType === 'parallel-end') {
            const outgoing = initNewGraph.getConnectedEdges(sourceCell, { outgoing: true });
            // 不允许连接开始节点
            if (targetCellData.nodeType === 'start') return false;
            // 不允许连接并行
            // if (targetCellData.nodeType === "parallel") return false;
            // // 不允许连接单一
            // if (targetCellData.nodeType === "single") return false;
            // 不允许连接单一结束
            if (targetCellData.nodeType === 'single-end') return false;
            // 不允许并行结束
            if (targetCellData.nodeType === 'parallel-end') return false;
            // 如果节点已经有了一个出线
            if (outgoing.length > 1) return false;
          }

          // // 开始为条件网关出线
          if (sourceCellData.nodeType === 'single-end') {
            const outgoing = initNewGraph.getConnectedEdges(sourceCell, { outgoing: true });
            // 不允许连接开始节点
            if (targetCellData.nodeType === 'start') return false;
            // 不允许连接单一结束
            if (targetCellData.nodeType === 'single-end') return false;
            // 不允许并行结束
            if (targetCellData.nodeType === 'parallel-end') return false;
            // 如果节点已经有了一个出线
            if (outgoing.length > 1) return false;
          }

          //如果出线是任务节点
          if (sourceCellData.nodeType === 'task') {
            const outgoing = initNewGraph.getConnectedEdges(sourceCell, { outgoing: true });
            // 不允许连接开始节点
            if (targetCellData.nodeType === 'start') return false;

            // 如果出线大于1 则不允许
            if (outgoing.length > 1) return false;
          }

          //结束网关不允许出线
          if (sourceCellData.nodeType === 'end') {
            return false;
          }

          // 默认出线为 0 连接成功后为 1 第一次指向时为 0
          // 如果入线为开始节点
          if (targetCellData.nodeType === 'start') {
            const incoming = initNewGraph.getConnectedEdges(targetCell, { incoming: true });
            if (incoming.length) return false;
          }

          //  如果入线为结束节点
          if (targetCellData.nodeType === 'end') {
            const incoming = initNewGraph.getConnectedEdges(targetCell, { incoming: true });
            // 在已经有一个进线后
            if (incoming.length === 1) return false;
          }

          // 并行网关
          if (targetCellData.nodeType === 'parallel') {
            const incoming = initNewGraph.getConnectedEdges(targetCell, { incoming: true });
            // 在已经有一个进线后
            if (incoming.length === 1) return false;
          }
          // 条件网关
          if (targetCellData.nodeType === 'single') {
            const incoming = initNewGraph.getConnectedEdges(targetCell, { incoming: true });
            // 在已经有一个进线后
            if (incoming.length === 1) return false;
          }

          //任务节点
          if (targetCellData.nodeType === 'task') {
            const incoming = initNewGraph.getConnectedEdges(targetCell, { incoming: true });
            // 在已经有一个进线后
            if (incoming.length === 1) return false;
          }
        }
        return true;
      },
      validateEdge({ edge }) {
        const source = edge.getSourceCell();
        const target = edge.getTargetCell();
        if (source && target) {
          const sourceData = source?.getData();
          const targetData = target?.getData();

          // 如果开始节点为单一  结束节点为任务节点
          if (sourceData.nodeType === 'task' && targetData.nodeType === 'single') {
            const condition = targetData.condition;

            const _condition = condition?.map((item: Record<string, any>) => {
              return {
                ...item,
                preNodeCode: source?.id,
              };
            });

            target.replaceData({
              ...targetData,
              condition: _condition,
            });
          }
        }
        return true;
      },
    },
  });
  registerNode();
  // registerConnector();
  registerEdge();
  registerStencil({
    ...props,
    graph: {
      value: initNewGraph,
      onChange: () => {},
    },
  });
  graph.onChange(initNewGraph);
  return initNewGraph;
};
