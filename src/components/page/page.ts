import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils/class.util';

export const vhPage = defineComponent({
    name: 'vh-page',
    props: {
        class: {
            type: String,
            default: '',
        },
        module: {
            default: null,
        },
    },
    setup(props, { slots, attrs }) {
        const { class: classProps } = props;
        let className = makeClassByName('vh-page', '', classProps, '');
        // return the render function
        return () =>
            h(
                'div',
                {
                    ...attrs,
                    class: className,
                },
                slots
            );
    }
});
