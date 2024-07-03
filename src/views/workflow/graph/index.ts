import { Graph, Platform } from '@antv/x6';

export const initGraph = (ref: HTMLElement) => {
  const graph: Graph = new Graph({
    container: ref,
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
      eventTypes: ['leftMouseDown', 'mouseWheel'],
    },
    mousewheel: {
      enabled: true,
      modifiers: 'ctrl',
      factor: 1.1,
      maxScale: 1.5,
      minScale: 0.5,
    },
    highlighting: {
      magnetAdsorbed: {
        name: 'stroke',
        args: {
          attrs: {
            fill: '#fff',
            stroke: '#31d0c6',
            strokeWidth: 4,
          },
        },
      },
    },
    connecting: {
      snap: true,
      allowBlank: false,
      allowLoop: false,
      highlight: true,
      sourceAnchor: {
        name: 'left',
        args: {
          dx: Platform.IS_SAFARI ? 4 : 8,
        },
      },
      targetAnchor: {
        name: 'right',
        args: {
          dx: Platform.IS_SAFARI ? 4 : -8,
        },
      },
      createEdge() {
        return graph.createEdge({
          shape: 'data-processing-curve',
          attrs: {
            line: {
              strokeDasharray: '5 5',
            },
          },
          zIndex: -1,
        });
      },
      // 连接桩校验
      validateConnection({ sourceMagnet, targetMagnet }) {
        // 只能从输出链接桩创建连接
        if (!sourceMagnet || sourceMagnet.getAttribute('port-group') === 'in') {
          return false;
        }
        // 只能连接到输入链接桩
        return !(!targetMagnet || targetMagnet.getAttribute('port-group') !== 'in');
      },
    },
  });
  return graph;
};
