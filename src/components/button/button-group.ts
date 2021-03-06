import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';

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
        let className = makeClassByName('btn-group', '', classProps, '');
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
