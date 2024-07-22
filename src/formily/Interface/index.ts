import { createVNode, defineComponent, mergeProps } from 'vue';
import { useField } from '@formily/vue';
import { Password } from '@formily/antdv';
//  接口选择组件

const InterfaceList = defineComponent({
  name: 'InterfaceList',
  props: {
    onChange: Function,
  },
  setup: function setup(props, _ref) {
    const attrs = _ref.attrs;
    const fieldRef = useField();
    const field = fieldRef.value;

    return function () {
      return createVNode(
        Password,
        mergeProps(attrs, {
          onChange: (e) => {
            if ('value' in field) {
              field.value = btoa(e.target.value);
            }
          },
        }),
        null,
      );
    };
  },
});
export default InterfaceList;
