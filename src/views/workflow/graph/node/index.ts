import { register } from '@antv/x6-vue-shape';

import Base from '@/views/workflow/graph/node/Base.vue';

export const initNode = () => {
  register({
    shape: 'custom-node',
    component: Base,
    width: 212,
    height: 48,
    ports: {
      groups: {
        in: {
          position: 'left',
          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },

        out: {
          position: {
            name: 'right',
            args: {
              dx: -32,
            },
          },

          attrs: {
            circle: {
              r: 4,
              magnet: true,
              stroke: 'transparent',
              strokeWidth: 1,
              fill: 'transparent',
            },
          },
        },
      },
    },
  });
};
