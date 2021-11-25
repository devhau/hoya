import { h, defineComponent } from 'vue';
import { makeClassByName } from '@/utils';
export const vhContainer = defineComponent({
    name: 'vh-container',
    props: {
        tag: {
            type: String,
            default: 'div',
        },
        class: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: '',
            validator: (val: string) => ['', 'sm', 'md', 'lg', 'xl', 'xxl', 'fluid'].includes(val),
        },
    },
    setup(props, { slots, attrs }) {
        const { tag, size, class: classProps } = props;
        let className = 'container';
        className = makeClassByName(className, 'container', size);
        className = makeClassByName(className, '', classProps, '');

        // return the render function
        return () =>
            h(
                tag,
                {
                    ...attrs,
                    class: className
                },
                slots
            );
    }
});
