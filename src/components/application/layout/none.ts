import { h, defineComponent } from 'vue';
import { makeTextClass } from '@/utils/class.util';

export const vhNoneLayout = defineComponent({
    name: 'vh-none-layout',
    props: {
        class: {
            type: String,
            default: ''
        },
    },
    render() {
        const { class: classProps, } = this;

        let className = 'vh-none-layout';
        className = makeTextClass(className, '', classProps, '');
        // return the render function
        return h('div', {
            class: className,
        },
            this.$slots
        );
    }
})