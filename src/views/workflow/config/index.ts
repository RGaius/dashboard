export const dragMenu = {
  flex: 1,
  // stencilGraphHeight:
  graphWidth: 200,
};

export const AttrsCommand = {
  body: {
    fill: '#fff',
    rx: 4,
    ry: 4,
  },
};

export const CONFIG_PROCESS_CONTROL = {
  width: 160,
  height: 38, // 40 是图标高度  24 为文字高度
};
export type LineId = {
  cell: string;
  port: 'top' | 'left' | 'right' | 'bottom';
};

export const createEdgeConfig = (source: LineId, target: LineId) => {
  return {
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
    source: source,
    target: target,
  };
};
