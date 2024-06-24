import { defineComponent, mergeProps, createVNode } from 'vue';
import { useField } from '@formily/vue';
import { Password } from '@formily/antdv';

var EncryptedPassword = (0, defineComponent)({
  name: 'EncryptedPassword',
  props: {},
  setup: function setup(props, _ref) {
    var attrs = _ref.attrs;
    console.log('EncryptedPassword', attrs);
    var fieldRef = (0, useField)();
    return function () {
      var field = fieldRef.value;
      return (0, createVNode)(
        Password,
        (0, mergeProps)(attrs, {
          onChange: (value) => {
            field.value = btoa(value);
          },
        }),
      );
    };
  },
});
export default EncryptedPassword;
