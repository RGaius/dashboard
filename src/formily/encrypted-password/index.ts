import { defineComponent, mergeProps, createVNode } from 'vue';
import { useField } from '@formily/vue';
import { Password } from '@formily/antdv';

const EncryptedPassword = defineComponent({
  name: 'EncryptedPassword',
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
export default EncryptedPassword;
