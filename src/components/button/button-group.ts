import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';

export const vhButtonGroup = defineComponent({
    name: 'vh-button-group',
    props: {
        class: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots, attrs }) {
        const { class: classProps } = props;
        let className = makeTextClass('btn-group', '', classProps, '');
        // return the render function
        return () =>
            h(
                'div',
                {
                    ...attrs,
                    role: 'group',
                    class: className
                }, slots
            );
    }
});
