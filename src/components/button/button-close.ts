import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhButtonClose = defineComponent({
    name: 'vh-button-close',
    props: {
        class: {
            type: String,
            default: '',
        },
    },
    setup(props, { slots, attrs }) {
        const { class: classProps } = props;
        let className = makeClassByName('btn-close', '', classProps, '');
        // return the render function
        return () =>
            h(
                'div',
                {
                    ...attrs,
                    type: 'button',
                    'aria-label': 'Close',
                    class: className
                }, slots
            );
    }
});
