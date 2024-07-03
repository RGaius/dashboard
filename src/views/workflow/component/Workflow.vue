<script setup lang="ts">
  import { onMounted, ref, unref } from 'vue';
  import { Edge, Graph, Path, Platform } from '@antv/x6';
  import './registerNode';
  import cells from './cells.json';

  // 引入插件
  import { Selection } from '@antv/x6-plugin-selection';

  const graph = ref<Graph>();

  // 元素校验状态
  enum CellStatus {
    DEFAULT = 'default',
    SUCCESS = 'success',
    ERROR = 'error',
  }

  // 节点状态列表
  const nodeStatusList = [
    {
      id: 'node-0',
      status: 'success',
    },
    {
      id: 'node-1',
      status: 'success',
    },
    {
      id: 'node-2',
      status: 'success',
    },
    {
      id: 'node-3',
      status: 'success',
    },
    {
      id: 'node-4',
      status: 'error',
      statusMsg: '错误信息示例',
    },
  ];

  // 边状态列表
  const edgeStatusList = [
    {
      id: 'edge-0',
      status: 'success',
    },
    {
      id: 'edge-1',
      status: 'success',
    },
    {
      id: 'edge-2',
      status: 'success',
    },
    {
      id: 'edge-3',
      status: 'success',
    },
  ];

  onMounted(() => {
    graph.value = initGraph();

    unref(graph).fromJSON(cells);
  });

  /**
   * 初始化图
   */
  function initGraph() {
    const container = document.getElementById('container')!;
    const graph = new Graph({
      container,
      grid: {
        size: 10, // 网格大小 10px
        visible: true, // 绘制网格，默认绘制 dot 类型网格
      },
      panning: {
        enabled: true,
        eventTypes: ['leftMouseDown', 'mouseWheel'],
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
    graph.use(
      new Selection({
        multiple: true,
        rubberEdge: true,
        rubberNode: true,
        modifiers: 'shift',
        rubberband: true,
      }),
    );
    return graph;
  }

  // 注册连线
  Graph.registerConnector(
    'curveConnector',
    (sourcePoint, targetPoint) => {
      const hgap = Math.abs(targetPoint.x - sourcePoint.x);
      const path = new Path();
      path.appendSegment(Path.createSegment('M', sourcePoint.x - 4, sourcePoint.y));
      path.appendSegment(Path.createSegment('L', sourcePoint.x + 12, sourcePoint.y));
      // 水平三阶贝塞尔曲线
      path.appendSegment(
        Path.createSegment(
          'C',
          sourcePoint.x < targetPoint.x ? sourcePoint.x + hgap / 2 : sourcePoint.x - hgap / 2,
          sourcePoint.y,
          sourcePoint.x < targetPoint.x ? targetPoint.x - hgap / 2 : targetPoint.x + hgap / 2,
          targetPoint.y,
          targetPoint.x - 6,
          targetPoint.y,
        ),
      );
      path.appendSegment(Path.createSegment('L', targetPoint.x + 2, targetPoint.y));

      return path.serialize();
    },
    true,
  );

  Edge.config({
    markup: [
      {
        tagName: 'path',
        selector: 'wrap',
        attrs: {
          fill: 'none',
          cursor: 'pointer',
          stroke: 'transparent',
          strokeLinecap: 'round',
        },
      },
      {
        tagName: 'path',
        selector: 'line',
        attrs: {
          fill: 'none',
          pointerEvents: 'none',
        },
      },
    ],
    connector: { name: 'curveConnector' },
    attrs: {
      wrap: {
        connection: true,
        strokeWidth: 10,
        strokeLinejoin: 'round',
      },
      line: {
        connection: true,
        stroke: '#A2B1C3',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 6,
        },
      },
    },
  });

  Graph.registerEdge('data-processing-curve', Edge, true);

  // // 开启边的运行动画
  // const excuteAnimate = () => {
  //   unref(graph)
  //     .getEdges()
  //     .forEach((edge) => {
  //       edge.attr({
  //         line: {
  //           stroke: '#3471F9',
  //         },
  //       });
  //       edge.attr('line/strokeDasharray', 5);
  //       edge.attr('line/style/animation', 'running-line 30s infinite linear');
  //     });
  // };
  //
  // // 关闭边的动画
  // const stopAnimate = () => {
  //   unref(graph)
  //     .getEdges()
  //     .forEach((edge) => {
  //       edge.attr('line/strokeDasharray', 0);
  //       edge.attr('line/style/animation', '');
  //     });
  //   edgeStatusList.forEach((item) => {
  //     const { id, status } = item;
  //     const edge = unref(graph).getCellById(id);
  //     if (status === 'success') {
  //       edge.attr('line/stroke', '#52c41a');
  //     }
  //     if (status === 'error') {
  //       edge.attr('line/stroke', '#ff4d4f');
  //     }
  //   });
  //   // 默认选中一个节点
  //   unref(graph).select('node-2');
  // };
  //
  // // 显示节点状态
  // const showNodeStatus = () => {
  //   // 优化数据存在性验证
  //   nodeStatusList.forEach((item) => {
  //     const { id, status, statusMsg } = item;
  //     const node = unref(graph)?.getCellById(id);
  //     if (node) {
  //       const data = node.getData() as CellStatus;
  //       console.log(data);
  //       node.setData({
  //         ...data,
  //         status,
  //         statusMsg,
  //       });
  //     }
  //   });
  // };
</script>

<template>
  <div id="container" style="min-width: 400px; min-height: 600px"></div>
</template>

<style lang="css" scoped></style>
